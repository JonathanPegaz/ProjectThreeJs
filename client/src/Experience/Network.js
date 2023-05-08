import Experience from "./Experience.js";
import io from "socket.io-client";
import RemotePlayer from "./World/Player/RemotePlayer.js";


export default class Network {
    constructor() {
        this.experience = new Experience()
        this.localPlayer = this.experience.localPlayer
        this.scene = this.experience.scene

        // Network
        this.remotePlayers = [];
        this.remoteColliders = [];
        this.initialisingPlayers = [];
        this.remoteData = [];

        this.setSocket()
        this.initSocket()
    }

    setSocket() {
        this.socket = io();

        this.socket.on('setId', (data) => {
            this.localPlayer.id = data.id;
        })

        this.socket.on('remoteData', (data) => {
            this.remoteData = data
        })

        this.socket.on('deletePlayer', (data) => {
            const players = this.remotePlayers.filter((player) =>{
				if (player.id == data.id){
					return player;
				}
			});
			if (players.length>0){
				let index = this.remotePlayers.indexOf(players[0]);
				if (index!=-1){
					this.remotePlayers.splice( index, 1 );
					this.scene.remove(players[0].object);
				}else{
					index = this.initialisingPlayers.indexOf(data.id);
					if (index!=-1){
						const player = this.initialisingPlayers[index];
						player.deleted = true;
						this.initialisingPlayers.splice(index, 1);
					}
				}
			}
        })

        this.socket.on('chat message', (data) => {
            this.experience.hud.chat.addMessage(data)
        })
    }

    initSocket() {
        this.socket.emit('init', {
            model:"foxModel",
            //colour: this.colour,
            pseudo: this.localPlayer.pseudo.text,
            x: this.localPlayer.controller.Position.x,
            y: this.localPlayer.controller.Position.y,
            z: this.localPlayer.controller.Position.z,
            h: this.localPlayer.controller.Rotation.y,
            pb: this.localPlayer.controller.Rotation.x
        })
    }

    updateSocket() {
        if (this.socket !== undefined){
            this.socket.emit('update', {
                pseudo: this.localPlayer.pseudo.text,
                x: this.localPlayer.controller.Position.x,
                y: this.localPlayer.controller.Position.y,
                z: this.localPlayer.controller.Position.z,
                h: this.localPlayer.controller.Rotation.y,
                pb: this.localPlayer.controller.Rotation.x,
                action: this.localPlayer.controller.stateMachine._currentState.Name
            })
        }
    }

    updateRemotePlayers() {
        if (this.remoteData===undefined || this.remoteData.length == 0) return;

        const tempRemotePlayers = [];
        this.remoteData.forEach((data) => {
            if(this.localPlayer.id != data.id) {

                //Is this player being initialised?
                let iplayer
                this.initialisingPlayers.forEach((player) => {
                    if (player.id === data.id) iplayer = player;
                })

                //If not being initialised check the remotePlayers array
                if (iplayer===undefined) {
                    let rplayer
                    this.remotePlayers.forEach((player) => {
                        if (player.id === data.id) rplayer = player;
                    })

                    if (rplayer===undefined) {
                        // Initialise player
                        const newRemotePlayer = new RemotePlayer(data)
                        tempRemotePlayers.push(newRemotePlayer)
                    }
                    else {
                        //RemotePlayer exists
                        tempRemotePlayers.push(rplayer);
                    }
                }

            }
        })

        this.scene.children.forEach((object) =>{
             if (object.remotePlayer && this.getRemotePlayerById(object.id)==undefined){
                 this.scene.remove(object);
             }
         });

        this.remotePlayers = tempRemotePlayers;
        this.remotePlayers.forEach((player) => {
            player.update();
        })
    }

    getRemotePlayerById(id){
        if (this.remotePlayers===undefined || this.remotePlayers.length==0) return;

        const players = this.remotePlayers.filter((player) =>{
            if (player && player.id === id) return true;
        });

        if (players.length===0) return;

        return players[0];
    }

    update() {
        this.updateSocket()
        this.updateRemotePlayers()
    }
}