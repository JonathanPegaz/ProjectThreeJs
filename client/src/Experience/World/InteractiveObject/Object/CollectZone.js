import * as THREE from 'three'
import InteractiveObject from "../InteractiveObject.js";
import QuestMarker from "../../../Interface/QuestMarker.js";

export default class CollectZone extends InteractiveObject {
  constructor(position, name, size, radius = 1, collectTime = 1000, itemToCollect = null) {
    super();

    this.radius = null
    this.size = null
    this.itemToCollect = null
    this.collectTime = null
    this.isCollecting = false
    this.type = "collectable"

    this.init(position, name, size, radius, collectTime, itemToCollect)
  }

  init(position, name, size, radius, collectTime, itemToCollect) {
    this.name = name
    this.radius = radius
    this.size = size
    this.position = position
    this.object = new THREE.Object3D()
    this.object.position.set(this.position.x, this.position.y, this.position.z)
    this.scene.add(this.object)

    this.itemToCollect = itemToCollect
    this.collectTime = collectTime
    this.setHitbox()
    this.add()

    this.marker = new QuestMarker(this, -3)
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
    const material = new THREE.MeshBasicMaterial( {color: 0x0000ff, wireframe: true, visible: this.debug.active ?? false} );
    this.hitbox = new THREE.Mesh(geometry, material)
    this.hitbox.position.set(this.position.x, this.position.y, this.position.z)
    this.scene.add(this.hitbox)
  }

  interact(origin) {
    return super.interact(origin, this.radius+1);
  }

  collect() {
    this.isCollecting = !this.isCollecting;
    if (!this.isCollecting) {
      return Promise.resolve();
    }

    return new Promise(() => {
      const check = () => {
        if (this.isCollecting) {
          this.trigger(`collect`, [this.itemToCollect]);
          setTimeout(check, this.collectTime);
        }
      };
      setTimeout(check, this.collectTime);
    });
  }

  destroy() {
    this.radius = null
    this.size = null
    this.collectTime = null
    this.isCollecting = null
    this.itemToCollect = null
    this.marker = null
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