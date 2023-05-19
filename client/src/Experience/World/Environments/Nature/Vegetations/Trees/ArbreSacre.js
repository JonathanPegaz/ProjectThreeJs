import Model3D from "../../../../Model3D.js";
import {MeshToonMaterial} from "three";

export default class ArbreSacre extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    setMaterial(child) {
        child.material = new MeshToonMaterial({
            ...child.material,
            type: 'MeshToonMaterial',
            alphaTest: 0.5,
            depthWrite: true,
            transparent: false,
        })
    }

    setPhysicsMeshs(child) {
        if (child.name.endsWith('_1') || child.name.endsWith('_2')) {
            this.physicsMeshs.push(child)
        }
    }
}