import * as THREE from 'three'
import Experience from '../../Experience.js'
import * as CANNON from 'cannon-es'
import { Octree } from 'three/addons/math/Octree.js';
import { OctreeHelper } from 'three/addons/helpers/OctreeHelper.js';

export default class Mapv1 {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    //this.debug = this.experience.debug

    this.world = this.experience.world.physics.world
    this.worldOctree = null

    this.resource = this.resources.items.mapisland
    this.setModel()
  }

  setModel() {
    this.model = this.resource.scene.clone()
    this.model.position.set(0, -10, 0)
    this.scene.add(this.model)
    this.worldOctree = new Octree()

    let bufferGeometry = null // Declare a variable to hold the buffer geometry

    this.worldOctree.fromGraphNode( this.model);

    this.model.traverse((child) => {

      //TODO: Physics with octree

      // if ( child.isMesh ) {
      //
      //   child.castShadow = true;
      //   child.receiveShadow = true;
      //
      //   if ( child.material.map ) {
      //
      //     child.material.map.anisotropy = 4;
      //
      //   }
      //
      // }

      //TODO: Physics with octree
      if (child instanceof THREE.Mesh) {
        bufferGeometry = child.geometry
        // child.castShadow = true
        child.material.wireframe = true
        console.log(child)
      }
    })

    //TODO: Physics with octree

    // const helper = new OctreeHelper( this.worldOctree );
    // helper.visible = false;
    // this.scene.add( helper );
    //
    // const gui = new GUI( { width: 200 } );
    // gui.add( { debug: false }, 'debug' )
    //   .onChange( function ( value ) {
    //
    //     helper.visible = value;
    //
    //   } );

    //TODO: Physics with octree


    const positionAttribute = bufferGeometry.getAttribute('position')
    const sizeX = 64/* number of rows in the matrix */
    const sizeZ = 64/* number of columns in the matrix */
    const matrix = []

    for (let i = 0; i < sizeX; i++) {
      matrix.push([])
      for (let j = 0; j < sizeZ; j++) {

        const vertexIndex = (i * sizeZ) + j

        const height = positionAttribute.getY(vertexIndex)
        matrix[i].push(height)
      }
    }

    const heightfieldShape = new CANNON.Heightfield(matrix, {
      elementSize: 1,
    })
    const heightfieldBody = new CANNON.Body({ mass: 0 })
    heightfieldBody.addShape(heightfieldShape)
    heightfieldBody.position.set(
      -(sizeX * heightfieldShape.elementSize) / 2,
      -1,
      (sizeZ * heightfieldShape.elementSize) / 2
    )
    heightfieldBody.quaternion.copy(this.model.quaternion)
    heightfieldBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
    heightfieldBody.position.copy(this.model.position)
    this.world.addBody(heightfieldBody)
  }
}
