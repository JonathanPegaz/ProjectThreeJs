import * as THREE from 'three'
import Experience from "../../Experience.js";
import * as CANNON from "cannon-es";

export default class PhysicPlane {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug

    this.floor = null
    this.floorBody = null

    this.init()
  }

  init() {
    this.floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshBasicMaterial({
        color: '#FF0000',
      }))
    this.floor.rotation.x = - Math.PI * 0.5
    this.scene.add(this.floor)

    const floorShape = new CANNON.Plane()
    this.floorBody = new CANNON.Body({
      mass: 0,
      shape: floorShape,
    })
    this.floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(- 1, 0, 0), Math.PI * 0.5)
    this.experience.world.physics.world.addBody(this.floorBody)
  }

  update() {
    this.floor.position.copy(this.floorBody.position)
  }

  destroy() {

  }
}