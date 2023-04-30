import * as THREE from 'three'
import Experience from "./Experience.js";
import {Octree} from 'three/addons/math/Octree.js';
import {OctreeHelper} from "three/addons/helpers/OctreeHelper.js";


export default class OctreePhysics {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.setOctreePhysics()

        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('OctreePhysics')
            this.setupDebug()
        }
    }

    setOctreePhysics() {
        this.gravity = 30
        this.worldOctree = new Octree();
        this.worldOctree.fromGraphNode( this.scene );
    }

    setupDebug() {
        const helper = new OctreeHelper( this.worldOctree );
        helper.visible = false;
        this.scene.add( helper );

        this.debugFolder.add(helper, 'visible').name('OctreeHelper')
    }

    update() {

    }
}