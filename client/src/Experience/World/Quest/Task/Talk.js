import Task from "./Task.js";

export default class Talk extends Task{
    constructor(param) {
        super();

        this.goal = null
        this.dialogId = param.dialogId

        this.init(param)
    }

    init(param) {
        super.init(param)

        this.requirements = {
            item: param.requirements.item,
            quantity: param.requirements.quantity,
        }
        this.goal = {
            objective: this.requirements.quantity,
            progress: 0,
        }
        for (const [key, value] of Object.entries(this.experience.npc.list)) {
            if (value.id === this.requirements.item) {
                this.target = value
                value.on("talk", (item) => {
                    this.catch(item)
                })
            }
        }
    }

    catch(item) {
        if (!this.active) return
        if (item === this.requirements.item) {
            this.requirements.quantity--
            this.goal.progress++
            this.trigger("update")
            if (this.requirements.quantity === 0) {
                this.isComplete()
            }
        }
    }

    isComplete() {
        super.isComplete();
    }

    destroy() {
        super.destroy();
        this.goal = null
        this.dialogId = null
    }
}