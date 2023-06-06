import Model3D from "../../Model3D.js";

export default class FruitPose extends Model3D {
    constructor(model) {
        super(model)
        this.model.visible = false
    }
}