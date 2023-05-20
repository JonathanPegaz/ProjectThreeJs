import Task from "./Task.js";


export default class Collect extends Task{
  constructor(param) {
    super();

    this.goal = null

    this.init(param)
  }

  init(param) {
    super.init(param).then(() => {
      this.requirements = {
        item: param.requirements.item,
        quantity: param.requirements.quantity,
      }
      this.goal = this.requirements.quantity
      this.world.collectZone.list.forEach((collectZone) => {
        collectZone.on("collect", (item) => {
          this.catch(item)
        })
      })
    })
  }

  catch(item) {
    if (item === this.requirements.item) {
      this.requirements.quantity--
      if (this.requirements.quantity === 0) {
        this.isComplete()
      }
    }
  }

  destroy() {
    super.destroy();
    this.goal = null
  }
}