import * as THREE from 'three'
import Experience from "../../../Experience.js";
import TriggerZone from "../Object/TriggerZone.js";


export default class TriggerZoneController {
  constructor() {
    this.experience = new Experience()
    this.debug = this.experience.debug

    this.list = []

    this.init()
  }

  init() {
    this.list = [
      // new TriggerZone(new THREE.Vector3(-91, 12, -7), 19, 4.5, () => {
      //   this.experience.world.quest.add(1)
      // }),
    ];

    this.list.forEach((element) => {
      element.on(element.id, (event) => {
        if (event === "INTERACT") {
          element.trigger()
        }
      })
    })

    if (this.debug.active) {
      this.setGui()
    }
  }

  setGui() {
    this.debugFolder = this.debug.ui.addFolder('TiggerZone')
    this.debugFolder.close()

    this.list.forEach((element) => {
      this.debugFolderTiggerZone = this.debugFolder.addFolder(element.name)
      this.debugFolderTiggerZone
        .add(element.position, 'x')
        .name('Position x')
        .min(-1000)
        .max(1000)
        .step(0.5)
        .onChange(() => {
          element.updatePosition(element.position);
        })
      this.debugFolderTiggerZone
        .add(element.position, 'y')
        .name('Position y')
        .min(-1000)
        .max(1000)
        .step(0.5)
        .onChange(() => {
          element.updatePosition(element.position);
        })
      this.debugFolderTiggerZone
        .add(element.position, 'z')
        .name('Position z')
        .min(-100)
        .max(100)
        .step(0.5)
        .onChange(() => {
          element.updatePosition(element.position);
        })
      this.debugFolderTiggerZone
        .add(element, 'size')
        .name('Hitbox size')
        .min(0)
        .max(100)
        .step(0.5)
        .onChange(() => {
          element.updateHitboxSize(element.size);
        })
      this.debugFolderTiggerZone
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
    this.list.forEach((element) => {
      element.off(element.id)
      element.destroy()
    })
  }
}