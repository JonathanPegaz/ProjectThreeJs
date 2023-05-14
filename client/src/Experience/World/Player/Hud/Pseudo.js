import Experience from "../../../Experience.js";
import {CanvasTexture, Mesh, MeshBasicMaterial, PlaneGeometry, Texture, Vector3} from "three";
import RemotePlayer from "../RemotePlayer.js";
import { CSS2DRenderer, CSS2DObject} from "three/addons/renderers/CSS2DRenderer.js";

export default class Pseudo {
    constructor(player, pseudo) {
        this.experience = new Experience()
        this.player = player
        this.text = pseudo

        this.setHTML()
        this.setPlayerPseudo()

    }

    setHTML() {
        this.followText = document.createElement('div');
        this.followText.id = 'follow-text';
        this.followText.style.cssText= `
        position: absolute;
        color: white;
        background: #00000077;
        line-height: 40px;
        border: 1px solid #ffffff77;
        transform: translate(-50%, -50%);
        z-index: 100;
        font-family: Arial;
        font-weight: bold;
        font-size: 14px;
        padding: 0 10px;`

        document.body.appendChild(this.followText);

        this.followText.innerHTML = this.text;
    }

    setPlayerPseudo() {
        this.pseudoLabel = new CSS2DObject(this.followText);
        this.pseudoLabel.position.set(0, 0.5, 0);
        this.player.object.add(this.pseudoLabel);

    }

    update() {

        const maxDistance = 30; // the maximum distance at which the pseudo disappears completely
        const distance = this.experience.camera.instance.position.distanceTo(this.player.object.position);

        if (distance >= maxDistance) {
            this.fadeOut();
        } else {
            this.fadeIn();
        }

    }

    fadeIn() {
        // fade in the pseudo
        this.pseudoLabel.element.classList.add("fade-in");
        this.pseudoLabel.element.classList.remove("fade-out");
    }

    fadeOut() {
        this.pseudoLabel.element.classList.add("fade-out");
        this.pseudoLabel.element.classList.remove("fade-in");
    }

    destroy() {

        this.followText.remove()
        this.pseudoLabel.visible = false

        this.experience = null
        this.player = null
        this.text = null
        this.followText = null
        this.pseudoLabel = null
    }
}