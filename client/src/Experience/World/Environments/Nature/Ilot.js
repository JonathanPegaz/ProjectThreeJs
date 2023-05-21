import Model3D from "../../Model3D.js";

export default class Ilot extends Model3D
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

