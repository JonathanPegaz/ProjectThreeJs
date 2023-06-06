import Model3D from "../../Model3D.js";
import {BoxGeometry, DoubleSide, FrontSide, Mesh, MeshBasicMaterial, MeshToonMaterial} from "three";

export default class Vent1 extends Model3D
{
    constructor(model)
    {
        super(model)
        console.log(this.experience.resources.items[this.resource])
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
}