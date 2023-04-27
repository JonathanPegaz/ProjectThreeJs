import * as THREE from 'three'
import Experience from "../../Experience.js";

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


        // this.player.object.userData.id = this.id
        // this.player.object.userData.remotePlayer = true
        // console.log('initial', this.network.initialisingPlayers)
        // const players = this.network.initialisingPlayers.splice(this.network.initialisingPlayers.indexOf(this), 1);
        // console.log('players', players)
        // this.network.remotePlayers.push(players[0])

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

        this.object.add(this.model)
        this.scene.add(this.object)
        //if (this.player.deleted===undefined) this.scene.add(this.object);
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

        this.mixer.clipAction(this.animations.idle.clip).play()
        //this.player.action = 'idle'
    }

    update()
    {
        if (this.mixer) {
            this.mixer.update(this.time.delta / 1000)
        }

        if (this.network.remoteData.length > 0) {
            let found = false
            for (let data of this.network.remoteData) {
                if (data.id != this.id) continue
                // Found the player
                this.object.position.set( data.x, data.y, data.z )
                const euler = new THREE.Euler(data.pb, data.heading, data.pb)
                this.object.quaternion.setFromEuler( euler )
                this.action = data.action
                found = true;
            }
            //if (!found) this.game.removePlayer(this);
        }
    }

}