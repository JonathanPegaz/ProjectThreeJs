import Experience from "../../../Experience.js";
import EventEmitter from "../../../Utils/EventEmitter.js";

export default class QuestWindow extends EventEmitter{
  constructor() {
    super();
    this.experience = new Experience()

    this.quest = null

    this.init()
  }

  async init() {
    await this.wait(() => this.experience.world !== undefined).then(async () => {
      await this.wait(() => this.experience.world.quest !== undefined).then(() => {
        this.quest = this.experience.world.quest
        this.updateUI()
        this.experience.world.quest.on("update", () => {
          console.log("UIQuest update")
          this.quest = this.experience.world.quest
          this.updateUI()
        })
      })
    })
  }

  updateUI() {
    const questWindow = document.getElementById("quest")
    questWindow.innerHTML = ""
    let questList = ""
    Object.entries(this.quest.activeQuests).forEach(([id, quest]) => {
      questList += this.setUIQuest(quest)
    });
    questWindow.innerHTML = questList
  }

  setUIQuest(quest) {
    return `
      <div id="${quest.id}">
        <div class="quest-info">
          <h3 class="quest-title">${quest.title}</h3>
          <p class="quest-title">${quest.description}</p>
        </div>
        <ul class="quest-tasks">
          ${Object.values(quest.activeTasks).map((task) => {
            return `
              <li id="${task.id}" class="quest-task">
                <span class="quest-task-name">${task.name}</span>
                <span class="quest-task-goal">${task.goal.progress} / ${task.goal.objective}</span>
              </li>`
          }).join('')}
          ${Object.values(quest.completedTasks).map((task) => {
            return `
              <li id="${task.id}" class="quest-task">
                <span class="quest-task-name">${task.name}</span>
                <span class="quest-task-goal">${task.goal.progress} / ${task.goal.objective}</span>
              </li>`
            }).join('')}
        </ul>
      </div> 
    `
  }

  destroy() {
    this.quest = null
    this.experience.world.quest.off("update")
  }

  wait(callback) {
    return new Promise((resolve) => {
      const check = () => {
        const value = callback();
        if (value) {
          resolve(value);
        } else {
          setTimeout(check, 0);
        }
      };
      check();
    });
  }
}