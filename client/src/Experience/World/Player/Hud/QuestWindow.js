import Experience from "../../../Experience.js";
import EventEmitter from "../../../Utils/EventEmitter.js";

export default class QuestWindow extends EventEmitter{
  constructor() {
    super();
    this.experience = new Experience()

    this.init()
  }

  init() {

  }

  update() {

  }

  destroy() {

  }
}