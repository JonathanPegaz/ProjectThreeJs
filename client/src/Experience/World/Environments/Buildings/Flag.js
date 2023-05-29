import Model3D from "../../Model3D.js";
import {MeshToonMaterial} from "three";


export default class Flag extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    setMaterial(child) {
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