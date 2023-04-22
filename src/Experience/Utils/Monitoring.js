import * as THREE from 'three'
import Experience from '../Experience.js'
import Stats from 'three/examples/jsm/libs/stats.module'

export default class Monitoring
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.statsFps = new Stats()
        this.statsMs = new Stats()
        this.statsMb = new Stats()

        this.setInstance()
    }

    setInstance()
    {
        if (this.debug.active) {
            this.statsFps.showPanel(0)
            document.body.appendChild(this.statsFps.dom)

            this.statsMs.showPanel(1)
            document.body.appendChild(this.statsMs.dom)
            this.statsMs.domElement.style.cssText = 'position:absolute;top:0px;left:80px;';


            this.statsMb.showPanel(2)
            document.body.appendChild(this.statsMb.dom)
            this.statsMb.domElement.style.cssText = 'position:absolute;top:0px;left:160px;';
        }
    }

    beginMonitoring() {
        if (this.debug.active) {
            this.statsFps.begin()
            this.statsMs.begin()
            this.statsMb.begin()
        }
    }
    endMonitoring() {
        if (this.debug.active) {
            this.statsFps.end()
            this.statsMs.end()
            this.statsMb.end()
        }
    }
}