import Model3D from "../../Model3D.js";
import {AnimationMixer, LoopRepeat, Mesh} from "three";

export default class FruitRamasse extends Model3D {
    constructor(model) {
        super(model)
        console.log(this.experience.resources.items[this.resource])

    }

    setAnimation() {
        this.mixer = new AnimationMixer(this.model)
        // disable animation loop
        this.mixer.clipAction(this.animations[0]).setLoop(LoopRepeat, 0)
    }

    playAnimation(){
        this.mixer.clipAction(this.animations[0]).clampWhenFinished = true;
        this.mixer.clipAction(this.animations[0]).play()


        // spawn hitbox du fruit

    }

}