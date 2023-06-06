import * as THREE from 'three'
import InteractiveObject from "../InteractiveObject.js";
import QuestMarker from "../../../Interface/QuestMarker.js";
import InteractMarker from "../../../Interface/InteractMarker.js";

export default class CollectZone extends InteractiveObject {
  constructor(position, name, size, radius = 1, collectTime = 30, itemToCollect = null, nbItemToCollect = 1) {
    super();

    this.name = name
    this.radius = radius
    this.size = size
    this.position = position
    this.object = new THREE.Object3D()
    this.object.position.set(this.position.x, this.position.y, this.position.z)
    this.scene.add(this.object)

    this.canCollect = false
    this.itemToCollect = itemToCollect
    this.nbItemToCollect = nbItemToCollect
    this.collectTime = collectTime
    this.type = "collectable"

    this.marker = new QuestMarker(this, 0)
    this.interactMarker = new InteractMarker(this, 0)

    this.setHitbox()
    this.collect()
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
    const material = new THREE.MeshBasicMaterial( {color: 0x0000ff, wireframe: true, visible: this.debug.active ?? false} );
    this.hitbox = new THREE.Mesh(geometry, material)
    this.hitbox.position.set(this.position.x, this.position.y, this.position.z)
    this.scene.add(this.hitbox)
  }

  interact(origin) {
    return super.interact(origin, null, this.radius+1);
  }

  collect() {
    let pressState = 0
    this.experience.controls.on('actionDown',  () => {
      if (!this.canCollect) return
      this.interactMarker.press(pressState, this.collectTime)
      pressState++
      if (pressState > this.collectTime) {
        this.trigger('collect', [[this.itemToCollect, this.nbItemToCollect]]);
        this.interactMarker.stopPress()
        pressState = 0
      }
    })
    this.experience.controls.on('actionUp',  () => {
      if (!this.canCollect) return
      this.interactMarker.stopPress()
      pressState = 0
    })
  }

  startCollect() {
    this.interactMarker.mark()
    this.canCollect = true
  }

  stopCollect() {
    this.interactMarker.unmark()
    this.canCollect = false
  }

  destroy() {
    this.canCollect = null
    this.radius = null
    this.size = null
    this.collectTime = null
    this.itemToCollect = null
    this.nbItemToCollect = null
    this.marker.destroy()
    this.marker = null
    this.interactMarker.destroy()
    this.interactMarker = null
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