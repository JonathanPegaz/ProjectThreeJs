import Experience from "./Experience.js";
import io from "socket.io-client";
import Player from "./World/Player/Player.js";


export default class Network {
    constructor() {
        this.experience = new Experience()

        // Network
        this.remotePlayers = [];
        this.remoteColliders = [];
        this.initialisingPlayers = [];
        this.remoteData = [];



        this.setSocket()
    }

    setSocket() {
        this.socket = io();

        this.socket.on('setId', (data) => {
            this.player.id = data.id;
        })

        this.socket.on('remoteData', (data) => {
            this.remoteData = data
            console.log(this.remoteData)
        })

        this.socket.on('deletePlayer', (data) => {
            const players = this.remotePlayers.filter((player) => {
                console.log('deletePlayer', player)
                if(player && player.id == data.id) {
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
            model:"foxModel",
            //colour: this.colour,
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

    updateRemotePlayers(){
        if (this.remoteData===undefined || this.remoteData.length == 0 || this.player===undefined || this.player.id===undefined) return;

        const game = this.experience.world;
        //Get all remotePlayers from remoteData array
        const remotePlayers = [];
        const remoteColliders = [];

        this.remoteData.forEach((data) => {
            if (game.player.id != data.id){
                //Is this player being initialised?
                let iplayer;
                this.initialisingPlayers.forEach((player) => {
                    if (player.id == data.id) iplayer = player;
                });
                //If not being initialised check the remotePlayers array
                if (iplayer===undefined){
                    let rplayer;
                    this.remotePlayers.forEach((player) => {
                        if (player && player.id == data.id) rplayer = player;
                    });
                    if (rplayer===undefined){
                        //Initialise player
                        this.initialisingPlayers.push( new Player( false, data ));
                    }else{
                        //Player exists
                        remotePlayers.push(rplayer);
                        remoteColliders.push(rplayer.collider);
                    }
                }
            }
        });

        this.scene.children.forEach((object) =>{
            if (object.userData.remotePlayer && this.getRemotePlayerById(object.userData.id)==undefined){
                this.scene.remove(object);
            }
        });

        this.remotePlayers = remotePlayers
        this.remoteColliders = remoteColliders
        this.remotePlayers.forEach((player) => { player.update() })
    }

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
        //this.updateRemotePlayers()
    }
}