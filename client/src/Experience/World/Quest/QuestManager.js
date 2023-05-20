import Experience from "../../Experience.js";
import EventEmitter from "../../Utils/EventEmitter.js";
import Quest from "./Quest.js";


export default class QuestManager extends EventEmitter{

  constructor() {
    super();
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.debug = this.experience.debug
    this.resources = this.experience.resources

    this.activeQuests = {}
    this.completedQuests = {}
  }

  add(questId) {
    const quest = new Quest(this.resources.items.quest[questId])
    this.activeQuests[quest.id] = quest
    quest.on("complete", () => {
      this.complete(quest)
    })
    quest.on("track", () => {
      this.track(quest)
    })
  }

  track(quest, active = true) {
    if (active) {
      return this.activeQuests[quest.id]
    }
    return this.completedQuests[quest.id]
  }

  complete(quest) {
    quest.off("complete")
    quest.off("track")
    this.completedQuests[quest.id] = quest
    delete this.activeQuests[quest.id]
    this.experience.world.htmlAnnouncement.addQueue(this.experience.world.htmlAnnouncement.type.QUEST(
      quest.name + " complété !",
      2000
    ))
  }

  destroy() {
    this.activeQuests.forEach((quest) => {
      quest.destroy()
    })
    this.activeQuests = null
    this.completedQuests.forEach((quest) => {
      quest.destroy()
    })
    this.completedQuests = null
  }
}