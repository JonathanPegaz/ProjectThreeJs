import Experience from "../Experience.js";
import { CSS2DObject} from "three/addons/renderers/CSS2DRenderer.js";
import {Box3} from "three";

export default class Pseudo {
    constructor(target, pseudo, isPlayer = true) {
        this.experience = new Experience()

        this.target = target
        this.text = pseudo
        this.isPlayer = isPlayer

        this.setHTML()
        this.setPlayerPseudo()

    }

    setHTML() {
        this.nameContainer = document.createElement('div');
        this.nameContainer.classList.add('npc-name-container');

        this.nameText = document.createElement('span');
        this.nameText.classList.add('npc-name-text');
        if (this.isPlayer)
            this.nameText.style.color = '#FFD700';
        this.nameText.textContent = this.text;

        this.nameContainer.appendChild(this.nameText);
    }

    setPlayerPseudo() {
        this.pseudoLabel = new CSS2DObject(this.nameContainer);
        this.pseudoLabel.position.set(0, .8, 0);
        this.target.object.add(this.pseudoLabel);

    }

    update() {

        const maxDistance = 30; // the maximum distance at which the pseudo disappears completely
        const distance = this.experience.camera.instance.position.distanceTo(this.target.object.position);

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

        this.nameContainer.remove()
        this.pseudoLabel.visible = false

        this.experience = null
        this.target = null
        this.text = null
        this.nameContainer = null
        this.pseudoLabel = null
    }
}