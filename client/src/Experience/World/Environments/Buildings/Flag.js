import Model3D from "../../Model3D.js";
import {MeshToonMaterial, PointLight} from "three";


export default class Flag extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    setMaterial(child) {
        // add new point light flame color to child
        const flamePointlight = new PointLight(0xe25822, 10, 20)
        flamePointlight.position.set(child.geometry.boundingSphere.center.x, child.geometry.boundingSphere.center.y, child.geometry.boundingSphere.center.z)
        // light invisible default
        flamePointlight.visible = false
        this.experience.world.environment.flameLights.push(flamePointlight)
        this.experience.scene.add(flamePointlight)
        // check if child material name already exist in materials
        for (let i = 0; i < this.materials.length; i++) {
            if (this.materials[i].name === child.material.name) {
                child.material = this.materials[i]
                return
            }
        }

        child.material = new MeshToonMaterial({
            ...child.material,
            type: 'MeshToonMaterial',
        })
        this.materials.push(child.material)
    }
}