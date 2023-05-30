import Task from "./Task.js";

export default class Collect extends Task {
  constructor(param) {
    super();

    this.goal = null
    this.target = null

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

    for (const [key, value] of Object.entries(this.world.interactiveObject.list)) {
      if (value.type === 'collectable' && value.itemToCollect === this.requirements.item) {
        this.target = value
        value.on('collect', (item) => {
          this.catch(item)
        })
      }
    }
  }

  catch(item) {
    if (!this.active) return

    if (item === this.requirements.item && this.requirements.quantity > 0) {
      this.requirements.quantity--
      this.goal.progress++
      this.trigger("update")
      if (this.requirements.quantity === 0) {
        this.isComplete()
      }
    }
  }

  isComplete() {
    this.target.marker.unmark(this.target.id)
    super.isComplete();
  }

  destroy() {
    super.destroy();
    this.goal = null
  }
}