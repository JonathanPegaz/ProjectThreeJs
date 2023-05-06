import * as THREE from 'three'
import Experience from "../Experience.js";
import SpawnPoint from "./InteractableObject/SpawnPoint.js";

export default class RespawnController {

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.debug = this.experience.debug
    this.resources = this.experience.resources

    this.repawnPoints = []

    this.init()
  }

  init() {
    this.repawnPoints = [
      new SpawnPoint(new THREE.Vector3(0, 0, 0), "stage1"),
      new SpawnPoint(new THREE.Vector3(-80, .5, 22), "stage2")
    ];

    if (this.debug.active) {
      this.setGui()
    }
  }

  setGui() {
    this.debugFolder = this.debug.ui.addFolder('SpawnPoint')
    this.debugFolder.close()

    this.repawnPoints.forEach((element) => {
      this.debugFolderTest = this.debugFolder.addFolder(element.name)
      this.debugFolderTest
        .add(element.position, 'x')
        .name('Position x')
        .min(-100)
        .max(100)
        .step(1)
        .onChange(() => {
          element.updatePosition(element.position);
        })
      this.debugFolderTest
        .add(element.position, 'y')
        .name('Position y')
        .min(-10)
        .max(10)
        .step(0.001)
        .onChange(() => {
          element.updatePosition(element.position);
        })
      this.debugFolderTest
        .add(element.position, 'z')
        .name('Position z')
        .min(-100)
        .max(100)
        .step(1)
        .onChange(() => {
          element.updatePosition(element.position);
        })
      this.debugFolderTest
        .add(element, 'radius')
        .name('Hitbox radius')
        .min(0)
        .max(100)
        .step(0.5)
        .onChange(() => {
          element.updateHitboxRadius(element.radius);
        })
    })
  }

  execute(player) {
    // TODO: check if a spawn point is active

    let closestSpawnPoint = null;
    this.repawnPoints.forEach((element) => {
      if (
        closestSpawnPoint == null ||
        player.object.position.distanceTo(element.position) <
        player.object.position.distanceTo(closestSpawnPoint.position)
      ) {
        closestSpawnPoint = element;
      }
    });

    player.object.position.copy(closestSpawnPoint.position);
  }

  destroy() {
    this.repawnPoints.forEach((element) => {
      element.destroy()
    })
  }
}
