import Environment from './Environment.js'
import Flower from './Flower.js'
import Ocean from "./Ocean.js";
import Landscape from "./Landscape.js";
import RespawnController from "./RespawnController.js";
import InteractiveObjectController from "./InteractiveObject/InteractiveObjectController.js";
import HTMLAnnouncement from "../HTMLInterface/HTMLAnnouncement.js";
import CollectZoneController from "./CollectZoneController.js";
import NpcController from "./Npc/NpcController.js";
import Experience from "../Experience.js";
import { assets } from './Environments/assets.js';
import QuestManager from "./Quest/QuestManager.js";
import TriggerZoneController from "./TriggerZoneController.js";
import {Fog} from "three";

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.smallMeshsDistance = []
        this.mediumMeshsDistance = []
        this.bigMeshsDistance = []
        this.shadowMeshs = []

        this.scene.fog = new Fog(0xDFE9F3, 0, 100)

        for (let asset of assets)
        {
            this[asset.resource] = new asset.type(this.resources.items[asset.resource])
            if (asset.hasPhysics) {
                this[asset.resource].physicsMeshs.forEach((mesh) => {
                    this.experience.physics.createTrimeshShape(mesh)
                })
            }
            // remove physics meshs
            this[asset.resource].physicsMeshs = []
            this.scene.add(this[asset.resource].model)

            if (asset.display === 0) {
                this.smallMeshsDistance.push(...this[asset.resource].meshs)
            }
            else if (asset.display === 1) {
                this.mediumMeshsDistance.push(...this[asset.resource].meshs)
            }
            else if (asset.display === 2) {
                this.bigMeshsDistance.push(...this[asset.resource].meshs)
            }
            if (asset.castShadow) {
                this.shadowMeshs.push(...this[asset.resource].meshs)
            }
        }

        // Special

        this.interactiveObject = new InteractiveObjectController()
        this.npc = new NpcController()

        this.respawn = new RespawnController()
        this.collectZone = new CollectZoneController()
        this.triggerZone = new TriggerZoneController()

        this.htmlAnnouncement = new HTMLAnnouncement()
        this.quest = new QuestManager()

        //Assets
        this.flower = new Flower()
        this.ocean = new Ocean()
        this.environment = new Environment()
        this.landscape = new Landscape()
    }

    update()
    {
        this.ocean.update()
        this.npc.update()
        // loop through all the small meshs and check if they are close enough to be displayed
        for (let mesh of this.smallMeshsDistance) {
            mesh.visible = this.experience.camera.instance.position.distanceTo(mesh.geometry.boundingSphere.center) < 40;
        }
        // loop through all the medium meshs and check if they are close enough to be displayed
        for (let mesh of this.mediumMeshsDistance) {
            mesh.visible = this.experience.camera.instance.position.distanceTo(mesh.geometry.boundingSphere.center) < 60;
        }
        // loop through all the big meshs and check if they are close enough to be displayed
        for (let mesh of this.bigMeshsDistance) {
            mesh.visible = this.experience.camera.instance.position.distanceTo(mesh.geometry.boundingSphere.center) < 100;
        }
        // loop through all the shadow meshs and check if they are close enough to be displayed
        for (let mesh of this.shadowMeshs) {
            mesh.castShadow = this.experience.camera.instance.position.distanceTo(mesh.geometry.boundingSphere.center) < 50;
        }
    }

    destroy() {

        // Assets
        for (let asset of assets)
        {
            // remove Mesh from the scene
            this.scene.remove(this[asset.resource].model)
            this[asset.resource].destroy()
            this[asset.resource] = null
        }

        // Special
        this.triggerZone.destroy()
        this.triggerZone = null
        this.quest.destroy()
        this.quest = null
        this.htmlAnnouncement.destroy()
        this.htmlAnnouncement = null
        this.collectZone.destroy()
        this.collectZone = null
        this.respawn.destroy()
        this.respawn = null
        this.interactiveObject.destroy()
        this.interactiveObject = null
        this.npc.destroy()
        this.npc = null

        this.flower.destroy()
        this.flower = null

        this.ocean.destroy()
        this.ocean = null
        this.environment.destroy()
        this.environment = null
        this.landscape.destroy()
        this.landscape = null

        this.experience = null
        this.scene.fog = null
        this.scene = null
        this.resources = null

        this.smallMeshsDistance = null
        this.mediumMeshsDistance = null
        this.bigMeshsDistance = null
        this.shadowMeshs = null
    }
}