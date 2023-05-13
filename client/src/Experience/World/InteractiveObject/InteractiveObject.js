import Experience from "../../Experience.js";
import * as THREE from "three";

export default class InteractiveObject {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.debug = this.experience.debug
    this.resources = this.experience.resources

    this.canInteract = true
    this.id = null
    this.hitbox = null
    this.name = null
    this.position = null
    this.object = null
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
  interact(origin) {
    if (!this.canInteract) {
      return false
    }
    this.canInteract = false
    this.stay(origin.ray.origin).then(() => {
      this.leave()
    })

    return true
  }

  stay(origin, limit = this.hitbox.geometry.parameters.radius+1) {
    return new Promise((resolve) => {
      const check = () => {
        const distance = origin.distanceTo(this.position)
        if (distance > limit) {
          resolve();
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    });
  }

  leave() {
    this.canInteract = true
  }

  destroy() {
    this.id = null
    this.canInteract = null
    this.hitbox = null
    this.name = null
    this.position = null
    this.debug = null
    this.object = null
  }
  updatePosition(newPosition) {
    this.position = newPosition
    this.object.position.copy(newPosition)
    this.hitbox.position.copy(newPosition)
  }
  updateHitboxRadius(radius) {
    this.hitbox.geometry.dispose();
    this.hitbox.geometry = new THREE.SphereGeometry(radius, 16, 16);
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