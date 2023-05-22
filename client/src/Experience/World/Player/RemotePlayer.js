import Pseudo from "../../Interface/Pseudo.js";
import Player from "./Player.js";
import {Euler} from "three";

export default class RemotePlayer extends Player {
    constructor(data) {
        super()

        this.id = data.id;
        this.model = data.model;
        this.colour = data.colour;
        this.remotePlayer = true

        this.pseudo = new Pseudo(this, data.pseudo)
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
        this.object.rotation.x = data.rx
        this.object.rotation.y = data.ry
        this.object.rotation.z = data.rz
        this.action = data.action
    }

    destroy() {

        //destroy mixer
        this.mixer.stopAllAction()
        this.mixer.uncacheRoot(this.model)
        this.mixer = null

        //destroy pseudo
        this.pseudo.destroy()

        this.scene.remove(this.object);

        super.destroy()
    }

}