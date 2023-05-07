import * as THREE from 'three'
import Experience from "../../Experience.js";

export default class InteractiveObjectController {

  constructor() {
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
        value.interact();
      }
    }
  }

  destroy() {
    this.list.forEach((element) => {
      element.destroy()
    })
  }
}