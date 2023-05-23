import Experience from "../Experience.js";
import { gsap } from 'gsap'
import {CSS2DObject} from "three/addons/renderers/CSS2DRenderer.js";


export default class Icons {
    constructor(target, icons) {
        this.experience = new Experience()
        this.target = target
        this.icons = icons

        this.setHTML()
        this.setCSS2DObject()
        this.setAnimation()
    }

    setHTML() {
        this.iconImage = document.createElement('img');
        this.iconImage.src = 'icons/'+ this.icons +'.png';
        this.iconImage.classList.add('icon-image');
        this.iconImage.style.transform = `scale(0.5)`
    }

    setCSS2DObject() {
        this.iconLabel = new CSS2DObject(this.iconImage);
        this.iconLabel.position.set(0, 1.5, 0);
        this.target.object.add(this.iconLabel);
    }

    setAnimation() {
        // gsap animation up and down
        gsap.to(this.iconLabel.position, {y: this.iconLabel.position.y + 0.2, duration: 0.5, yoyo: true, repeat: -1})
    }

    change(source) {
        this.iconImage.src = 'icons/'+ source +'.png';
    }

    visible(isVisible) {
        this.iconLabel.visible = isVisible
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
        this.iconLabel.element.classList.add("fade-in");
        this.iconLabel.element.classList.remove("fade-out");
    }

    fadeOut() {
        this.iconLabel.element.classList.add("fade-out");
        this.iconLabel.element.classList.remove("fade-in");
    }

    destroy() {
        this.target.object.remove(this.object)

        // remove dialog label
        this.target.object.remove(this.iconLabel)
        this.iconLabel = null
        this.iconImage = null

        // null
        this.experience = null
        this.object = null
        this.material = null
        this.icons = null
        this.target = null
    }
}