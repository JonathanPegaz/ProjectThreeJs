import Model3D from "../../Model3D.js";
import {FrontSide, LinearFilter, MeshBasicMaterial, MeshToonMaterial, PositionalAudio, VideoTexture} from "three";
import {PositionalAudioHelper} from "three/addons/helpers/PositionalAudioHelper.js";

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

        // create the PositionalAudio object (passing in the listener)
        const sound = new PositionalAudio( this.experience.camera.audioListener );
        sound.setBuffer( this.experience.resources.items.Waterfall_audio );
        sound.setRefDistance(0.2);
        sound.setLoop(true)
        sound.setVolume(1)
        sound.play()

        this.model.add( sound );
    }
}