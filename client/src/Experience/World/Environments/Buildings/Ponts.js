import Model3D from "../../Model3D.js";

export default class Ponts extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    setMaterial(child) {
        super.setMaterial(child);
        child.receiveShadow = true;
    }
}