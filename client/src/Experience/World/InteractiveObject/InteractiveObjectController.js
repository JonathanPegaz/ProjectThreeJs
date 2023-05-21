import Experience from "../../Experience.js";
import EventEmitter from "../../Utils/EventEmitter.js";

export default class InteractiveObjectController extends EventEmitter{

  constructor() {
    super();
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.debug = this.experience.debug
    this.resources = this.experience.resources

    this.list = {}
  }

  get(uuid) {
    return this.list[uuid]
  }

  store(object) {
    this.list[object.id] = object
  }

  delete(uuid) {
    delete this.list[uuid]
  }

  catch(raycaster) {
    for (const [key, value] of Object.entries(this.list)) {
      const intersects = raycaster.intersectObject(value.hitbox);
      if (intersects.length > 0) {
        value.interact(raycaster);
      }
    }
  }

  destroy() {
    for (const [key, value] of Object.entries(this.list)) {
      value.destroy()
    }
  }
}