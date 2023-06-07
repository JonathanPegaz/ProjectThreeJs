import Model3D from "../../Model3D.js";
import {
    DoubleSide,
    FrontSide,
    LinearFilter, Mesh,
    MeshBasicMaterial,
    MeshToonMaterial,
    PositionalAudio,
    VideoTexture
} from "three";
import {PositionalAudioHelper} from "three/addons/helpers/PositionalAudioHelper.js";

export default class Cascade extends Model3D
{
    constructor(model)
    {
        super(model)

        this.model.traverse((child) =>
        {
            if(child instanceof Mesh)
            {
                child.castShadow = false
                child.receiveShadow = false
            }
        })
    }

    setMaterial(child) {
        let video = document.getElementById('video')

        this.videoTexture = new VideoTexture(video)

        this.videoTexture.minFilter = LinearFilter
        this.videoTexture.magFilter = LinearFilter

        child.material = new MeshToonMaterial({
            map: this.videoTexture,
            side: DoubleSide,
            toneMapped: false,
        })

        video.play()

        // create the PositionalAudio object (passing in the listener)
        this.sound = new PositionalAudio( this.experience.camera.audioListener );
        this.sound.position.set(child.geometry.boundingSphere.center.x, child.geometry.boundingSphere.center.y, child.geometry.boundingSphere.center.z)
        this.sound.setBuffer( this.experience.resources.items.Waterfall_audio );
        this.sound.setRefDistance(0.4)
        this.sound.setLoop(true)
        this.sound.setVolume(2)
        this.model.add( this.sound );
    }

    destroy() {
        this.model.traverse((child) =>
        {
          // remove audio
            if (child.type === 'PositionalAudio') {
                child.stop()
                child.remove()
                child = null
            }
        })
        super.destroy();
    }
}