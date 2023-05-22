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
    this.world.collectZone.list.forEach((collectZone) => {
      if (collectZone.itemToCollect === this.requirements.item) {
        //TODO: replace by an array if multiple collectZone can be used
        this.target = collectZone
        this.target.on(`collect-${this.target.id}`, (item) => {
          this.catch(item)
        })
      }
    })
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
    console.log("Collect task is complete")
    this.target.marker.unmark(this.target.id)
    this.target.off(`collect-${this.target.id}`)
    super.isComplete();
  }

  destroy() {
    super.destroy();
    this.goal = null
  }
}