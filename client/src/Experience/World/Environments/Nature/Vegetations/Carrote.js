import Model3D from "../../../Model3D.js";
import {Mesh, MeshBasicMaterial, PlaneGeometry} from "three";

export default class Carotte extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    setModel() {
        super.setModel()

        // plane for the carotte in the minimap
        const plane = new PlaneGeometry(10, 10)
        const material = new MeshBasicMaterial({
            map: this.experience.resources.items.carotte_texture,
            transparent: true,
            depthWrite: false
        })
        const mesh = new Mesh(plane, material)
        mesh.renderOrder = -1
        mesh.position.set(this.model.children[0].children[0].geometry.boundingSphere.center.x, this.model.children[0].children[0].geometry.boundingSphere.center.y + 5, this.model.children[0].children[0].geometry.boundingSphere.center.z)
        mesh.rotation.x = - Math.PI / 2;
        mesh.layers.set(2)
        this.model.children[0].children[0].add(mesh)

    }
}