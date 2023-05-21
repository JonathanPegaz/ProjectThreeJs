import * as THREE from 'three'
import Experience from "../../Experience.js";

export default class SpawnPoint {

  constructor(position, name) {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.debug = this.experience.debug

    this.name = null
    this.position = null

    this.init(position, name)
  }

  init(position, name) {
    this.name = name
    this.position = position
    this.object = new THREE.Object3D()
    this.object.position.set(position.x, position.y, position.z)
    this.scene.add(this.object)

    this.setHitbox()
  }

  setHitbox() {
    const geometry = new THREE.SphereGeometry(0.5, 16, 16)
    const material = new THREE.MeshBasicMaterial({ color: 0x242325, wireframe: true, visible: this.debug.active ?? false })
    this.hitbox = new THREE.Mesh(geometry, material)
    this.hitbox.position.copy(this.object.position)
    this.scene.add(this.hitbox)
  }

  destroy() {
    this.name = null
    this.position = null
  }

  updatePosition(newPosition) {
    this.position = newPosition
    this.object.position.copy(newPosition)
    this.hitbox.position.copy(newPosition)
  }
}