import Task from "./Task.js";

export default class Inquire extends Task{
    constructor(param) {
        super();

        this.goal = null

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

        for (const [key, value] of Object.entries(this.experience.world.inquireZone)) {
            if (value.id === this.requirements.item) {
                this.target = value
                value.on("inquire", () => {
                    this.catch()
                })
            }
        }
    }

    catch() {
        this.requirements.quantity--
        this.goal.progress++
        this.trigger("update")
        if (this.requirements.quantity === 0) {
            this.isComplete()
        }
    }

    isComplete() {
        super.isComplete();
    }

    destroy() {
        super.destroy();
        this.goal = null
    }
}