import Quest from "./Quest.js";
import Experience from "../../Experience.js";


export default class CollectItemQuest extends Quest{
  constructor() {
    super();

    this.objective = {
      current: null,
      goal: null,
    }
  }

  progress() {
    this.objective.current++
    if (this.objective.current >= this.objective.goal) {
      this.setComplete()
    }
  }

  getReward() {
    //this.experience.world.player.inventory.add(this.reward)
  }
}