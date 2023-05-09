import { PlaneBufferGeometry, RepeatWrapping, Mesh } from 'three';
import Experience from '../Experience.js';
import {oceanMaterial} from "../Shaders/OceanShader.js";

export default class Ocean {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.debug = this.experience.debug

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Ocean')

        }

        this.setGeometry();
        this.setTextures();
        this.setMaterial();
        this.setMesh();
    }

    setGeometry() {
        this.geometry = new PlaneBufferGeometry(5000, 5000, 20, 20)
        this.geometry.rotateX(-Math.PI / 2)
    }

    setTextures() {
        this.waterTexture = this.resources.items.water
        this.waterTexture.wrapS = RepeatWrapping
        this.waterTexture.wrapT = RepeatWrapping
    }

    setMaterial() {
        this.oceanMaterial = oceanMaterial
        this.oceanMaterial.uniforms.uMap.value = this.waterTexture
        //this.oceanMaterial.uniforms.uSize.value = 50
        this.oceanMaterial.uniforms.uCamNear.value = this.camera.instance.near
        this.oceanMaterial.uniforms.uCamFar.value = 10
    }

    setMesh() {
        this.mesh = new Mesh(this.geometry, this.oceanMaterial)
        this.mesh.position.set(0, -15, 0)
        this.scene.add(this.mesh)
    }

    update() {
        if (this.oceanMaterial)
            this.oceanMaterial.uniforms.uTime.value = this.experience.time.elapsed * 0.001
    }

    destroy() {
        this.scene.remove(this.mesh)
        this.geometry.dispose()
        this.oceanMaterial.dispose()
        this.waterTexture.dispose()
    }
}

