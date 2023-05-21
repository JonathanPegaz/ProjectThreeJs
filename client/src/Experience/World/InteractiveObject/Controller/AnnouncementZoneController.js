import * as THREE from 'three'
import AnnouncementZone from "../AnnouncementZone.js";
import Experience from "../../../Experience.js";

export default class AnnouncementZoneController {

  constructor() {
    this.experience = new Experience()
    this.debug = this.experience.debug

    this.announcementZones = []

    this.init()
  }

  init() {
    this.announcementZones = [
      new AnnouncementZone(new THREE.Vector3(-44.5, 20, -15), "Village Chantepins", 24.5),
      new AnnouncementZone(new THREE.Vector3(-85.5, 17, 25.5), "Ruine Remnoru", 6.5),
      new AnnouncementZone(new THREE.Vector3(80.5, 17, -12), "Ruine Remnora", 10),
      new AnnouncementZone(new THREE.Vector3(20, 17, -39), "Ruine Remnoro", 6),
      new AnnouncementZone(new THREE.Vector3(27, 14, -39), "Forêt de jade", 16.5),
      new AnnouncementZone(new THREE.Vector3(55.5, 20, 47), "Église singulière", 23),
      new AnnouncementZone(new THREE.Vector3(-20, 16.5, 42), "Mine de Mithralite", 19.5),
      new AnnouncementZone(new THREE.Vector3(11, 14, -10), "Arbre sacré", 8.5),
      new AnnouncementZone(new THREE.Vector3(44.5, 15.5, -81), "Bord du monde", 21),
    ];

    if (this.debug.active) {
      this.setGui()
    }
  }

  setGui() {
    this.debugFolder = this.debug.ui.addFolder('AnnouncementZone')
    this.debugFolder.close()

    this.announcementZones.forEach((element) => {
      this.debugFolderAnnouncementZone = this.debugFolder.addFolder(element.name)
      this.debugFolderAnnouncementZone
        .add(element.position, 'x')
        .name('Position x')
        .min(-1000)
        .max(1000)
        .step(0.5)
        .onChange(() => {
          element.updatePosition(element.position);
        })
      this.debugFolderAnnouncementZone
        .add(element.position, 'y')
        .name('Position y')
        .min(-1000)
        .max(1000)
        .step(0.5)
        .onChange(() => {
          element.updatePosition(element.position);
        })
      this.debugFolderAnnouncementZone
        .add(element.position, 'z')
        .name('Position z')
        .min(-100)
        .max(100)
        .step(0.5)
        .onChange(() => {
          element.updatePosition(element.position);
        })
      this.debugFolderAnnouncementZone
        .add(element, 'radius')
        .name('Hitbox radius')
        .min(0)
        .max(1000)
        .step(0.5)
        .onChange(() => {
          element.updateHitboxRadius(element.radius);
        })
    })
  }

  destroy() {
    this.announcementZones.forEach((element) => {
      element.destroy()
    })
  }
}
