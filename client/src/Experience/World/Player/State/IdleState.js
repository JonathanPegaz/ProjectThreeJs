import State from "./CharacterState.js";

export default class IdleState extends State {
    constructor(parent) {
        super(parent);
    }

    get Name() {
        return 'idle';
    }

    Enter(prevState) {
        const idleAction = this._parent._proxy._animations['idle'].action;
        if (prevState) {
            const prevAction = this._parent._proxy._animations[prevState.Name].action;
            idleAction.time = 1.0;
            idleAction.enabled = true;
            idleAction.setEffectiveTimeScale(1.0);
            idleAction.setEffectiveWeight(1.0);
            idleAction.crossFadeFrom(prevAction, 0.5, true);
            idleAction.play();
        } else {
            idleAction.play();
        }
    }

    Exit() {
    }

    Update(_, input) {
        if (input.keys.down.forward || input.keys.down.backward) {
            this._parent.SetState('walk');
        }
        else if (input.keys.down.action) {
            this._parent.SetState('pick');
        }
        else if (input.keys.down.crouch) {
            this._parent.SetState('crouch');
        }
        /*else if (input.keys.down.jump) {
            this._parent.SetState('dance');
        }*/
    }
}