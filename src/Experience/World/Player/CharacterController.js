import * as THREE from 'three'
import FiniteStateMachine from "../../Utils/FiniteStateMachine.js";
import BasicCharacterControllerInput from "./BasicCharacterControllerInput.js";
import Experience from "../../Experience.js";
import IdleState from "./State/IdleState.js";
import RunState from "./State/RunState.js";
import WalkState from "./State/WalkState.js";

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
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.time = this.experience.time
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        this.resource = this.resources.items.foxModel

        this.setModel()
        this.setAnimation()
        this.setParams()

    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.02, 0.02, 0.02)
        this.scene.add(this.model)
        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }

    setAnimation()
    {
        this.animations = {}

        this.mixer = new THREE.AnimationMixer(this.model)

        // action
        this.animations.idle = {
            clip: this.resource.animations[0],
            action: this.mixer.clipAction(this.resource.animations[0])
        }

        this.animations.walk = {
            clip: this.resource.animations[1],
            action: this.mixer.clipAction(this.resource.animations[1])
        }

        this.animations.run = {
            clip: this.resource.animations[2],
            action: this.mixer.clipAction(this.resource.animations[2])
        }
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

        if (this.mixer) {
            this.mixer.update(timeInSeconds);
        }

        this.detectCollision()
    }

    detectCollision() {
        const direction = new THREE.Vector3();
        const raycaster = new THREE.Raycaster(this.model.position, direction)
        const intersects = raycaster.intersectObjects(this.experience.scene.children)[0]

        console.log(intersects)

        // if (intersects.length > 0)
        //     let firstIntersection = intersects[0].point;

        if (!this.debug.active) return

        this.model.getWorldDirection(direction)
        direction.normalize()
        const distance = 3 // in meters
        const targetPosition = new THREE.Vector3().copy(this.model.position).add(direction.multiplyScalar(distance))

        const positions = new Float32Array([
            this.model.position.x, this.model.position.y+1, this.model.position.z,
            targetPosition.x, targetPosition.y+1, targetPosition.z,
        ])

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        const material = new THREE.LineBasicMaterial({
            color: 0xff0000, // white color
            linewidth: 10, // line width in pixels
        })

        const line = new THREE.Line(geometry, material)
        this.scene.add(line)

        // Remove the line after 2 seconds
        setTimeout(() => {
            this.scene.remove(line)
        }, 500)

    }
}


