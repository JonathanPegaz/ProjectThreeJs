import InteractiveObject from "../InteractiveObject.js";
import Experience from "../../../Experience.js";
import * as THREE from "three";


export default class AnnouncementZone extends InteractiveObject {
  constructor(position, name, radius = 1, unableGIF = false) {
    super()
    this.experience = new Experience()

    this.name = name
    this.unableGIF = unableGIF
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

    this.wait(() => this.experience.alert).then(() => {
      this.experience.alert.addQueue(this.experience.alert.type.AREA, this.name, 6000, this.unableGIF)
    })
  }

  destroy() {
    super.destroy()
    this.radius = null
  }
}