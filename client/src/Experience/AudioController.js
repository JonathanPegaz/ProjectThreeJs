import Experience from "./Experience.js";
import { Audio } from "three";


export default class AudioController {
    constructor(props) {
        this.experience = new Experience()
        this.resources = this.experience.resources.items
        this.camera = this.experience.camera
        this.controls = this.experience.controls

        this.currentMusic = null
    }

    setAudioItems() {
        this.IntroMusic = new Audio(this.camera.audioListener)
        this.IntroMusic.setBuffer(this.resources.IntroMusic)
        this.IntroMusic.setLoop(true)
        this.IntroMusic.setVolume(0.2)

        this.DayMusic = new Audio(this.camera.audioListener)
        this.DayMusic.setBuffer(this.resources.DayMusic)
        this.DayMusic.setLoop(true)
        this.DayMusic.setVolume(0.2)
    }

    setEffects() {
        this.Footstep = new Audio(this.camera.audioListener)
        this.Footstep.setBuffer(this.resources.Footstep)
        this.Footstep.setLoop(true)
        this.Footstep.setVolume(0.5)

       /* this.controls.on('forwardDown', () => {
            this.Footstep.play()
        })
        this.controls.on('forwardUp', () => {
            this.Footstep.pause()
        })*/
    }

    playBackgroundMusic(music) {
        if(this.currentMusic) {
            this.currentMusic.stop()
        }
        this[music].play()
        this.currentMusic = this[music]
    }

    playSound(sound) {
        this[sound].play()
    }

    update() {

    }

    destroy() {
        this.IntroMusic.stop()
        this.IntroMusic.remove()
        this.IntroMusic = null

        this.DayMusic.stop()
        this.DayMusic.remove()
        this.DayMusic = null

        this.experience = null
    }
}

