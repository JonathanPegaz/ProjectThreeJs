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
        if (!value.questMarkerDisabled) {
          this.target = value
        }
        value.on('collect', (item) => {
          this.catch(item)
        })
      }
    }
  }

  catch(data) {
    if (!this.active) return

    const loot = data[0]
    const nb = data[1]

    if (loot === this.requirements.item && this.requirements.quantity > 0) {
      this.requirements.quantity  = this.requirements.quantity - nb
      this.goal.progress = this.goal.progress + nb
      this.trigger("update")
      if (this.requirements.quantity <= 0) {
        this.isComplete()
      }
    }
  }

  isComplete() {
    if (this.target) {
      this.target.marker.unmark()
    }
    super.isComplete();
  }

  destroy() {
    super.destroy();
    this.goal = null
  }
}