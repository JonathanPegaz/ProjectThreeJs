import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from "./Experience.js";
import CannonDebugger from 'cannon-es-debugger'

export default class Physics
{
    constructor()
    {
        this.experience = new Experience()
        this.world = new CANNON.World()
        this.world.gravity.set(0, -9.82, 0)
        //this.world.gravity.set(0, -0.1, 0)
        this.world.broadphase = new CANNON.SAPBroadphase(this.world)
        this.world.allowSleep = true
        //this.world.broadphase = new CANNON.NaiveBroadphase()
        this.time = this.experience.time
        // this.world.solver.iterations = 10
        this.scene = this.experience.scene

        this.objectsToUpdate = []

        this.setInstance()
    }

    setInstance()
    {
        this.cannonDebugger = new CannonDebugger(this.scene, this.world, {
            color: 0x0000ff
        })
        // Default material
        const defaultMaterial = new CANNON.Material('default')
        const defaultContactMaterial = new CANNON.ContactMaterial(
            defaultMaterial,
            defaultMaterial,
            {
                friction: 0.1,
                restitution: 0.7
            }
        )
        this.world.defaultContactMaterial = defaultContactMaterial
    }

    update()
    {
        this.world.step(1 / 60, this.time.delta / 1000, 3)
        this.cannonDebugger.update()
    }
}