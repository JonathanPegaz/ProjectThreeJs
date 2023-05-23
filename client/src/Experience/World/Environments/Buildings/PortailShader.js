import Model3D from "../../Model3D.js";
import {
    AdditiveBlending,
    BufferAttribute,
    BufferGeometry,
    Color,
    DoubleSide, Mesh,
    MeshToonMaterial, PlaneGeometry,
    Points,
    ShaderMaterial
} from "three";
import portalVertexShader from "../../../Shaders/portal/vertex.glsl";
import portalFragmentShader from "../../../Shaders/portal/fragment.glsl";

export default class PortailShader extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    /*setModel() {
        this.debugObject = {
            portalColorStart: '#cbc8c8',
            portalColorEnd: '#6a6a71'
        }
        this.isShader = true
         // create rounded plane and a texture

        const geometry = new PlaneGeometry(3, 3, 1, 1)
        const portalShader = new ShaderMaterial({
            side: DoubleSide,
            uniforms:
                {
                    uTime: { value: 0 },
                    uColorStart: { value: new Color(this.debugObject.portalColorStart) },
                    uColorEnd: { value: new Color(this.debugObject.portalColorEnd) }
                },
            vertexShader: portalVertexShader,
            fragmentShader: portalFragmentShader,
        })
        this.portal = new Mesh(geometry, portalShader)
        this.portal.position.set(52, 14, -71)
        this.portal.scale.set(1, 1, 1)
        this.experience.scene.add(this.portal)
    }*/

    setMaterial(child) {

        console.log(child)
        child.position.set(52, 14, -71)

        this.debugObject = {
            portalColorStart: '#cbc8c8',
            portalColorEnd: '#6a6a71'
        }


        this.isShader = true
        child.material =   new ShaderMaterial({
            uniforms:
                {
                    uTime: { value: 0 },
                    uColorStart: { value: new Color('#cbc8c8') },
                    uColorEnd: { value: new Color('#6a6a71') }
                },
            vertexShader: portalVertexShader,
            fragmentShader: portalFragmentShader,
        })

        if(this.experience.debug.active)
        {
            this.debugFolder = this.experience.debug.ui.addFolder('portal')
            this.debugFolder.addColor(this.debugObject, 'portalColorStart').onChange(() =>
            {
                child.material.uniforms.uColorStart.value.set(this.debugObject.portalColorStart)
            })
            this.debugFolder.addColor(this.debugObject, 'portalColorEnd').onChange(() =>
            {
                child.material.uniforms.uColorEnd.value.set(this.debugObject.portalColorEnd)
            })
        }

        console.log(child)

    }
}