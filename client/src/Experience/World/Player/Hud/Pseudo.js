import Experience from "../../../Experience.js";
import {Vector3} from "three";

export default class Pseudo {
    constructor() {
        this.experience = new Experience()
        this.localPlayer = this.experience.localPlayer
        this.network = this.experience.network
        this.scene = this.experience.scene

        this.setLocalPlayerPseudo()
    }

    setLocalPlayerPseudo() {
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

        this.followText.innerHTML = this.experience.mainscreen.pseudo;

        this.boxPosition = new Vector3();
        this.boxPositionOffset = new Vector3();
        this.y_axis = new Vector3(0, 2, 0);
    }

    update() {
        this.updateLocalPlayerPseudo()
    }

    updateLocalPlayerPseudo() {
        // update pseudo
        this.boxPositionOffset.copy(this.localPlayer.object.position)
        this.boxPositionOffset.sub(this.localPlayer.thirdPersonCamera._currentPosition)
        this.boxPositionOffset.normalize();
        this.boxPositionOffset.applyAxisAngle(this.y_axis, - Math.PI / 2)
        this.boxPositionOffset.multiplyScalar(0.5)
        this.boxPositionOffset.y = 3

        this.boxPosition.setFromMatrixPosition( this.localPlayer.object.matrixWorld )
        this.boxPosition.add(this.boxPositionOffset)
        this.boxPosition.project(this.localPlayer.thirdPersonCamera.camera.instance)

        const rect = this.experience.canvas.getBoundingClientRect()
        const widthHalf = this.experience.sizes.width / 2, heightHalf = this.experience.sizes.height / 2
        this.boxPosition.x = rect.left + widthHalf
        this.boxPosition.y = rect.top - ( this.boxPosition.y * heightHalf ) + heightHalf

        this.followText.style.top = `${this.boxPosition.y}px`
        this.followText.style.left = `${this.boxPosition.x}px`
    }
}