import {Scene, Mesh} from 'three'

import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import PostProcessing from './PostProcessing.js'

import sources from './sources.js'
import Monitoring from "./Utils/Monitoring.js";
import LocalPlayer from "./World/Player/LocalPlayer.js";
import Network from "./Network.js";
import Physics from "./Physics.js";
import Mainscreen from "./Mainscreen.js";
import Hud from "./World/Player/Hud/Hud.js";

let instance = null

export default class Experience
{
    constructor(_canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this
        
        // Global access
        window.experience = this
        window.addEventListener('beforeunload', () =>
        {
            window.experience.destroy()
        })

        // Options
        this.canvas = _canvas

        // Setup
        this.debug = new Debug()
        this.monitoring = new Monitoring()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new Scene()
        this.resources = new Resources(sources)
        this.mainscreen = new Mainscreen()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.postProcessing = new PostProcessing()

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Experience')
            this.debugObject = {}
            this.debugObject.cleanMemory = () => {
                this.destroy()
                window.location.reload()
            }
            this.debugFolder.add(this.debugObject, 'cleanMemory').name('Clean memory')
        }

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
        // Wait for resources
        this.resources.on('ready', () =>
        {
            this.mainscreen.showInput()
            this.physics = new Physics()
            this.world = new World()
        })

        this.mainscreen.on('pseudo-entered', () => {
            this.resources.removeOverlay()
            this.hud = new Hud()
            this.network = new Network()
            this.localPlayer = new LocalPlayer()
        })

    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
        this.postProcessing.resize()
    }

    update()
    {
        this.monitoring.beginMonitoring()

        if(this.physics)
            this.physics.update()
        if(this.world)
            this.world.update()
        if(this.localPlayer)
            this.localPlayer.update()
        if(this.hud)
            this.hud.update()


        this.renderer.update()
        this.postProcessing.update()
        this.monitoring.endMonitoring()
    }

    destroy()
    {
        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }

                child.material.dispose()
            }
        })

        // Destroy everything
        this.sizes.destroy()
        this.sizes.off('resize')
        this.time.destroy()
        this.time.off('tick')
        this.resources.destroy()
        this.world.destroy()
        this.localPlayer.destroy()
        this.camera.destroy()
        this.renderer.destroy()
        this.postProcessing.destroy()
        this.monitoring.destroy()
        if(this.debug.active)
            this.debug.destroy()



        // Remove global access
        window.experience = null

        // Remove singleton
        instance = null

        // Remove canvas
        this.canvas.remove()

        // Remove all properties
        for(const key in this)
        {
            delete this[key]
        }

        // Collect garbage
        setTimeout(() =>
        {
            if(window.gc)
            {
                window.gc()
            }
        }, 1000)
    }
}