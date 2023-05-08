import Experience from "../../../Experience.js";
import {Vector3} from "three";
import RemotePlayer from "../RemotePlayer.js";

export default class Pseudo {
    constructor(player, pseudo) {
        this.experience = new Experience()
        this.player = player
        this.text = pseudo

        this.setPlayerPseudo()
    }

    setPlayerPseudo() {
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

        this.boxPosition = new Vector3();
        this.boxPositionOffset = new Vector3();
        this.y_axis = new Vector3(0, 2, 0);
    }

    update() {
        this.updatePlayerPseudo()
    }

    updatePlayerPseudo() {
        // update pseudo
        this.boxPositionOffset.copy(this.player.object.position)
        this.boxPositionOffset.sub(this.experience.camera.instance.position)
        this.boxPositionOffset.normalize();
        this.boxPositionOffset.applyAxisAngle(this.y_axis, - Math.PI / 2)
        this.boxPositionOffset.multiplyScalar(0.5)
        this.boxPositionOffset.y = 3

        this.boxPosition.setFromMatrixPosition( this.player.object.matrixWorld )
        this.boxPosition.add(this.boxPositionOffset)
        this.boxPosition.project(this.experience.camera.instance)

        const rect = this.experience.canvas.getBoundingClientRect()
        const widthHalf = this.experience.sizes.width / 2, heightHalf = this.experience.sizes.height / 2
        this.boxPosition.x = rect.left  + ( this.boxPosition.x * widthHalf ) + widthHalf - (this.followText.clientWidth + 20)
        this.boxPosition.y = rect.top - ( this.boxPosition.y * heightHalf ) + heightHalf

        const distance = this.experience.camera.instance.position.distanceTo(this.player.object.position);
        const maxDistance = 50; // the maximum distance at which the pseudo disappears completely

        let scale = 1; // the scale of the pseudo
        if (distance >= maxDistance) {
            this.fadeOut()
        } else {
            this.fadeIn()
        }

        this.followText.style.top = `${this.boxPosition.y}px`
        this.followText.style.left = `${this.boxPosition.x}px`

    }

    fadeIn() {
        // fade in the chat
        this.followText.classList.add("fade-in");
        this.followText.classList.remove("fade-out");
    }

    fadeOut() {
        this.followText.classList.add("fade-out");
        this.followText.classList.remove("fade-in");
    }
}