import Model3D from "../../Model3D.js";


export default class PortailIntro extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    setMaterial(child) {
        return super.setMaterial(child);
        child.receiveShadow = true
    }
}