import Model3D from "../../Model3D.js";
import {BoxGeometry, DoubleSide, FrontSide, Mesh, MeshBasicMaterial, MeshToonMaterial} from "three";

export default class Vent1 extends Model3D
{
    constructor(model)
    {
        super(model)
    }

    setMaterial(child) {
        child.material = new MeshToonMaterial({
            ...child.material,
            side: DoubleSide,
            type: 'MeshToonMaterial',
            wireframe: true,
        })

        const boxgeometry = new BoxGeometry( 1, 1, 1 );
        const boxmaterial = new MeshBasicMaterial( {color: 0x00ff00} );
        const cube = new Mesh( boxgeometry, boxmaterial );
        this.model.add( cube );

    }
}