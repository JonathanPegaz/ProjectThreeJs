import * as THREE from 'three'
import Experience from "../../Experience.js";
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import {Vector3} from "three";

export default class RemotePlayer {
    constructor(data) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.network = this.experience.network

        this.resources = this.experience.resources
        this.resource = this.resources.items.foxModel

        this.object = new THREE.Object3D()
        this.object.position.set(0, 0, 0)
        this.object.rotation.set(0, 0, 0)

        this.id = data.id;
        this.model = data.model;
        this.colour = data.colour;
        this.pseudo = data.pseudo;
        this.remotePlayer = true

        const players = this.network.initialisingPlayers.splice(this.network.initialisingPlayers.indexOf(this), 1);
        this.network.remotePlayers.push(players[0])

        this.setModel()
        this.setAnimation()
        this.setPseudo()
    }

    setModel()
    {
        this.model = clone(this.resource.scene)
        this.model.scale.set(0.02, 0.02, 0.02)
        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })

        this.object.add(this.model)
        if (this.deleted===undefined) this.scene.add(this.object);
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

        this.action = 'idle'
    }

    set action(name){
		//Make a copy of the clip if this is a remote player
		if (this.actionName == name) return;
		const action = this.animations[name].action;
        action.time = 0;
		this.mixer.stopAllAction();
		this.actionName = name;
		this.actionTime = Date.now();
		
		action.fadeIn(0.5);	
		action.play();
	}
	
	get action(){
		return this.actionName;
	}

    setPseudo() {
        this.followText = document.createElement('div');
        this.followText.id = 'follow-text';
        this.followText.style.cssText= `
        position: absolute;
        color: white;
        background: #00000077;
        line-height: 40px;
        border: 1px solid #ffffff77;
        z-index: 100;
        font-family: Arial;
        font-weight: bold;
        font-size: 14px;
        margin: 0 10px;
        padding: 0 10px;`

        document.body.appendChild(this.followText);

        this.followText.innerHTML = this.pseudo;

        this.boxPosition = new THREE.Vector3();
        this.boxPositionOffset = new THREE.Vector3();
        this.y_axis = new Vector3(0, 2, 0);
    }

    update()
    {
        if (this.mixer) {
            this.mixer.update(this.time.delta / 1000)
        }

        if (this.network.remoteData.length > 0) {
            for (let data of this.network.remoteData) {
                if (data.id === this.id) {
                    // Found the player
                    this.object.position.set( data.x, data.y, data.z )
                    const euler = new THREE.Euler(data.pb, data.heading, data.pb)
                    this.object.quaternion.setFromEuler( euler )
                    this.action = data.action
                }
            }
        }

        // update pseudo
        this.boxPositionOffset.copy(this.object.position)
        this.boxPositionOffset.sub(this.experience.camera.instance.position)
        this.boxPositionOffset.normalize();
        this.boxPositionOffset.applyAxisAngle(this.y_axis, - Math.PI / 2)
        this.boxPositionOffset.multiplyScalar(0.5)
        this.boxPositionOffset.y = 3

        this.boxPosition.setFromMatrixPosition( this.object.matrixWorld )
        this.boxPosition.add(this.boxPositionOffset)
        this.boxPosition.project(this.experience.camera.instance)

        const rect = this.experience.canvas.getBoundingClientRect()
        const widthHalf = this.experience.sizes.width / 2, heightHalf = this.experience.sizes.height / 2
        this.boxPosition.x = rect.left + widthHalf + ( this.boxPosition.x * widthHalf )
        this.boxPosition.y = rect.top - ( this.boxPosition.y * heightHalf ) + heightHalf

        const distance = this.experience.camera.instance.position.distanceTo(this.object.position);
        const maxDistance = 50; // the maximum distance at which the pseudo disappears completely

        let scale = 1; // the scale of the pseudo
        if (distance >= maxDistance) {
            this.followText.style.opacity = `0`;
        } else {
            this.followText.style.opacity = `1`;
        }

        this.followText.style.top = `${this.boxPosition.y}px`
        this.followText.style.left = `${this.boxPosition.x - this.followText.clientWidth + 10}px`
    }

}