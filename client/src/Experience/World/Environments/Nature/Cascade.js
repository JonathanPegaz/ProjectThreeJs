import Model3D from "../../Model3D.js";
import {FrontSide, LinearFilter, MeshBasicMaterial, VideoTexture} from "three";

export default class Cascade extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    setMaterial(child) {
        let video = document.getElementById('video')
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