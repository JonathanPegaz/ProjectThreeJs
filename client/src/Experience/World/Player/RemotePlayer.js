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
        this.scene.add(this.object);
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

        this.pseudo.update()
    }

    networkUpdate(data) {
        // Update from network
        this.object.position.set( data.x, data.y, data.z )
        const euler = new THREE.Euler(data.pb, data.heading, data.pb)
        this.object.quaternion.setFromEuler( euler )
        this.action = data.action
    }

    destroy() {

        //destroy mixer
        this.mixer.stopAllAction()
        this.mixer.uncacheRoot(this.model)
        this.mixer = null

        //destroy model
        this.model.traverse((child) =>
        {
            // Loop through the material properties
            for(const key in child)
            {
                const value = child[key]

                // Test if there is a invisible property


                // Test if there is a dispose function
                if(value && typeof value.dispose === 'function')
                {
                    value.dispose()
                }

                // Test if there is a remove function
                if(value && typeof value.remove === 'function')
                {
                    value.remove()
                }
            }
        })

        //destroy pseudo
        this.pseudo.destroy()

        //destroy object
        this.object.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.material.dispose()
                child.geometry.dispose()
            }
        })


        this.scene.remove(this.model);
        this.scene.remove(this.object);

        this.model = null
        this.object = null
    }

}