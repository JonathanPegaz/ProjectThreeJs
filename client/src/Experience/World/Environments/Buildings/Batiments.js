import Model3D from "../../Model3D.js";

export default class Batiments extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    setPhysicsMeshs(child) {
        if(child.name.endsWith('_3')) {
            this.physicsMeshs.push(child)
        }
    }
}