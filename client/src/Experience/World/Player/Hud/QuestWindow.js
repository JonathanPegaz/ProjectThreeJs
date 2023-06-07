import Experience from "../../../Experience.js";
import EventEmitter from "../../../Utils/EventEmitter.js";

export default class QuestWindow extends EventEmitter{
  constructor() {
    super();
    this.experience = new Experience()

    this.quest = null
    this.questWindow = document.getElementById("quest")
    this.toggleButton = document.getElementById("quest-toggle-btn")

    this.toggleButton.addEventListener("click", () => {
      this.questWindow.classList.toggle("quest-hidden");
      const icon = this.toggleButton.querySelector("img");
      if (this.questWindow.classList.contains("quest-hidden")) {
        icon.src = "icons/quest_icon.svg";
      } else {
        icon.src = "icons/close_icon.svg";
      }
    })


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
    this.questWindow.classList.remove("quest-active")
    const quesContainer = this.questWindow.querySelector(".quest-container")
    quesContainer.innerHTML = ""

    if (Object.keys(this.quest.activeQuests).length === 0) return

    this.questWindow.classList.add("quest-active")
    let questList = ""
    Object.entries(this.quest.activeQuests).forEach(([id, quest]) => {
      questList += this.setUIQuest(quest)
    });
    quesContainer.innerHTML += questList
  }

  setUIQuest(quest) {
    return `
      <div id="${quest.id}">
        <div class="quest-info">
          <h3 class="quest-title"><img src="icons/logo_blue.svg" alt="quest icon"><span>${quest.title}</span></h3>
          <p class="quest-title">${quest.description}</p>
        </div>
        <hr>
        <ul class="quest-tasks">
          ${Object.values(quest.activeTasks).map((task) => {
            return `
              <li id="${task.id}" class="quest-task quest-task-active">
                <span class="quest-task-name">${task.name}</span>
                <div class="quest-task-goal-container">
                  <span class="quest-task-goal">${task.goal.progress} / ${task.goal.objective}</span>
                  <div class="quest-task-mark">
                    <img src="icons/ui-quest-mark-empty.svg" alt="hexagon">
                  </div>
                </div>
              </li>`
          }).join('')}
          ${Object.values(quest.completedTasks).map((task) => {
            return `
              <li id="${task.id}" class="quest-task quest-task-completed">
                <span class="quest-task-name">${task.name}</span>
                  <div class="quest-task-goal-container">
                    <span class="quest-task-goal">${task.goal.progress} / ${task.goal.objective}</span>
                    <div class="quest-task-mark">
                      <img src="icons/ui-quest-mark-check-blue.svg" alt="hexagon">
                    </div>
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
    this.toggleButton.removeEventListener("click" , () => {})
    this.toggleButton = null
    this.questWindow = null
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