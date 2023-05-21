import Model3D from "../../../../Model3D.js";
import {LoopRepeat, MeshToonMaterial} from "three";
import {gsap} from "gsap";

export default class TreeAnimated extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    setMaterial(child) {
        child.material = new MeshToonMaterial({
            ...child.material,
            type: 'MeshToonMaterial',
            alphaTest: 0.5,
            depthWrite: true,
            transparent: false
        })
        if(!child.name.endsWith('_1')) {
            child.material.displacementMap = this.experience.resources.items.displacement
            child.material.displacementScale = 1
            gsap.to(child.material.displacementMap.offset, {y: -0.5, duration: Math.random() + 1, yoyo: true, repeat: -1})
            gsap.to(child.material.displacementMap.offset, {x: -0.5, duration: Math.random() + 1, yoyo: true, repeat: -1})

           /* gsap.to(child.scale, {x: 1.0 + Math.random() / 1000, duration: Math.random() + 0.5, yoyo: true, repeat: -1})
            gsap.to(child.scale, {y: 1.0 + Math.random() / 1000, duration: Math.random() + 0.5, yoyo: true, repeat: -1})
            gsap.to(child.scale, {z: 1.0 + Math.random() / 1000, duration: Math.random() + 0.5, yoyo: true, repeat: -1})*/
        }
    }

    setPhysicsMeshs(child) {
        if(child.name.endsWith('_1')) {
            this.physicsMeshs.push(child)
        }
    }
}