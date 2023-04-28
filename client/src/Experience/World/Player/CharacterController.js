import * as THREE from 'three'
import FiniteStateMachine from "../../Utils/FiniteStateMachine.js";
import BasicCharacterControllerInput from "./BasicCharacterControllerInput.js";
import Experience from "../../Experience.js";
import IdleState from "./State/IdleState.js";
import RunState from "./State/RunState.js";
import WalkState from "./State/WalkState.js";
import * as CANNON from "cannon-es";

class BasicCharacterControllerProxy {
    constructor(animations) {
        this._animations = animations;
    }

    get animations() {
        return this._animations;
    }
}

class CharacterFSM extends FiniteStateMachine {
    constructor(proxy) {
        super();
        this._proxy = proxy;
        this._Init();
    }

    _Init() {
        this._AddState('idle', IdleState);
        this._AddState('walk', WalkState);
        this._AddState('run', RunState);
    }
}

export default class BasicCharacterController {
    constructor(model, animations) {
        this.experience = new Experience()

        this.camera = this.experience.camera
        this.time = this.experience.time
        this.model = model
        this.animations = animations
        this.resources = this.experience.resources
        this.sphereBody = null;

        this.setParams()
    }

    setParams()
    {
        this.decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
        this.acceleration = new THREE.Vector3(1, 0.25, 50.0);
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.position = new THREE.Vector3(0, 0, 0);

        this.input = new BasicCharacterControllerInput();
        this.stateMachine = new CharacterFSM(
            new BasicCharacterControllerProxy(this.animations));

        this.stateMachine.SetState('idle');
    }

    get Position() {
        return this.position;
    }

    get Rotation() {
        if(!this.model) {
            return new THREE.Quaternion();
        }
        return this.model.quaternion;
    }

    update() {
        if (!this.model) {
            return;
        }
        const timeInSeconds = this.time.delta / 1000;

        this.stateMachine.Update(timeInSeconds, this.input);

        const velocity = this.velocity;
        const frameDecceleration = new THREE.Vector3(
            velocity.x * this.decceleration.x,
            velocity.y * this.decceleration.y,
            velocity.z * this.decceleration.z
        );
        frameDecceleration.multiplyScalar(timeInSeconds);
        frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
            Math.abs(frameDecceleration.z), Math.abs(velocity.z));

        velocity.add(frameDecceleration);

        const controlObject = this.model;
        const _Q = new THREE.Quaternion();
        const _A = new THREE.Vector3();
        const _R = controlObject.quaternion.clone();

        const acc = this.acceleration.clone();
        if (this.input._keys.shift) {
            acc.multiplyScalar(2.0);
        }

        if (this.input._keys.forward) {
            velocity.z += acc.z * timeInSeconds;
        }
        if (this.input._keys.backward) {
            velocity.z -= acc.z * timeInSeconds;
        }
        if (this.input._keys.left) {
            _A.set(0, 1, 0);
            _Q.setFromAxisAngle(_A, 4.0 * Math.PI * timeInSeconds * this.acceleration.y);
            _R.multiply(_Q);
        }
        if (this.input._keys.right) {
            _A.set(0, 1, 0);
            _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * timeInSeconds * this.acceleration.y);
            _R.multiply(_Q);
        }

        controlObject.quaternion.copy(_R);

        const oldPosition = new THREE.Vector3();
        oldPosition.copy(controlObject.position);

        const forward = new THREE.Vector3(0, 0, 1);
        forward.applyQuaternion(controlObject.quaternion);
        forward.normalize();

        const sideways = new THREE.Vector3(1, 0, 0);
        sideways.applyQuaternion(controlObject.quaternion);
        sideways.normalize();

        sideways.multiplyScalar(velocity.x * timeInSeconds);
        forward.multiplyScalar(velocity.z * timeInSeconds);

        controlObject.position.add(forward);
        controlObject.position.add(sideways);

        this.position.copy(controlObject.position);
    }
}


