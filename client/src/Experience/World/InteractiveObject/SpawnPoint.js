import * as THREE from 'three'
import Experience from "../../Experience.js";
import InteractiveObject from "./InteractiveObject.js";

export default class SpawnPoint extends InteractiveObject {

  constructor(position, name, radius = 1) {
    super()
    this.experience = new Experience()
    this.radius = null

    this.init(position, name, radius)
  }

  init(position, name, radius) {
    this.name = name
    this.radius = radius
    this.position = position
    this.object = new THREE.Object3D()
    this.object.position.set(this.position.x, this.position.y, this.position.z)
    this.scene.add(this.object)

    this.setHitbox()
    this.add()
  }

  setHitbox() {
    const geometry = new THREE.SphereGeometry(this.radius, 16, 16)
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true, visible: this.debug.active ?? false })
    this.hitbox = new THREE.Mesh(geometry, material)
    this.hitbox.position.set(this.position.x, this.position.y, this.position.z)
    this.scene.add(this.hitbox)
  }

  interact(origin) {
    const isBusy = super.interact(origin)
    if (isBusy) return

    this.wait(() => this.experience.world.htmlAnnouncement).then(() => {
      this.experience.world.htmlAnnouncement.addQueue(this.experience.world.htmlAnnouncement.type.AREA, this.name, 3000)
    })
  }

  destroy() {
    super.destroy()
    this.radius = null
  }
}