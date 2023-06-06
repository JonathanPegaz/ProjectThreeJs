import {Scene, Mesh, SphereGeometry, BoxGeometry} from 'three'

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
import Controls from "./Utils/Controls.js";
import NpcController from "./World/Npc/NpcController.js";
import HTMLAnnouncement from "./HTMLInterface/HTMLAnnouncement.js";
import Minimap from "./Interface/Minimap.js";

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
        this.physics = new Physics()
        this.alert = new HTMLAnnouncement()
        this.mainscreen = new Mainscreen()
        this.camera = new Camera()
        this.renderer = new Renderer()
        //this.postProcessing = new PostProcessing()

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Experience')
            this.debugObject = {}
            this.debugObject.cleanMemory = () => {
                this.destroy()
                window.location.reload()
            }
            this.debugFolder.add(this.debugObject, 'cleanMemory').name('Clean memory')
        }

        // Wait for resources
        this.resources.on('ready', () =>
        {
            this.mainscreen.showInput()
            this.controls = new Controls()
            this.world = new World()
            this.world.init()
        })

        this.mainscreen.on('pseudo-entered', () => {
            this.hud = new Hud()
            this.npc = new NpcController()
            this.network = new Network()
            this.localPlayer = new LocalPlayer()
            //this.minimap = new Minimap()
            if(this.world.Cascade)
                this.world.Cascade.sound.play()
            /*this.world.Vent1.model.position.set(this.localPlayer.object.position.x, this.localPlayer.object.position.y, this.localPlayer.object.position.z)
            this.localPlayer.object.add(this.world.Vent1.model)*/
            this.resources.homeVideoDiv.remove()
        })

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
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
        if(this.minimap)
            this.minimap.resize()
        //this.postProcessing.resize()
    }

    update()
    {
        this.monitoring.beginMonitoring()

        //console.time()

        this.camera.update()

        //console.time()
        if(this.physics)
            this.physics.update()
        //console.timeEnd()
        //console.time()
        if(this.world)
            this.world.update()
        //console.timeEnd()
        //console.time()
        if(this.controls)
            this.controls.update()
        if(this.hud)
            this.hud.update()
        if(this.network)
            this.network.update()
        if(this.localPlayer)
            this.localPlayer.update()
        if(this.npc)
            this.npc.update()

        this.renderer.update()
        //console.timeEnd()
        //this.postProcessing.update()
        this.monitoring.endMonitoring()
    }

    destroy()
    {
        // Destroy everything
        this.sizes.destroy()
        this.sizes.off('resize')
        this.time.destroy()
        this.time.off('tick')
        if (this.controls)
            this.controls.destroy()
        this.resources.destroy()
        this.world.destroy()
        if (this.localPlayer)
            this.localPlayer.destroy()
        if (this.npc)
            this.npc.destroy()
        if (this.network)
            this.network.destroy()
        if (this.physics)
            this.physics.destroy()
        this.mainscreen.destroy()
        this.alert.destroy()
        if(this.hud)
            this.hud.destroy()
        this.camera.destroy()
        if(this.minimap)
            this.minimap.destroy()
        this.renderer.destroy()
        //this.postProcessing.destroy()
        this.monitoring.destroy()
        if(this.debug.active)
            this.debug.destroy()

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            for(const key in child)
            {
                // Test if there is a dispose function
                if(key && typeof key.dispose === 'function')
                {
                    key.dispose()
                }

                // Test if there is a remove function
                if(key && typeof key.remove === 'function')
                {
                    key.remove()
                }

            }

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

        // null
        this.scene = null
        this.camera = null
        this.renderer = null
        this.world = null
        this.resources = null
        this.physics = null
        this.mainscreen = null
        this.alert = null
        this.hud = null
        this.localPlayer = null
        this.npc = null
        this.network = null
        this.controls = null
        this.time = null
        this.sizes = null
        this.monitoring = null
        this.debug = null
        this.debugFolder = null
        this.debugObject = null

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