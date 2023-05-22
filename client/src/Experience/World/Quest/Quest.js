import EventEmitter from "../../Utils/EventEmitter.js"
import Collect from "./Task/Collect.js"
import { v4 as uuidv4 } from 'uuid'
import Escort from "./Task/Escort.js"


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
      ESCORT: (param) => new Escort(param),
      // DELIVERY: (param) => new Delivery(param),
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
      this.activeTasks[task.id].target.marker.mark()
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