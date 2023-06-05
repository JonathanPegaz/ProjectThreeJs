import Model3D from "../../Model3D.js";
import {DoubleSide, FrontSide, MeshToonMaterial} from "three";

export default class Vent1 extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    setModel() {
        super.setModel();

        this.model.children[0].geometry.boundingSphere.center.set(-100, 15, -18)
    }

    setMaterial(child) {
        child.material = new MeshToonMaterial({
            ...child.material,
            side: DoubleSide,
            type: 'MeshToonMaterial',
            wireframe: true,
        })
    }
}