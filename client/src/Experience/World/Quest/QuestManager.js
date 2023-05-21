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
    quest.on("completed", () => {
      this.completed(quest)
    })
    quest.on("track", () => {
      this.track(quest)
    })
    quest.on("update", () => {
      this.trigger("update")
    })
    this.experience.world.htmlAnnouncement.addQueue(this.experience.world.htmlAnnouncement.type.QUEST,
      "Quête : " + quest.title,
      4000
    )
    this.trigger("update")
  }

  track(quest, active = true) {
    if (active) {
      return this.activeQuests[quest.id]
    }
    return this.completedQuests[quest.id]
  }

  completed(quest) {
    quest.off("completed")
    quest.off("track")
    quest.off("update")
    this.completedQuests[quest.id] = quest
    delete this.activeQuests[quest.id]
    this.experience.world.htmlAnnouncement.addQueue(this.experience.world.htmlAnnouncement.type.QUEST,
      "Quête complété : " +quest.title,
      4000
    )
    this.trigger("update")
  }

  destroy() {
    for (const [key, value] of Object.entries(this.activeQuests)) {
      value.off("completed")
      value.off("track")
      value.off("update")
      value.destroy()
    }
    this.activeQuests = null
    for (const [key, value] of Object.entries(this.completedQuests)) {
      value.destroy()
    }
    this.completedQuests = null
  }
}