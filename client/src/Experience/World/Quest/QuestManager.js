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
    this.experience.alert.addQueue(this.experience.alert.type.QUEST,
      "Quête : " + quest.title,
      4000,
      'logo_blue'
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
    this.experience.alert.addQueue(this.experience.alert.type.QUEST,
      "Quête terminée : " +quest.title,
      4000,
      'check_icon'
    ).then(() => {
      if (quest.nextQuest !== undefined && quest.nextQuest !== null) {
        this.add(quest.nextQuest)
      }
    })

    this.trigger("update")
    this.trigger("completed")
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