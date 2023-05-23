import Model3D from "../../Model3D.js";
import {FrontSide, LinearFilter, MeshBasicMaterial, MeshToonMaterial, VideoTexture} from "three";

export default class Cascade extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    setMaterial(child) {
        let video = document.getElementById('video')
        video.play()
        this.videoTexture = new VideoTexture(video)

        this.videoTexture.minFilter = LinearFilter
        this.videoTexture.magFilter = LinearFilter

        child.material = new MeshToonMaterial({
            map: this.videoTexture,
            side: FrontSide,
            toneMapped: false,
        })
    }
}