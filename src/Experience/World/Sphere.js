import * as THREE from 'three'
import * as CANNON from "cannon-es";
import Experience from "../Experience.js";

export default class Sphere
{
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug

    this.sphere = null;
    this.sphereBody = null;
    this.sphereShape = null;
    this.init()
  }

  init() {
    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
      })
    )
    this.scene.add(this.sphere)
    //this.sphere.position.y = 0
    this.sphereShape = new CANNON.Sphere(1)
    this.sphereBody = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(0, 30, 0),
      shape: this.sphereShape,
    })
    this.experience.world.physics.world.addBody(this.sphereBody)
  }

  update() {
    this.sphere.position.copy(this.sphereBody.position)
  }

  destroy() {

  }
}