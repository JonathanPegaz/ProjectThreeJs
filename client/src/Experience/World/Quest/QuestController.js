import Experience from "../../Experience.js";
import EventEmitter from "../../Utils/EventEmitter.js";
import CollectItemQuest from "./CollectItemQuest.js";

export default class QuestController extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.debug = this.experience.debug
    this.resources = this.experience.resources

    this.activeQuests = {}
    this.completedQuests = {}
    this.type = {
      COLLECT: (name, description, objective, reward) => new CollectItemQuest(name, description, objective, reward),
      // KILL: (name, description, objective, reward) => this.alert(name, description, objective, reward),
      // EXPLORE: (name, description, objective, reward) => this.kill(name, description, objective, reward),
    };

    this.new(this.type.COLLECT(
      "Collecter 5 bois",
      "Collecter 5 bois",
      {current: 0, goal: 5},
      {wood: 5}
    ))
  }

  new(quest) {

    this.activeQuests[quest.id] = quest
    this.experience.world.htmlAnnouncement.addQueue(this.experience.world.htmlAnnouncement.type.GUEST(
      quest.name,
      2000
    ))
  }

  track(id, active = true) {
    if (active) {
      return this.activeQuests[id]
    }
    return this.completedQuests[id]
  }

  complete(quest) {
    this.completedQuests[quest.id] = quest
    delete this.activeQuests[quest.id]
    this.experience.world.htmlAnnouncement.addQueue(this.experience.world.htmlAnnouncement.type.GUEST(
      quest.name + " complété !",
      2000
    ))
  }











  get(uuid) {
    return this.activeQuests[uuid]
  }

  store(object) {
    this.activeQuests[object.id] = object
  }

  delete(uuid) {
    delete this.activeQuests[uuid]
  }

  destroy() {
    this.activeQuests.forEach((element) => {
      element.destroy()
    })
    this.completedQuests.forEach((element) => {
      element.destroy()
    })
  }
}