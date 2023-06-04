import Model3D from "../../Model3D.js";
import {MeshToonMaterial, PointLight} from "three";


export default class Flag extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    setMaterial(child) {
        child.material = new MeshToonMaterial({
            ...child.material,
            type: 'MeshToonMaterial',
        })
    }
}