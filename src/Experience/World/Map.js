import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Map
{
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug

    this.texture = this.resources.items.heightmap

    this.create()
  }

  create() {
    const groundGeometry = new THREE.PlaneGeometry(100, 100, 200, 200)
    this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping
    this.texture.repeat.set(1, 1)

    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      wireframe: true,
      displacementMap: this.texture,
      displacementScale: 20,
    })

    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
    this.scene.add(groundMesh)
    groundMesh.rotation.x = -Math.PI / 2
    groundMesh.position.y = -0.5
  }
}