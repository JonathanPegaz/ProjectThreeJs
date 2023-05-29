import Model3D from "../../Model3D.js";

export default class Stand extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    setPhysicsMeshs(child) {
        if(child.name.endsWith("_1") || child.name.endsWith("_2")) {
            this.physicsMeshs.push(child)
        }
    }
}