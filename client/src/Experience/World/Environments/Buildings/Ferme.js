import Model3D from "../../Model3D.js";

export default class Ferme extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    setPhysicsMeshs(child) {
        if(child.name.endsWith('_1')) {
            this.physicsMeshs.push(child)
        }
    }
}