import Model3D from "../../Model3D.js";
import {MeshBasicMaterial, MeshStandardMaterial} from "three";
import GifLoader from "three-gif-loader";


export default class Firework extends Model3D {
    constructor(model) {
        super(model)
    }

    setMaterial(child) {

        const texture = new GifLoader().load('./video/FEUX-min.gif')

        child.material = new MeshStandardMaterial({
            map: texture,
            transparent: true,
            emissiveColor: 0xffffff,
            emissiveIntensity: 10,
            emissiveMap: texture,
        })
    }
}