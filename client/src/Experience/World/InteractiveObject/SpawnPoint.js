import * as THREE from 'three'
import Experience from "../../Experience.js";
import InteractiveObject from "./InteractiveObject.js";

export default class SpawnPoint extends InteractiveObject {

  constructor(position, name, radius = 1) {
    super()
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.debug = this.experience.debug
    this.resources = this.experience.resources

    this.name = name
    this.position = position
    this.radius = radius

    this.hitbox = null

    this.init(position, name)
  }

  init(position, name) {
    this.name = name
    this.object = new THREE.Object3D()
    this.object.position.set(position.x, position.y, position.z)
    this.scene.add(this.object)

    this.setHitbox()
  }

  setHitbox() {
    const geometry = new THREE.SphereGeometry(this.radius, 16, 16)
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true, visible: this.debug.active ?? false })
    this.hitbox = new THREE.Mesh(geometry, material)
    this.hitbox.position.set(this.position.x, this.position.y, this.position.z)
    this.scene.add(this.hitbox)
  }

  interact() {
    console.log("SpawnPoint interact")
  }

  destroy() {
    this.name = null
    this.position = null
    this.debug = null
    this.hitbox = null
    //this.radius = null
  }

  // DEBUG
  updatePosition(newPosition) {
    this.position = newPosition
    this.object.position.copy(newPosition)
    this.hitbox.position.copy(newPosition)
  }

  updateHitboxRadius(radius) {
    this.hitbox.geometry.dispose();
    this.hitbox.geometry = new THREE.SphereGeometry(radius, 16, 16);
  }
}