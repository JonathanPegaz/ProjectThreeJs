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
      if (value.meshs) {
        value.meshs.forEach(mesh => {
          if (mesh.hitbox) {
            const intersects = raycaster.intersectObject(mesh.hitbox);
            if (intersects.length > 0) {
              mesh.interacting = true
              value.interact(raycaster, mesh);
            } else if (mesh.interacting) {
              value.stopInteract(mesh);
              mesh.interacting = false
            }
          }
        })
        continue
      }

      const intersects = raycaster.intersectObject(value.hitbox);
      if (intersects.length > 0) {
        value.interact(raycaster);
      } else if (value.isInteracting) {
        value.stopInteract();
      }
    }
  }

  destroy() {
    for (const [key, value] of Object.entries(this.list)) {
      value.destroy()
    }
  }
}