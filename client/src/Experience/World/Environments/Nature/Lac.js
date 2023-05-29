import Model3D from "../../Model3D.js";
import {FrontSide, LinearFilter, MeshBasicMaterial, VideoTexture} from "three";
import {NodeToyMaterial} from "@nodetoy/three-nodetoy";

export default class Lac extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    setMaterial(child) {
        //child.material = new NodeToyMaterial({data})

        let video = document.getElementById('lacvideo')

        this.videoTexture = new VideoTexture(video)

        this.videoTexture.minFilter = LinearFilter
        this.videoTexture.magFilter = LinearFilter

        child.material = new MeshBasicMaterial({
            map: this.videoTexture,
            side: FrontSide,
            toneMapped: false,
        })

        video.play()
    }
}