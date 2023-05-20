import * as THREE from 'three'
import InteractiveObject from "./InteractiveObject.js";

export default class TriggerZone extends InteractiveObject {
  constructor(position, size, radius = 1, callback = () => {console.log("TriggerZone callback not set")}) {
    super();

    this.id = null
    this.radius = null
    this.size = null
    this.callback = null

    this.init(position, size, radius, callback)
  }

  init(position, size, radius, callback) {
    this.id = crypto.randomUUID()
    this.radius = radius
    this.size = size
    this.position = position
    this.callback = callback

    this.object = new THREE.Object3D()
    this.object.position.set(this.position.x, this.position.y, this.position.z)
    this.scene.add(this.object)

    this.setHitbox()
    this.add()
  }

  setHitbox() {
    const geometry = new THREE.CylinderGeometry(
      this.radius,
      this.radius,
      this.size,
      32,
      32,
      false,
      0,
      2 * Math.PI
    )
    const material = new THREE.MeshBasicMaterial( {color: 0xff0000, wireframe: true, visible: this.debug.active ?? false} );
    this.hitbox = new THREE.Mesh(geometry, material)
    this.hitbox.position.set(this.position.x, this.position.y, this.position.z)
    this.scene.add(this.hitbox)
  }

  interact(origin, limit = null) {
    this.trigger()
  }

  trigger() {
    if (this.callback) {
      this.callback()
    }
    this.destroy()
  }

  destroy() {
    this.delete()
    this.scene.remove(this.hitbox)
    this.scene.remove(this.object)
    this.hitbox = null
    this.object = null
    this.id = null
    this.radius = null
    this.size = null
    this.callback = null
    super.destroy();
  }
  updateHitboxRadius(radius) {
    this.hitbox.geometry.dispose();
    this.hitbox.geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      this.size,
      32,
      32,
      false,
      0,
      2 * Math.PI
    )
  }
  updateHitboxSize(size) {
    this.hitbox.geometry.dispose();
    this.hitbox.geometry = new THREE.CylinderGeometry(
      this.radius,
      this.radius,
      size,
      32,
      32,
      false,
      0,
      2 * Math.PI
    )
  }
}