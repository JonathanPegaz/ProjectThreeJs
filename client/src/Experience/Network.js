import Experience from "./Experience.js";
import io from "socket.io-client";
import RemotePlayer from "./World/Player/RemotePlayer.js";


export default class Network {
    constructor() {
        this.experience = new Experience()
        this.localPlayer = this.experience.localPlayer

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
            console.log(this.remoteData)
        })

        // this.socket.on('deletePlayer', (data) => {
        //     const players = this.remotePlayers.filter((player) => {
        //         console.log('deletePlayer', player)
        //         if(player && player.id == data.id) {
        //             return player
        //         }
        //     })
        //     if (players.length>0) {
        //         let index = this.remotePlayers.indexOf(players[0])
        //         if (index!==1) {
        //             const player = this.initialisingPlayers[index]
        //             player.deleted = true
        //             this.initialisingPlayers.splice(index, 1)
        //         }
        //     }
        // })
    }

    initSocket() {
        this.socket.emit('init', {
            model:"foxModel",
            //colour: this.colour,
            x: this.localPlayer.controller.position.x,
            y: this.localPlayer.controller.position.y,
            z: this.localPlayer.controller.position.z,
            h: this.localPlayer.controller.Rotation.y,
            pb: this.localPlayer.controller.Rotation.x
        })
    }

    updateSocket() {
        if (this.socket !== undefined){
            this.socket.emit('update', {
                x: this.localPlayer.controller.position.x,
                y: this.localPlayer.controller.position.y,
                z: this.localPlayer.controller.position.z,
                h: this.localPlayer.controller.Rotation.y,
                pb: this.localPlayer.controller.Rotation.x,
                action: this.localPlayer.controller.stateMachine._currentState.name
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

        this.remotePlayers = tempRemotePlayers;
        this.remotePlayers.forEach((player) => {
            player.update();
        })
    }

    // updateRemotePlayers(){
    //     if (this.remoteData===undefined || this.remoteData.length == 0 || this.local===undefined || this.player.id===undefined) return;
    //
    //     const game = this.experience.world;
    //     //Get all remotePlayers from remoteData array
    //     const remotePlayers = [];
    //     const remoteColliders = [];
    //
    //     this.remoteData.forEach((data) => {
    //         if (game.player.id != data.id){
    //             //Is this player being initialised?
    //             let iplayer;
    //             this.initialisingPlayers.forEach((player) => {
    //                 if (player.id == data.id) iplayer = player;
    //             });
    //             //If not being initialised check the remotePlayers array
    //             if (iplayer===undefined){
    //                 let rplayer;
    //                 this.remotePlayers.forEach((player) => {
    //                     if (player && player.id == data.id) rplayer = player;
    //                 });
    //                 if (rplayer===undefined){
    //                     //Initialise player
    //                     this.initialisingPlayers.push( new RemotePlayer( false, data ));
    //                 }else{
    //                     //RemotePlayer exists
    //                     remotePlayers.push(rplayer);
    //                     remoteColliders.push(rplayer.collider);
    //                 }
    //             }
    //         }
    //     });
    //
    //     this.scene.children.forEach((object) =>{
    //         if (object.userData.remotePlayer && this.getRemotePlayerById(object.userData.id)==undefined){
    //             this.scene.remove(object);
    //         }
    //     });
    //
    //     this.remotePlayers = remotePlayers
    //     this.remoteColliders = remoteColliders
    //     this.remotePlayers.forEach((player) => { player.update() })
    // }

    getRemotePlayerById(id){
        if (this.remotePlayers===undefined || this.remotePlayers.length==0) return;

        const players = this.remotePlayers.filter((player) =>{
            if (player && player.id == id) return true;
        });

        if (players.length==0) return;

        return players[0];
    }

    update() {
        this.updateSocket()
        this.updateRemotePlayers()
    }
}