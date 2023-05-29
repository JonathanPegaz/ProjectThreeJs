import Model3D from "../../Model3D.js";
import {FrontSide, MeshBasicMaterial} from "three";

export default class Rochers extends Model3D
{
    constructor(model)
    {
       super(model)
    }

    setMaterial(child) {
        child.material = new MeshBasicMaterial({
            ...child.material,
            side: FrontSide,
            type: 'MeshBasicMaterial',
        })
    }
}