import EventEmitter from "../../../Utils/EventEmitter.js";
import Experience from "../../../Experience.js";


export default class Task extends EventEmitter{
  constructor() {
    super();
    this.experience = new Experience()

    this.id = null
    this.name = null
    this.description = null
    this.type = null
    this.requirements = null
    this.world = null

  }

  init(param) {
    this.id = crypto.randomUUID()
    this.world = this.experience.world

    this.name = param.name
    this.description = param.description
    this.type = this.constructor.name
  }

  catch() {
    throw new Error("You have to implement the method catch!");
  }

  isComplete() {
    this.trigger("completed")
  }

  destroy() {
    this.id = null
    this.name = null
    this.description = null
    this.type = null
    this.requirements = null
    this.world = null
  }
}