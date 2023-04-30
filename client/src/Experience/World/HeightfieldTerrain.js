import * as THREE from 'three'
import Experience from '../Experience.js'
import * as CANNON from 'cannon-es'
import CannonUtils from "../Utils/CannonUtils.js";
import {img2matrix} from "../Utils/Utils.js";

export default class HeightfieldTerrain {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.physics = this.experience.physics

        this.resource = this.resources.items.heightMap

        this.setModel()
    }

    setModel() {
        const sizeX = 128, sizeY = 128, minHeight = 0, maxHeight = 60, check = null
        const matrix = img2matrix.fromImage(this.resource, sizeX, sizeY, minHeight, maxHeight)
        const terrainShape = new CANNON.Heightfield(matrix, { elementSize: 10 });
        const terrainBody = new CANNON.Body({ mass: 0 });
        terrainBody.addShape(terrainShape);
        terrainBody.position.set(-sizeX * terrainShape.elementSize / 2, -10, sizeY * terrainShape.elementSize / 2);
        terrainBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        this.physics.world.addBody(terrainBody);
        this.physics.utils.addVisual(terrainBody, 'landscape');

    }
}