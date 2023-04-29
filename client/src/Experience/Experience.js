import * as THREE from 'three'

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

        // Options
        this.canvas = _canvas

        // Setup
        this.debug = new Debug()
        this.monitoring = new Monitoring()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.physics = new Physics()
        this.postProcessing = new PostProcessing()

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
            this.world = new World()
            this.localPlayer = new LocalPlayer()
            this.network = new Network()
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

        this.physics.update()

        if(this.world)
            this.world.update()
        if(this.network)
            this.network.update()
        if(this.localPlayer)
            this.localPlayer.update()

        this.renderer.update()
        this.postProcessing.update()
        this.monitoring.endMonitoring()
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
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
            }
        })

        // this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
            this.debug.ui.destroy()
    }
}