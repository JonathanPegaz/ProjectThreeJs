import * as THREE from 'three'
import Experience from '../Experience.js'
import Stats from 'three/examples/jsm/libs/stats.module'

export default class Monitoring
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.instance = new Stats()

        this.setInstance()
    }

    setInstance()
    {
        if (this.debug.active) {
            this.instance.showPanel(0)
            document.body.appendChild(this.instance.dom)
        }
    }
}