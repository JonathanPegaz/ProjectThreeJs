import * as THREE from 'three'
import Experience from "../../Experience.js";
import InteractiveObject from "./InteractiveObject.js";

export default class CollectZone extends InteractiveObject {
  constructor(position, name, radius = 1) {
    super();

    this.radius = null
    this.init(position, name, radius)
  }

  init(position, name, radius) {
    this.name = name
    this.radius = radius
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
    super.interact()
  }



  leave() {
    super.leave()
  }



  destroy() {
    super.destroy();
    this.radius = null
  }
}