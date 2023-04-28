import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from "./Experience.js";

export default class Physics
{
    constructor()
    {
        this.experience = new Experience()
        this.world = new CANNON.World()
        this.world.gravity.set(0, -9.82, 0)
        this.world.broadphase = new CANNON.NaiveBroadphase()
        // this.world.solver.iterations = 10

        this.objectsToUpdate = []

        this.setInstance()
    }

    setInstance()
    {
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
        //this.world.step(1 / 60)
    }
}