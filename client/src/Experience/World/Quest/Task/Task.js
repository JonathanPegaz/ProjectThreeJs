import EventEmitter from "../../../Utils/EventEmitter.js";
import Experience from "../../../Experience.js";


export default class Task extends EventEmitter{
  constructor() {
    super();
    this.experience = new Experience()

    this.id = null
    this.name = null
    this.description = null
    this.state = null
    this.type = null
    this.requirements = null
    this.world = null

  }

  async init(param) {
    await this.wait(() => this.experience.world).then(() => {
      this.id = crypto.randomUUID()
      this.world = this.experience.world

      this.state = "active"
      this.name = param.name
      this.description = param.description
      this.type = this.constructor.name
    });
  }

  catch() {
    throw new Error("You have to implement the method catch!");
  }

  isComplete() {
    this.state = "complete"
    this.trigger("complete")
  }

  destroy() {
    this.id = null
    this.name = null
    this.description = null
    this.state = null
    this.type = null
    this.requirements = null
    this.world = null
  }

  wait(callback) {
    return new Promise((resolve) => {
      const check = () => {
        const value = callback();
        if (value) {
          resolve(value);
        } else {
          setTimeout(check, 10);
        }
      };
      check();
    });
  }
}