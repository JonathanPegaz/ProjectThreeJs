import * as THREE from 'three'
import AnnouncementZone from "../Object/AnnouncementZone.js";
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
      new AnnouncementZone(new THREE.Vector3(-44.5, 20, -15), "village-chantepins-min", 24.5, true),
      new AnnouncementZone(new THREE.Vector3(-85.5, 17, 25.5), "ruine-solidarite-min", 6.5, true),
      new AnnouncementZone(new THREE.Vector3(80.5, 17, -12), "ruine-reconaissance-min", 10, true),
      new AnnouncementZone(new THREE.Vector3(20, 17, -39), "ruine-responsabilite-min", 6, true),
      new AnnouncementZone(new THREE.Vector3(27, 14, -39), "foret-de-jade-min", 16.5, true),
      new AnnouncementZone(new THREE.Vector3(55.5, 20, 47), "eglise-singuliere-min", 23, true),
      new AnnouncementZone(new THREE.Vector3(-20, 16.5, 42), "mine-de-mithralite-min", 19.5, true),
      new AnnouncementZone(new THREE.Vector3(11, 14, -10), "arbre-de-mithralite-min", 8.5, true),
      new AnnouncementZone(new THREE.Vector3(50.5, 15.5, -77), "bord-du-monde-min", 21.5, true),
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
