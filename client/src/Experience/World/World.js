import Environment from './Environment.js'
import Flower from './Flower.js'
import Ocean from "./Ocean.js";
import Landscape from "./Landscape.js";
import RespawnController from "./RespawnController.js";
import InteractiveObjectController from "./InteractiveObject/InteractiveObjectController.js";
import HTMLAnnouncement from "../HTMLInterface/HTMLAnnouncement.js";
import CollectZoneController from "./InteractiveObject/Controller/CollectZoneController.js";
import NpcController from "./Npc/NpcController.js";
import Experience from "../Experience.js";
import { assets } from './Environments/assets.js';
import QuestManager from "./Quest/QuestManager.js";
import TriggerZoneController from "./InteractiveObject/Controller/TriggerZoneController.js";
import {BackSide, Color, Fog, FogExp2, Mesh, MeshBasicMaterial, SphereGeometry, Vector3} from "three";
import AnnouncementZoneController from "./InteractiveObject/Controller/AnnouncementZoneController.js";
import Fireflies from "./Fireflies.js";
import LootWindow from "./Player/Hud/LootWindow.js";
import {NodeToyMaterial} from "@nodetoy/three-nodetoy";
import {color} from "three/nodes";

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
        this.animatedAsset = []

        this.scene.fog = new Fog(0xDFE9F3, 0, 65)

        this.loaded = 0

        this.ocean = new Ocean()
        this.environment = new Environment()
        this.landscape = new Landscape()
        this.fireflies = new Fireflies(new Color('#ffffff'))
        this.firefliesSecond = new Fireflies(new Color('#F9D016'))
    }

    init() {
        this.interactiveObject = new InteractiveObjectController()
        this.respawn = new RespawnController()
        this.announcementZone = new AnnouncementZoneController()
        this.collectZone = new CollectZoneController()
        this.triggerZone = new TriggerZoneController()

        this.htmlAnnouncement = new HTMLAnnouncement()
        this.quest = new QuestManager()

        //Assets
        // this.flower = new Flower()

        for (let asset of assets)
        {
            this[asset.resource] = new asset.type(asset)
            this.setAsset(asset.resource)
        }
    }

    setAsset(asset) {

        if (this[asset].hasPhysics) {
            this[asset].physicsMeshs.forEach((mesh) => {
                this.experience.physics.createTrimeshShape(mesh)
            })
        }
        // remove physics meshs
        this[asset].physicsMeshs = []
        this.scene.add(this[asset].model)

        if (this[asset].display === 0) {
            this.smallMeshsDistance.push(...this[asset].meshs)
        }
        else if (this[asset].display === 1) {
            this.mediumMeshsDistance.push(...this[asset].meshs)
        }
        else if (this[asset].display === 2) {
            this.bigMeshsDistance.push(...this[asset].meshs)
        }
        if (this[asset].castShadow) {
            this.shadowMeshs.push(...this[asset].meshs)
        }
        if(this[asset].isAnimated) {
            this.animatedAsset.push(this[asset])
        }
        this.loaded++

        if (this.loaded === assets.length) {
            //this.meshsDisplayUpdate()
            this.experience.renderer.instance.shadowMap.needsUpdate = true
        }
    }



    update()
    {
        this.ocean.update()
        this.fireflies.update()
        this.firefliesSecond.update()
        this.environment.update()

        /*if (this.experience.controls && (this.experience.controls.keys.down.forward || this.experience.controls.keys.down.backward || this.experience.controls.keys.down.strafeLeft || this.experience.controls.keys.down.strafeRight)) {
            this.meshsDisplayUpdate()
        }*/

        // update mixer animatedAsset
        for (let asset of this.animatedAsset) {
            if (asset.mixer) {
                asset.mixer.update(this.experience.time.delta / 1000)
            }
            if(asset.videoTexture)
                asset.videoTexture.needsUpdate = true
            if(asset.isShader) {
                asset.model.material.uniforms.uTime.value = this.experience.time.elapsed * 0.001
            }
        }
        NodeToyMaterial.tick();
    }

    meshsDisplayUpdate() {
        // loop through all the small meshs and check if they are close enough to be displayed
        for (let mesh of this.smallMeshsDistance) {
            mesh.visible = this.experience.camera.instance.position.distanceTo(mesh.geometry.boundingSphere.center) < 50
        }
        // loop through all the medium meshs and check if they are close enough to be displayed
        for (let mesh of this.mediumMeshsDistance) {
            mesh.visible = this.experience.camera.instance.position.distanceTo(mesh.geometry.boundingSphere.center) < 60
        }
        // loop through all the big meshs and check if they are close enough to be displayed
        for (let mesh of this.bigMeshsDistance) {
            mesh.visible = this.experience.camera.instance.position.distanceTo(mesh.geometry.boundingSphere.center) < 70;
        }
        /*loop through all the shadow meshs and check if they are close enough to be displayed
        for (let mesh of this.shadowMeshs) {
            let distance = this.experience.camera.instance.position.distanceTo(mesh.geometry.boundingSphere.center) < 50;
            if (!distance) {
                mesh.castShadow = false
                continue
            }
            let dot = this.experience.camera.instance.getWorldDirection(new Vector3()).dot(mesh.geometry.boundingSphere.center.clone().sub(this.experience.camera.instance.position).normalize())
            if (dot < 0 && this.experience.camera.instance.position.distanceTo(mesh.geometry.boundingSphere.center) > 10) {
                mesh.castShadow = false
                continue
            }
            mesh.castShadow = true
        }*/
    }

    destroy() {

        // Assets
        for (let asset of assets)
        {
            // remove Mesh from the scene
            console.log(asset)
            if(this[asset.resource].model) {
                this.scene.remove(this[asset.resource].model)
                this[asset.resource].destroy()
            }
            this[asset.resource] = null
        }

        // Special
        this.triggerZone.destroy()
        this.triggerZone = null
        this.quest.destroy()
        this.quest = null
        this.collectZone.destroy()
        this.collectZone = null
        this.respawn.destroy()
        this.respawn = null
        this.announcementZone.destroy()
        this.announcementZone = null
        this.interactiveObject.destroy()
        this.interactiveObject = null

        // this.flower.destroy()
        // this.flower = null

        this.ocean.destroy()
        this.ocean = null
        this.environment.destroy()
        this.environment = null
        this.landscape.destroy()
        this.landscape = null
        this.fireflies.destroy()
        this.fireflies = null

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