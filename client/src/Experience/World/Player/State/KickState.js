import State from "./CharacterState.js";

export default class KickState extends State {
    constructor(parent) {
        super(parent);
    }

    get Name() {
        return 'kick';
    }

    Enter(prevState) {
        const curAction = this._parent._proxy._animations['kick'].action;
        if (prevState) {
            const prevAction = this._parent._proxy._animations[prevState.Name].action;

            curAction.enabled = true;

            if (prevState.Name == 'idle' || prevState.Name == 'walk' || prevState.Name == 'run') {
                const ratio = curAction.getClip().duration / prevAction.getClip().duration;
                curAction.time = prevAction.time * ratio;
            } else {
                curAction.time = 0.0;
                curAction.setEffectiveTimeScale(1.0);
                curAction.setEffectiveWeight(1.0);
            }

            curAction.crossFadeFrom(prevAction, 0.5, true);
            curAction.play();
        } else {
            curAction.play();
        }
        this.experience.localPlayer.canKick = false
    }

    Exit() {
    }

    Update(timeElapsed, input) {
        if (input.keys.down.action) {
            if (this.experience.localPlayer.canKick) {
                /*if (this.experience.audioController.Kick.isPlaying) {
                    return;
                }*/
                window.setTimeout(() => {
                    this.experience.audioController.Kick.play()
                }, 500)
                return;
            }

            this._parent.SetState('pick');
        }

        this._parent.SetState('idle');
    }
}