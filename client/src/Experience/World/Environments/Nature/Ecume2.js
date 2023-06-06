import Model3D from "../../Model3D.js";
import {Mesh} from "three";


export default class Ecume2 extends Model3D
{
    constructor(model)
    {
        super(model)
        this.model.traverse((child) =>
        {
            if(child instanceof Mesh)
            {
                child.castShadow = false
                child.receiveShadow = false
            }
        })
    }
}