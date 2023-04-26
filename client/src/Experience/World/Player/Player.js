import * as THREE from 'three'
import Experience from "../../Experience.js";

export default class Player {
    constructor(local, options = {}) {
        this.local = local
        this.options = options

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.resources = this.experience.resources
        this.resource = this.resources.items.foxModel

        this.remoteData = this.experience.remoteData
        this.remotePlayers = this.experience.remotePlayers
        this.initialisingPlayers = this.experience.initialisingPlayers

        this.player = this

        this.player.object = new THREE.Object3D()
        this.player.object.position.set(0, 0, 0)
        this.player.object.rotation.set(0, 0, 0)
        
        if (!this.local){
            this.local = false;
			this.id = this.options.id;
			//this.model = this.options.model;
			this.colour = this.options.colour;

            this.player.object.userData.id = this.id
            this.player.object.userData.remotePlayer = true
            const players = this.initialisingPlayers.splice(this.initialisingPlayers.indexOf(this), 1);
            this.remotePlayers.push(players[0])
        }

        this.setModel()
        this.setAnimation()

        
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.02, 0.02, 0.02)
        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })

        this.player.object.add(this.model)

        if (this.player.deleted===undefined) this.scene.add(this.player.object);
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
        if (!this.local){
            this.player.action = 'idle'
        }
    }

    update()
    {
        if (this.mixer) {
            this.mixer.update(this.time.delta / 1000)
        }

        if (this.remoteData.length > 0) {
            let found = false
            for (let data of this.remoteData) {
                if (data.id != this.id) continue
                // Found the player
                this.object.position.set( data.x, data.y, data.z )
                const euler = new THREE.Euler(data.pb, data.heading, data.pb)
                this.object.quaternion.setFromEuler( euler )
                this.action = data.action
                found = true;
            }
            if (!found) this.game.removePlayer(this);
        }
    }

}