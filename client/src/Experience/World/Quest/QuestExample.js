import Quest from "./Quest.js";
import Experience from "../../Experience.js";


export default class QuestExample extends Quest{
  constructor() {
    super();

    this.experience = new Experience()
    this.scene = this.experience.scene
    this.debug = this.experience.debug
    this.resources = this.experience.resources

    this.init()
  }

  init() {
    this.name = "Example Quest"
    this.description = "Marcher 1000 pas."
  }

  destroy() {
    super.destroy();
  }
}