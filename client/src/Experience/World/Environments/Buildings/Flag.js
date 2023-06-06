import Model3D from "../../Model3D.js";
import {AnimationMixer, LoopRepeat, MeshToonMaterial, PointLight} from "three";


export default class Flag extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    setMaterial(child) {
        child.material = new MeshToonMaterial({
            ...child.material,
            type: 'MeshToonMaterial',
        })
    }

    setAnimation() {
        this.mixer = new AnimationMixer(this.model)
        for (let i = 0; i < this.animations.length; i++) {
            this.mixer.clipAction(this.animations[i]).loop = LoopRepeat
            this.mixer.clipAction(this.animations[i]).play()
        }
    }
}