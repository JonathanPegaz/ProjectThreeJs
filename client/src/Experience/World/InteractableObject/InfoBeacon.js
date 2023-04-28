import * as THREE from 'three'
import Experience from '../../Experience.js'

export default class InfoBeacon {

  constructor()
  {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time

    this.setModel()
  }

  setModel()
  {
    //make a blue square
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(0, 1, 5)

    this.hitbox = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true }));
    this.hitbox.position.copy(cube.position);

    this.scene.add(cube);
    this.scene.add(this.hitbox);
  }

  update()
  {
    //TODO: check if player is in hitbox
  }
}