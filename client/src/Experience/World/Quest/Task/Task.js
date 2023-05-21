import EventEmitter from "../../../Utils/EventEmitter.js";
import Experience from "../../../Experience.js";
import { v4 as uuidv4 } from 'uuid';


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
    this.id = uuidv4()
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