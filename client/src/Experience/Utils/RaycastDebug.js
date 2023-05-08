import * as THREE from 'three'
import Experience from "../Experience.js";

export default class RaycastDebug {
  constructor(distance, color) {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.debug = this.experience.debug

    this.distance = null
    this.color = null
    this.isActive = true

    this.init(distance, color)
  }

  init(distance = 3, color = 0xff0000) {
    this.distance = distance
    this.color = color

    if (this.debug.active) {
      this.setGui()
    }
  }

  setGui() {
    this.debugFolder = this.debug.ui.addFolder('RaycastDebug')
    this.debugFolder.add(this, 'isActive').name('Active')
    this.debugFolder.close()
  }

  execute(origin, direction, distance = null) {

    if (!this.isActive) return

    direction.normalize()
    const targetPosition = new THREE.Vector3()
      .copy(origin)
      .add(direction.multiplyScalar(distance ?? this.distance))

    const positions = new Float32Array([
      origin.x, origin.y, origin.z,
      targetPosition.x, targetPosition.y, targetPosition.z,
    ])

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.LineBasicMaterial({
      color: this.color,
      linewidth: 10,
    })

    const line = new THREE.Line(geometry, material)
    this.scene.add(line)

    setTimeout(() => {
      this.scene.remove(line)
    }, 500)
  }

  destroy() {
    this.distance = null
    this.color = null
    this.isActive = null
  }
}