import * as THREE from 'three'
import Experience from "../Experience.js";
import SpawnPoint from "./SpawnPoint.js";

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
      new SpawnPoint(new THREE.Vector3(-95, 18, -20), "initial-spawn"),
      new SpawnPoint(new THREE.Vector3(-68.5, 18, -11), "village-entrance"),
      new SpawnPoint(new THREE.Vector3(-5, 15.5, 6.5), "tree-bridge-1"),
      new SpawnPoint(new THREE.Vector3(33, 15.5, -19), "tree-bridge-2"),
      new SpawnPoint(new THREE.Vector3(37, 16, -41), "forest-entrance"),
      new SpawnPoint(new THREE.Vector3(-87, 19.5, 16), "runestone-1"),
      new SpawnPoint(new THREE.Vector3(73, 16, -12), "runestone-2"),
      new SpawnPoint(new THREE.Vector3(7, 17.5, 26), "church-entrance"),
      new SpawnPoint(new THREE.Vector3(53, 15, -5), "church-exit"),
      new SpawnPoint(new THREE.Vector3(-39, 18.5, 34), "mines-entrance"),
    ];

    if (this.debug.active) {
      this.setGui()
    }
  }

  setGui() {
    this.debugFolder = this.debug.ui.addFolder('SpawnPoint')
    this.debugFolder.close()

    this.repawnPoints.forEach((element) => {
      this.debugFolderSpawnPoint = this.debugFolder.addFolder(element.name)
      this.debugFolderSpawnPoint
        .add(element.position, 'x')
        .name('Position x')
        .min(-1000)
        .max(1000)
        .step(0.5)
        .onChange(() => {
          element.updatePosition(element.position);
        })
      this.debugFolderSpawnPoint
        .add(element.position, 'y')
        .name('Position y')
        .min(-1000)
        .max(1000)
        .step(0.5)
        .onChange(() => {
          element.updatePosition(element.position);
        })
      this.debugFolderSpawnPoint
        .add(element.position, 'z')
        .name('Position z')
        .min(-100)
        .max(100)
        .step(0.5)
        .onChange(() => {
          element.updatePosition(element.position);
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
