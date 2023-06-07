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
        this.IntroMusic.setVolume(0.1)

        this.DayMusic = new Audio(this.camera.audioListener)
        this.DayMusic.setBuffer(this.resources.DayMusic)
        this.DayMusic.setLoop(true)
        this.DayMusic.setVolume(0.1)

        this.SeaLoop = new Audio(this.camera.audioListener)
        this.SeaLoop.setBuffer(this.resources.AmbianceSeaLoop)
        this.SeaLoop.setLoop(true)
        this.SeaLoop.setVolume(0.08)

        this.WindForestLoop = new Audio(this.camera.audioListener)
        this.WindForestLoop.setBuffer(this.resources.AmbianceWindForestLoop)
        this.WindForestLoop.setLoop(true)
        this.WindForestLoop.setVolume(0.1)

        this.AmbianceNightLoop = new Audio(this.camera.audioListener)
        this.AmbianceNightLoop.setBuffer(this.resources.AmbianceNightLoop)
        this.AmbianceNightLoop.setLoop(true)
        this.AmbianceNightLoop.setVolume(0.1)
    }

    setEffects() {
        this.Footstep = new Audio(this.camera.audioListener)
        this.Footstep.setBuffer(this.resources.Footstep)
        this.Footstep.setLoop(true)
        this.Footstep.setVolume(0.5)

        this.CartoonVoice = new Audio(this.camera.audioListener)
        this.CartoonVoice.setBuffer(this.resources.CartoonVoice)
        this.CartoonVoice.setLoop(false)
        this.CartoonVoice.setVolume(1)

        this.PickObject = new Audio(this.camera.audioListener)
        this.PickObject.setBuffer(this.resources.PickObject)
        this.PickObject.setLoop(false)
        this.PickObject.setVolume(0.2)

        this.Notification = new Audio(this.camera.audioListener)
        this.Notification.setBuffer(this.resources.Notification)
        this.Notification.setLoop(false)
        this.Notification.setVolume(1)

        this.DiggingGround = new Audio(this.camera.audioListener)
        this.DiggingGround.setBuffer(this.resources.DiggingGround)
        this.DiggingGround.setLoop(true)
        this.DiggingGround.setVolume(1)

        this.Kick = new Audio(this.camera.audioListener)
        this.Kick.setBuffer(this.resources.Kick)
        this.Kick.setLoop(false)
        this.Kick.setVolume(0.2)

        this.FallingObject = new Audio(this.camera.audioListener)
        this.FallingObject.setBuffer(this.resources.FallingObject)
        this.FallingObject.setLoop(false)
        this.FallingObject.setVolume(0.5)


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
        this.IntroMusic = null
        this.DayMusic = null
        this.SeaLoop = null
        this.WindForestLoop = null
        this.AmbianceNightLoop = null
        this.Footstep = null
        this.CartoonVoice = null
        this.PickObject = null
        this.Notification = null
        this.DiggingGround = null
        this.Kick = null
        this.FallingObject = null

        this.experience = null
    }
}

