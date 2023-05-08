import * as THREE from 'three'
import Experience from "../../Experience.js";
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import Pseudo from "./Hud/Pseudo.js";

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
        this.remotePlayer = true

        this.pseudo = new Pseudo(this, data.pseudo)

        const players = this.network.initialisingPlayers.splice(this.network.initialisingPlayers.indexOf(this), 1);
        this.network.remotePlayers.push(players[0])

        this.setModel()
        this.setAnimation()
    }

    setModel()
    {
        this.model = clone(this.resource.scene)
        this.model.scale.set(0.006, 0.006, 0.006)
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

        this.pseudo.update()
    }

}