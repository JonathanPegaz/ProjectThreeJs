import Experience from "../../Experience.js";

export default class InteractiveObject {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.debug = this.experience.debug
    this.resources = this.experience.resources

    this.id = null
    this.canInteract = true

    this.add()
  }

  async add() {
    await this.wait(() => this.experience.world).then(() => {
      this.id = crypto.randomUUID()
      this.experience.world.interactiveObject.store(this)
    });
  }
  delete() {
    this.experience.world.interactiveObject.delete(this.id)
  }
  interact() { //TODO : must be override
    if (!this.canInteract) {
      return
    }
    this.canInteract = false

    console.log("Default interaction with", this.id)
    console.log(this)

    setTimeout(() => {
      this.canInteract = true
    }, 1000)
  }
  update(uuid) {
    //TODO : update object inside the list if his source change
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
  destroy() {
    this.id = null
    this.canInteract = null
  }
}