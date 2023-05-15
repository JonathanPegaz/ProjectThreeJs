import * as THREE from 'three'
import Experience from "../Experience.js";
import CollectZone from "./InteractiveObject/CollectZone.js";


export default class CollectZoneController {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.debug = this.experience.debug
    this.resources = this.experience.resources

    this.collectZone = []

    this.init()
  }

  init() {
    this.collectZone = [
      new CollectZone(new THREE.Vector3(-5, 10.5, 42), "Mine", 19, 4.5, 4000, "diamond"),
      new CollectZone(new THREE.Vector3(-41, 9.5, 14), "Ferme", 19, 3, 2000, "vegetable"),
    ];

    this.collectZone.forEach((element) => {
      element.on(element.name, (event) => {
        if (event === "ENTER" || event === "LEAVE") {
          element.collect()
        }
      })
    })

    if (this.debug.active) {
      this.setGui()
    }
  }

  setGui() {
    this.debugFolder = this.debug.ui.addFolder('CollectZone')
    this.debugFolder.close()

    this.collectZone.forEach((element) => {
      this.debugFolderCollectZone = this.debugFolder.addFolder(element.name)
      this.debugFolderCollectZone
        .add(element.position, 'x')
        .name('Position x')
        .min(-100)
        .max(100)
        .step(1)
        .onChange(() => {
          element.updatePosition(element.position);
        })
      this.debugFolderCollectZone
        .add(element.position, 'y')
        .name('Position y')
        .min(-10)
        .max(100)
        .step(0.5)
        .onChange(() => {
          element.updatePosition(element.position);
        })
      this.debugFolderCollectZone
        .add(element.position, 'z')
        .name('Position z')
        .min(-100)
        .max(100)
        .step(1)
        .onChange(() => {
          element.updatePosition(element.position);
        })
      this.debugFolderCollectZone
        .add(element, 'size')
        .name('Hitbox size')
        .min(0)
        .max(100)
        .step(0.5)
        .onChange(() => {
          element.updateHitboxSize(element.size);
        })
      this.debugFolderCollectZone
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

  destroy() {
    this.collectZone.forEach((element) => {
      element.off(element.name)
      element.destroy()
    })
  }
}