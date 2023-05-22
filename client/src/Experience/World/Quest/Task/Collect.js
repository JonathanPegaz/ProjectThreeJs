import Task from "./Task.js";

export default class Collect extends Task {
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
    this.world.collectZone.list.forEach((collectZone) => {
      if (collectZone.itemToCollect === this.requirements.item) {
        collectZone.on(`collect-${collectZone.id}`, (item) => {
          this.catch(item, collectZone)
        })
      }
    })
  }

  catch(item, collectZone) {
    if (!this.active) return

    if (item === this.requirements.item && this.requirements.quantity > 0) {
      this.requirements.quantity--
      this.goal.progress++
      this.trigger("update")
      if (this.requirements.quantity === 0) {
        this.isComplete(collectZone)
      }
    }
  }

  isComplete(collectZone) {
    collectZone.off(`collect-${collectZone.id}`)
    super.isComplete();
  }

  destroy() {
    super.destroy();
    this.goal = null
  }
}