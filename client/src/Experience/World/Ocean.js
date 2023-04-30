import * as THREE from 'three';
import Experience from '../Experience.js';
import {oceanMaterial} from "../Shaders/OceanShader.js";

export default class Ocean {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;

        this.setGeometry();
        this.setTextures();
        this.setMaterial();
        this.setMesh();
    }

    setGeometry() {
        this.geometry = new THREE.PlaneBufferGeometry(50, 50, 20, 20)
        this.geometry.rotateX(-Math.PI / 2)
    }

    setTextures() {
        this.waterTexture = this.resources.items.water
        this.waterTexture.repeat.set(5, 5)
        this.waterTexture.wrapS = THREE.RepeatWrapping
        this.waterTexture.wrapT = THREE.RepeatWrapping
    }

    setMaterial() {
        this.oceanMaterial = oceanMaterial
        this.oceanMaterial.uniforms.uMap.value = this.waterTexture
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.oceanMaterial)
        this.scene.add(this.mesh)
    }

    update() {
        if (this.oceanMaterial)
            this.oceanMaterial.uniforms.uTime.value = this.experience.time.elapsed * 0.001
    }
}
