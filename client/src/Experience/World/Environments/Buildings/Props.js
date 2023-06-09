import Model3D from "../../Model3D.js";

export default class Props extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    setPhysicsMeshs(child) {
        if(!child.name.includes("Mesh")) {
            this.physicsMeshs.push(child)
        }
    }
}