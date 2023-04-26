import * as THREE from 'three'
import Player from "./Player.js";
import BasicCharacterController from "./CharacterController.js";
import ThirdPersonCamera from "./ThirdPersonCamera.js";
import io from 'socket.io-client';

export default class LocalPlayer extends Player {
    constructor() {
        super()

        this.setController()
        this.setThirdPersonCamera()
        this.setSocket()

    }

    setController() {
        this.controller = new BasicCharacterController(this.model, this.animations)
    }

    setThirdPersonCamera() {
        this.thirdPersonCamera = new ThirdPersonCamera(this.controller)
    }

    setSocket() {
        this.socket = io();

        this.socket.on('setId', (data) => {
            this.player.id = data.id;
        })

        this.socket.on('remoteData', (data) => {
            this.remoteData = data
        })

        this.socket.on('deletePlayer', (data) => {
            const players = this.remotePlayers.filter((player) => {
                if(player.id == data.id) {
                    return player
                }
            })
            if (players.length>0) {
                let index = this.remotePlayers.indexOf(players[0])
                if (index!==1) {
                    const player = this.initialisingPlayers[index]
                    player.deleted = true
                    this.initialisingPlayers.splice(index, 1)
                }
            }
        })
        this.initSocket()
    }

    initSocket() {
        this.socket.emit('init', {
            model:this.model,
            colour: this.colour,
            x: this.controller.position.x,
            y: this.controller.position.y,
            z: this.controller.position.z,
            h: this.controller.Rotation.y,
            pb: this.controller.Rotation.x
        })
    }

    updateSocket() {
        if (this.socket !== undefined){
            this.socket.emit('update', {
                x: this.controller.position.x,
                y: this.controller.position.y,
                z: this.controller.position.z,
                h: this.controller.Rotation.y,
                pb: this.controller.Rotation.x,
                action: this.action
            })
        }
    }

    update() {
        this.controller.update()
        this.updateSocket()
        super.update()

        if(this.thirdPersonCamera)
            this.thirdPersonCamera.update()
    }
}