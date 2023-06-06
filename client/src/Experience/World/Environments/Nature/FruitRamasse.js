import Model3D from "../../Model3D.js";
import {AnimationMixer, LoopRepeat, Mesh} from "three";

export default class FruitRamasse extends Model3D {
    constructor(model) {
        super(model)
        console.log(this.experience.resources.items[this.resource])
    }

}