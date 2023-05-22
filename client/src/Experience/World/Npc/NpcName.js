import {CSS2DObject} from "three/addons/renderers/CSS2DRenderer.js";
import Experience from "../../Experience.js";

export default class NpcName {
    constructor(name, target) {
        this.experience = new Experience()

        this.name = name
        this.target = target

        this.setHTML()
        this.setCSS2DObject()
    }

    setHTML() {
        this.nameContainer = document.createElement('div');
        this.nameContainer.classList.add('npc-name-container');

        this.nameText = document.createElement('span');
        this.nameText.classList.add('npc-name-text');
        this.nameText.textContent = this.name;

        this.nameContainer.appendChild(this.nameText);
    }

    setCSS2DObject() {
        this.nameLabel = new CSS2DObject(this.nameContainer)
        this.nameLabel.position.set(0, 1, 0)
        this.target.object.add(this.nameLabel)
    }

    update() {
        const maxDistance = 20; // the maximum distance at which the pseudo disappears completely
        const distance = this.experience.camera.instance.position.distanceTo(this.target.object.position);

        if (distance >= maxDistance) {
            this.fadeOut();
        } else {
            this.fadeIn();
        }
    }

    fadeIn() {
        this.nameLabel.element.classList.add("fade-in");
        this.nameLabel.element.classList.remove("fade-out");
    }

    fadeOut() {
        this.nameLabel.element.classList.add("fade-out");
        this.nameLabel.element.classList.remove("fade-in");
    }

    destroy() {
        // null
        this.nameLabel.element.remove()
        this.nameLabel = null

        this.nameText.remove()
        this.nameText = null

        this.nameContainer.remove()
        this.nameContainer = null

        this.target = null
        this.name = null
        this.experience = null
    }
}