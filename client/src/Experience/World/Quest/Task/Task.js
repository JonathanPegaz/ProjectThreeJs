import EventEmitter from "../../../Utils/EventEmitter.js";
import Experience from "../../../Experience.js";
import { v4 as uuidv4 } from 'uuid';


export default class Task extends EventEmitter{
  constructor() {
    super();
    this.experience = new Experience()
    this.world = this.experience.world

    this.id = null
    this.name = null
    this.description = null
    this.type = null
    this.requirements = null
    this.order = null
    this.active = null
  }

  init(param) {
    this.id = uuidv4()

    this.name = param.name
    this.description = param.description
    this.type = this.constructor.name
    this.order = param.order !== undefined ? param.order : 0
    this.active = false
  }

  catch() {
    throw new Error("You have to implement the method catch!");
  }

  isComplete() {
    this.trigger("completed")
  }

  setActive() {
    this.active = true
  }

  destroy() {
    this.id = null
    this.name = null
    this.description = null
    this.type = null
    this.requirements = null
    this.world = null
    this.order = null
  }
}