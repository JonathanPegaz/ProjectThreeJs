import * as THREE from 'three'
import FiniteStateMachine from "../../Utils/FiniteStateMachine.js";
import BasicCharacterControllerInput from "./BasicCharacterControllerInput.js";
import Experience from "../../Experience.js";
import IdleState from "./State/IdleState.js";
import RunState from "./State/RunState.js";
import WalkState from "./State/WalkState.js";
import JoyStick from "../../Utils/JoyStick.js";

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
    constructor(localPlayer) {
        this.experience = new Experience()
        this.localPlayer = localPlayer

        this.camera = this.experience.camera
        this.time = this.experience.time

        this.setParams()
    }

    setParams()
    {
        this.decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
        this.acceleration = new THREE.Vector3(1, 0.25, 50.0);
        this.velocity = new THREE.Vector3(0, 0, 0);

        this.input = new BasicCharacterControllerInput();
        this.stateMachine = new CharacterFSM(
            new BasicCharacterControllerProxy(this.localPlayer.animations));

        this.isJoyStickTouch = false
        this.joystickSetup =  {forward: 0, turn: 0 }
        this.joystick = new JoyStick({
            onMove: (forward, turn) => {
                this.isJoyStickTouch = true
                this.joystickSetup.forward = forward
                this.joystickSetup.turn = -turn
            }
        })

        this.stateMachine.SetState('idle');
    }

    get Position() {
        return this.localPlayer.object.position;
    }

    get Rotation() {
        if(!this.localPlayer.object) {
            return new THREE.Quaternion();
        }
        return this.localPlayer.object.quaternion;
    }

    respawn() {
        this.experience.world.respawn.execute(this.localPlayer)
    }

    update() {
        if (!this.localPlayer.object) {
            return;
        }
        const timeInSeconds = this.time.delta / 1000;
        if (this.isJoyStickTouch) {
            this.handleJoystick(timeInSeconds)
        }
        this.handleKeyboard(timeInSeconds)
        this.stateMachine.Update(timeInSeconds, this.input);
        if (this.Position.y < -15) {
            this.respawn()
        }
    }

    handleJoystick(timeInSeconds) {
        let maxSteerVal = 0.03
        let maxForce = .10
        let force = maxForce * this.joystickSetup.forward
        let steer = maxSteerVal * this.joystickSetup.turn
        if (this.joystickSetup.forward !== 0) {
            if (this.input._keys.shift) {
                force = force * 1.5;
            }
            this.localPlayer.object.translateZ(force)
            if(this.joystickSetup.forward > 0) {
                this.input._keys.forward = true
            } else {
                this.input._keys.backward = true
            }
        } else {
            if (this.isJoyStickTouch) {
                this.input._keys.forward = false
                this.input._keys.backward = false
                this.isJoyStickTouch = false
            }
        }
        this.localPlayer.object.rotateY(steer)
    }

    handleKeyboard(timeInSeconds) {
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

        const controlObject = this.localPlayer.object;
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

        this.localPlayer.object.position.copy(controlObject.position);
    }

    destroy() {
        this.input.destroy()
        this.joystick.destroy()

        this.input = null
        this.stateMachine = null
        this.joystick = null

        this.localPlayer = null
        this.camera = null
        this.time = null

        this.decceleration = null
        this.acceleration = null
        this.velocity = null

        this.isJoyStickTouch = null
        this.joystickSetup = null

        this.Position = null
        this.Rotation = null
    }
}


