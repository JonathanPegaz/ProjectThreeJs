import Experience from "../../Experience.js";
import * as THREE from "three";
import EventEmitter from "../../Utils/EventEmitter.js";
import { v4 as uuidv4 } from 'uuid';

export default class InteractiveObject extends EventEmitter{
  constructor() {
    super();
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.debug = this.experience.debug
    this.resources = this.experience.resources

    this.isInteracting = false
    this.id = null
    this.hitbox = null
    this.name = null
    this.position = null
    this.object = null
  }

  async add() {
    await this.wait(() => this.experience.world).then(() => {
      this.id = uuidv4()
      this.experience.world.interactiveObject.store(this)
    });
  }
  delete() {
    this.experience.world.interactiveObject.delete(this.id)
  }
  interact(origin, limit = null) {
    if (this.isInteracting) {
      return true
    }
    this.isInteracting = true
    this.trigger(this.name, ["ENTER"])
    this.stay(origin.ray.origin, limit).then(() => {
      this.leave()
    })

    return false
  }

  stay(origin, limit) {
    limit = limit ?? this.hitbox.geometry.parameters.radius+0.5
    return new Promise((resolve) => {
      const check = () => {
        const origin2D = new THREE.Vector2(origin.x, origin.z)
        const distance = origin2D.distanceTo(new THREE.Vector2(this.position.x, this.position.z))
        if (distance < limit) {
          this.trigger(this.name, ["STAY"])
          setTimeout(check, 500);
        } else {
          resolve();
        }
      };
      check();
    });
  }

  leave() {
    this.isInteracting = false
    this.trigger(this.name, ["LEAVE"])
  }

  destroy() {
    this.delete()
    this.isInteracting = false
    this.id = null
    this.hitbox = null
    this.name = null
    this.position = null
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