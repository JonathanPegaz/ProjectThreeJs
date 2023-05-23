import Model3D from "../../Model3D.js";
import {FrontSide, LinearFilter, MeshBasicMaterial, VideoTexture} from "three";

export default class Lac extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    setMaterial(child) {
        let video = document.getElementById('lacvideo')
        video.play()
        this.videoTexture = new VideoTexture(video)

        this.videoTexture.minFilter = LinearFilter
        this.videoTexture.magFilter = LinearFilter

        child.material = new MeshBasicMaterial({
            map: this.videoTexture,
            side: FrontSide,
            toneMapped: false,
        })
    }
}