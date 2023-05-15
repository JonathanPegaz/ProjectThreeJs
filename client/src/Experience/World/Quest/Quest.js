import Experience from "../../Experience.js";


export default class Quest {
  constructor(name, description, objective, reward) {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.debug = this.experience.debug
    this.resources = this.experience.resources

    this.id = null
    this.name = null
    this.description = null
    this.objective = {}
    this.reward = {}
    this.status = null

    this.init(name, description, objective, reward)
  }

  async init(name, description, objective, reward) {
    this.name = name
    this.description = description
    this.objective = objective
    this.reward = reward
    await this.wait(() => this.experience.world).then(() => {
      this.id = crypto.randomUUID()
      this.experience.world.quest.store(this)
    });
  }

  start() {
    this.status = "started"
  }

  setTarget() {
    this.status = "targeted"
  }

  setComplete() {
    this.status = "completed"
    this.getReward()
    this.experience.world.quest.complete(this)
  }

  getReward() {
    //TODO: must be override
  }

  delete() {
    this.experience.world.quest.delete(this.id)
  }
  destroy() {
    this.id = null
    this.name = null
    this.description = null
    this.objective = null
    this.reward = null
    this.status = null
  }

  wait(callback) {
    return new Promise((resolve) => {
      const check = () => {
        const value = callback();
        if (value) {
          resolve(value);
        } else {
          setTimeout(check, 10);
        }
      };
      check();
    });
  }
}