import * as THREE from 'three'
import Experience from "../../Experience.js";
export default class SphereCollider {
  constructor(object, radius) {
    this.experience = new Experience()
    this.debug = this.experience.debug
    this.object = object
    this.geometry = new THREE.SphereGeometry(radius || 2, 32, 32)
    this.material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      opacity: this.debug.active ? 0.5 : 0,
      transparent: true,
      wireframe: true
    })
    this.hitbox = new THREE.Mesh(this.geometry, this.material)
    this.updateHitbox()
  }

  updateHitbox() {
    this.hitbox.position.copy(this.object.position)
  }
}