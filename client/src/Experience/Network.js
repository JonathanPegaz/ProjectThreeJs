import Experience from "./Experience.js";
import io from "socket.io-client";
import RemotePlayer from "./World/Player/RemotePlayer.js";


export default class Network {
    constructor() {
        this.experience = new Experience()

        // Network
        this.remotePlayers = [];
        this.remoteData = [];
        this.deletedPlayers = [];
    }

    setSocket() {
        this.socket = io();

        this.socket.on('setId', (data) => {
            this.experience.localPlayer.id = data.id;
        })

        this.socket.on('newPlayer', (data) => {
            const remotePlayer = this.getRemotePlayerById(data.id)
            if (remotePlayer) {
                const newRemotePlayer = new RemotePlayer(data)
                this.remotePlayers.push(newRemotePlayer)
            }
        })

        this.socket.on('remoteData', (data) => {
            this.remoteData = data
            if (this.remoteData===undefined || this.remoteData.length == 0) return;

            this.remoteData.forEach((data) => {
                // Is the data is in the deletedPlayers array
                if (this.deletedPlayers.includes(data.id)) {
                    // Remove the data from the deletedPlayers array
                    this.deletedPlayers.splice(this.deletedPlayers.indexOf(data.id), 1)
                    return;
                }

                // If the data is the local player
                if (this.experience.localPlayer.id === data.id) {
                    return;
                }

                // If the data is a remote player
                const remotePlayer = this.getRemotePlayerById(data.id)
                if (remotePlayer) {
                    remotePlayer.networkUpdate(data)
                } else {
                    const newRemotePlayer = new RemotePlayer(data)
                    this.remotePlayers.push(newRemotePlayer)
                }

            })
        })

        this.socket.on('deletePlayer', (data) => {
            const remotePlayer = this.getRemotePlayerById(data.id)
            if (remotePlayer) {
                this.deletedPlayers.push(remotePlayer.id)
                remotePlayer.destroy()
                this.remotePlayers.splice(this.remotePlayers.indexOf(remotePlayer), 1)
            }
        })

        this.socket.on('chat message', (data) => {
            this.experience.hud.chat.addMessage(data)
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
        // update remote players
        this.remotePlayers.forEach((remotePlayer) => {
            remotePlayer.update()
        })
    }

    destroy() {
        this.socket.disconnect()

        this.remotePlayers.forEach((remotePlayer) => {
            remotePlayer.destroy()
        })

        this.remotePlayers = []
        this.deletedPlayers = []
        this.remoteData = []
    }
}