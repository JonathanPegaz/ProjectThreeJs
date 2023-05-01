import * as THREE from 'three'
import Experience from "../../Experience.js";

export default class ThirdPersonCamera {
    constructor(target) {
        this.experience = new Experience()
        this.camera = this.experience.camera
        this.time = this.experience.time
        this.target = target;

        this._currentPosition = new THREE.Vector3();
        this._currentLookat = new THREE.Vector3();
    }

    _CalculateIdealOffset() {
        const idealOffset = new THREE.Vector3(-3, 6, -11);
        idealOffset.applyQuaternion(this.target.Rotation);
        idealOffset.add(this.target.Position);
        return idealOffset;
    }

    _CalculateIdealLookat() {
        const idealLookat = new THREE.Vector3(0, 0, 0);
        idealLookat.applyQuaternion(this.target.Rotation);
        idealLookat.add(this.target.Position);
        return idealLookat;
    }

    update() {
        const timeElapsed = this.time.elapsed  * 0.001;
        const idealOffset = this._CalculateIdealOffset();
        const idealLookat = this._CalculateIdealLookat();

        // const t = 0.05;
        // const t = 4.0 * timeElapsed;
        const t = 1.0 - Math.pow(0.001, timeElapsed);

        if (!this.camera.isOrbitControlActive) {
            this._currentPosition.lerp(idealOffset, t);
            this._currentLookat.lerp(idealLookat, t);

            this.camera.instance.position.copy(this._currentPosition);
            this.camera.instance.lookAt(this._currentLookat);
        }
    }

    destroy() {
        this.camera = null;
        this.time = null;
        this.target = null;

        this._currentPosition = null;
        this._currentLookat = null;

    }
}
