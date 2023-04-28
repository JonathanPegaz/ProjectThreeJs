import * as THREE from 'three'
import Experience from '../Experience.js'
import * as CANNON from "cannon-es";

export default class Map
{
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug
    this.mapBody = null;
    this.mapMesh = null;

    this.texture = this.resources.items.heightmap1


    this.init()
  }

  init() {
    const geometry = new THREE.PlaneGeometry(1000, 1000, 200, 200)
    this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping
    this.texture.repeat.set(1, 1)

    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      wireframe: true,
      displacementMap: this.texture,
      displacementScale: 20,
    })

    this.mapMesh = new THREE.Mesh(geometry, material)
    this.scene.add(this.mapMesh)
    this.mapMesh.rotation.x = -Math.PI / 2
    this.mapMesh.position.y = 0
  }
}