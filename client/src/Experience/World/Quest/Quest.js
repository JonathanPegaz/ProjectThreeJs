import EventEmitter from "../../Utils/EventEmitter.js"
import Collect from "./Task/Collect.js"
import { v4 as uuidv4 } from 'uuid'
import Talk from "./Task/Talk.js";
import Inquire from "./Task/Inquire.js";


export default class Quest extends EventEmitter{
  constructor(quest) {
    super()

    this.activeTasks = null
    this.completedTasks = null
    this.taskOrders = {}
    this.currentOrder = 0

    this.id = null
    this.title = null
    this.description = null
    this.taskEnum = {
      COLLECT: (param) => new Collect(param),
      TALK: (param) => new Talk(param),
      INQUIRE: (param) => new Inquire(param),
    }

    this.init(quest)
  }

  init(quest) {
    this.id = uuidv4()
    this.title = quest.title
    this.description = quest.description
    this.activeTasks = {}
    this.completedTasks = {}
    Object.values(quest.tasks).forEach((param) => {
      this.addTask(param)
    })

    this.startNextOrder()
  }

  addTask(param) {
    const task = param.type in this.taskEnum ? this.taskEnum[param.type](param) : null
    if (!task) return

    const order = param.order || 1

    if (!this.taskOrders[order]) {
      this.taskOrders[order] = {}
    }

    this.taskOrders[order][task.id] = task
  }

  startNextOrder() {
    this.currentOrder++
    if (!this.taskOrders[this.currentOrder]) {
      this.isComplete()
      return
    }

    Object.values(this.taskOrders[this.currentOrder]).forEach((task) => {
      this.activeTasks[task.id] = task

      if (this.activeTasks[task.id].target) {
        this.activeTasks[task.id].target.marker.mark()
      }

      task.on("completed", () => {
        this.completeTask(task)
      })
      task.on("update", () => {
        this.update()
      })
      task.setActive()
    })
  }

  completeTask(task) {
    task.off("completed")
    task.off("update")
    if (this.activeTasks[task.id].target) {
      this.activeTasks[task.id].target.marker.unmark()
    }
    this.completedTasks[task.id] = task
    delete this.activeTasks[task.id]
    this.update()
  }

  update() {
    if (Object.keys(this.activeTasks).length === 0) {
      this.startNextOrder()
    }
    this.trigger("update")
  }

  isComplete() {
    this.trigger("completed")
  }

  destroy() {
    for (const [key, value] of Object.entries(this.activeTasks)) {
      value.off("completed")
      value.off("update")
      value.destroy()
    }
    this.activeTasks = null
    for (const [key, value] of Object.entries(this.completedTasks)) {
      value.destroy()
    }
    this.completedTasks = null
    this.id = null
    this.title = null
    this.description = null
    this.taskEnum = null
  }
}