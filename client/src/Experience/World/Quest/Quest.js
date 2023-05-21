import EventEmitter from "../../Utils/EventEmitter.js";
import Collect from "./Task/Collect.js";


export default class Quest extends EventEmitter{
  constructor(quest) {
    super();

    this.activeTasks = null
    this.completedTasks = null

    this.id = null
    this.title = null
    this.description = null
    this.taskEnum = {
      COLLECT: (param) => new Collect(param),
      // ESCORT: (param) => new Escort(param),
      // DELIVERY: (param) => new Delivery(param),
    }

    this.init(quest)
  }

  init(quest) {
    this.id = crypto.randomUUID()
    this.title = quest.title
    this.description = quest.description
    this.activeTasks = {}
    this.completedTasks = {}
    Object.values(quest.tasks).forEach((param) => {
      this.addTask(param)
    })
  }

  addTask(param) {
    const task = param.type in this.taskEnum ? this.taskEnum[param.type](param) : null
    if (!task) return

    this.activeTasks[task.id] = task
    this.activeTasks[task.id].on("completed", () => {
      this.completeTask(task)
    })
    this.activeTasks[task.id].on("update", () => {
      this.update()
    })
  }

  completeTask(task) {
    task.off("completed")
    task.off("update")
    this.completedTasks[task.id] = task
    delete this.activeTasks[task.id]
    if (Object.keys(this.activeTasks).length === 0) {
      return this.isComplete()
    }
    this.update()
  }

  update() {
    this.trigger("update")
  }

  isComplete() {
    this.trigger("completed")
  }

  destroy() {
    this.activeTasks.forEach((task) => {
      task.off("completed")
      task.off("update")
      task.destroy()
    })
    this.activeTasks = null
    this.completedTasks.forEach((task) => {
      task.destroy()
    })
    this.completedTasks = null
    this.id = null
    this.title = null
    this.description = null
    this.taskEnum = null
  }
}