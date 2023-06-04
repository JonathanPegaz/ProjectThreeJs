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
          this.quest = this.experience.world.quest
          this.updateUI()
        })
      })
    })
  }

  updateUI() {
    const questWindow = document.getElementById("quest")
    questWindow.classList.remove("quest-active")
    questWindow.innerHTML = ""
    if (Object.keys(this.quest.activeQuests).length === 0) return

    questWindow.classList.add("quest-active")
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
        <hr>
        <ul class="quest-tasks">
          ${Object.values(quest.activeTasks).map((task) => {
            return `
              <li id="${task.id}" class="quest-task quest-task-active">
                <span class="quest-task-name">${task.name}</span>
                <span class="quest-task-goal">${task.goal.progress} / ${task.goal.objective}</span>
                <div class="quest-task-mark">
                  <img src="icons/ui-quest-mark-empty.svg" alt="hexagon">
                </div>
              </li>`
          }).join('')}
          ${Object.values(quest.completedTasks).map((task) => {
            return `
              <li id="${task.id}" class="quest-task quest-task-completed">
                <span class="quest-task-name">${task.name}</span>
                <span class="quest-task-goal">${task.goal.progress} / ${task.goal.objective}</span>
                <div class="quest-task-mark">
                  <img src="icons/ui-quest-mark-check-blue.svg" alt="hexagon">
                </div>
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