import Experience from "../../Experience.js";
import EventEmitter from "../../Utils/EventEmitter.js";
import Collect from "./Task/Collect.js";


export default class Quest extends EventEmitter{
  constructor(quest) {
    super();
    this.experience = new Experience()
    this.resources = this.experience.resources

    this.activeTasks = {}
    this.completedTasks = {}

    this.id = null
    this.title = null
    this.description = null
    this.state = null
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
    this.state = "active"
    Object.values(quest.tasks).forEach((param) => {
      this.addTask(param)
    })
  }

  addTask(param) {
    const task = param.type in this.taskEnum ? this.taskEnum[param.type](param) : null
    if (!task) return

    this.activeTasks[task.id] = task
    this.activeTasks[task.id].on("complete", () => {
      this.completeTask(task)
    })
  }

  completeTask(task) {
    this.completedTasks[task.id] = task
    delete this.activeTasks[task.id]
    if (Object.keys(this.activeTasks).length === 0) {
      this.isComplete()
    }
  }

  isComplete() {
    this.state = "completed"
    this.trigger("completed")
  }

  destroy() {
    this.activeTasks.forEach((task) => {
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
    this.state = null
    this.taskEnum = null
  }
}