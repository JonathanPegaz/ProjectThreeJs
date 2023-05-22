import Barriere from "./Buildings/Barriere.js";
import Batiments from "./Buildings/Batiments.js";
import Dalles from "./Nature/Crystal.js";
import Panneaux from "./Buildings/Panneaux.js";
import Ponts from "./Buildings/Ponts.js";
import Props from "./Buildings/Props.js";
import ArbreSacre from "./Nature/Vegetations/Trees/ArbreSacre.js";
import ArbreRose from "./Nature/Vegetations/Trees/ArbreRose.js";
import Pine from "./Nature/Vegetations/Trees/Pine.js";
import Arbres from "./Nature/Vegetations/Trees/Arbres.js";
import Buisson from "./Nature/Buisson.js";
import Crystal from "./Nature/Crystal.js";
import DebrisCarriere from "./Nature/DebrisCarriere.js";
import Ilot from "./Nature/Ilot.js";
import Lac from "./Nature/Lac.js";
import RocherLivre from "./Nature/RocherLivre.js";
import Rochers from "./Nature/Rochers.js";
import Ruine1 from "./Nature/Ruine1.js";
import Ruine2 from "./Nature/Ruine2.js";
import Ruine3 from "./Nature/Ruine3.js";
import Stele1 from "./Nature/Stele1.js";
import Stele2 from "./Nature/Stele2.js";
import Stele3 from "./Nature/Stele3.js";
import Ferme from "./Buildings/Ferme.js";
import TreeAnimated from "./Nature/Vegetations/Trees/TreeAnimated.js";
import Champi from "./Nature/Vegetations/Champi.js";
import Ecume1 from "./Nature/Ecume1.js";
import Cascade from "./Nature/Cascade.js";
import Ecume2 from "./Nature/Ecume2.js";
import Flag from "./Buildings/Flag.js";
import Pancarte from "./Buildings/Pancarte.js";
import Place from "./Buildings/Place.js";
import PortailPlace from "./Buildings/PortailPlace.js";
import PortailShader from "./Buildings/PortailShader.js";
import Miasme from "./Nature/Miasme.js";
import Modele from "./Nature/Modele.js";

export const assets = [
    // display : 0 = small, 1 = medium, 2 = big
    //          Environment
    // buildings
    {
        type: Barriere,
        resource: 'Barrieres',
        hasPhysics: true,
        display: 0,
        castShadow: true,
        source: 'models/Barrieres.glb',
        isAnimated: false
    },
    {
        type: Batiments,
        resource: 'Batiments',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        source: 'models/Batiments.glb',
        isAnimated: false
    },
    {
        type: Dalles,
        resource: 'Dalles',
        hasPhysics: false,
        display: 0,
        castShadow: false,
        source: 'models/Dalles.glb',
        isAnimated: false
    },
    {
        type: Ferme,
        resource: 'Ferme',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        source: 'models/Ferme.glb',
        isAnimated: false
    },
    {
        type: Flag,
        resource: 'flag',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        source: 'models/flag.glb',
        isAnimated: true
    },
    {
        type: Pancarte,
        resource: 'pancarte',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        source: 'models/pancarte.glb',
        isAnimated: false
    },
    {
        type: Panneaux,
        resource: 'Panneaux',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        source: 'models/Panneaux.glb',
        isAnimated: false
    },
    {
        type: Place,
        resource: 'place',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        source: 'models/place.glb',
        isAnimated: false
    },
    {
        type: Ponts,
        resource: 'Ponts',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        source: 'models/Ponts.glb',
        isAnimated: false
    },
    {
        type: PortailPlace,
        resource: 'portail_place',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        source: 'models/portail_place.glb',
        isAnimated: false
    },
    {
        type: PortailShader,
        resource: 'portail_shader',
        hasPhysics: true,
        display: 1,
        castShadow: false,
        source: 'models/portail_shader.glb',
        isAnimated: true
    },
    {
        type: Props,
        resource: 'Props',
        hasPhysics: true,
        display: 0,
        castShadow: true,
        source: 'models/Props.glb',
        isAnimated: false
    },
    // Nature
    //  Vegetations
    //     Trees
    {
        type: ArbreSacre,
        resource: 'Arbre_sacre',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        source: 'models/Arbre_sacre.glb',
        isAnimated: false
    },
    {
        type: ArbreRose,
        resource: 'Arbre_rose',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        source: 'models/Arbre_rose.glb',
        isAnimated: false
    },
    {
        type: Pine,
        resource: 'Pine',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        source: 'models/Pine.glb',
        isAnimated: false
    },
    {
        type: Arbres,
        resource: 'Arbres',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        source: 'models/Arbres.glb',
        isAnimated: false
    },
    {
        type: TreeAnimated,
        resource: 'tree_animated',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        source: 'models/tree_animated.glb',
        isAnimated: false
    },
    // Others
    {
        type: Buisson,
        resource: 'Buissons',
        hasPhysics: false,
        display: 0,
        castShadow: false,
        source: 'models/Buissons.glb',
        isAnimated: false
    },
    {
        type: Champi,
        resource: 'champi',
        hasPhysics: false,
        display: 0,
        castShadow: false,
        source: 'models/champi.glb',
        isAnimated: false
    },
    {
        type: Crystal,
        resource: 'Crystal',
        hasPhysics: true,
        display: 1,
        castShadow: false,
        source: 'models/Crystal.glb',
        isAnimated: false
    },
    {
        type: DebrisCarriere,
        resource: 'Debris_carriere',
        hasPhysics: false,
        display: 1,
        castShadow: false,
        source: 'models/Debris_carriere.glb',
        isAnimated: false
    },
    {
        type: Ecume1,
        resource: 'ecume1',
        hasPhysics: false,
        display: 1,
        castShadow: false,
        source: 'models/ecume1.glb',
        isAnimated: true
    },
    {
        type: Ecume2,
        resource: 'ecume2',
        hasPhysics: false,
        display: 1,
        castShadow: false,
        source: 'models/ecume2.glb',
        isAnimated: true
    },
    {
        type: Ilot,
        resource: 'Ilot',
        hasPhysics: true,
        display: 2,
        castShadow: false,
        source: 'models/Ilot.glb',
        isAnimated: false
    },
    {
        type: Lac,
        resource: 'Lac',
        hasPhysics: false,
        display: 2,
        castShadow: false,
        source: 'models/Lac.glb',
        isAnimated: false
    },
    {
        type: Miasme,
        resource: 'miasme',
        hasPhysics: true,
        display: 2,
        castShadow: false,
        source: 'models/miasme.glb',
        isAnimated: false
    },
    {
        type: Modele,
        resource: 'modele',
        hasPhysics: false,
        display: 0,
        castShadow: false,
        source: 'models/modele.glb',
        isAnimated: false
    },
    {
        type: Cascade,
        resource: 'cascade',
        hasPhysics: false,
        display: 1,
        castShadow: false,
        source: 'models/cascade.glb',
        isAnimated: true
    },
    {
        type: RocherLivre,
        resource: 'Rocher_livre',
        hasPhysics: true,
        display: 1,
        castShadow: false,
        source: 'models/Rocher_livre.glb',
        isAnimated: false
    },
    {
        type: Rochers,
        resource: 'Rochers',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        source: 'models/Rochers.glb',
        isAnimated: false
    },
    {
        type: Ruine1,
        resource: 'Ruine1',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        source: 'models/Ruine1.glb',
        isAnimated: false
    },
    {
        type: Ruine2,
        resource: 'Ruine2',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        source: 'models/Ruine2.glb',
        isAnimated: false
    },
    {
        type: Ruine3,
        resource: 'Ruine3',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        source: 'models/Ruine3.glb',
        isAnimated: false
    },
    {
        type: Stele1,
        resource: 'Stele1',
        hasPhysics: true,
        display: 0,
        castShadow: false,
        source: 'models/Stele1.glb',
        isAnimated: false
    },
    {
        type: Stele2,
        resource: 'Stele2',
        hasPhysics: true,
        display: 0,
        castShadow: false,
        source: 'models/Stele2.glb',
        isAnimated: false
    },
    {
        type: Stele3,
        resource: 'Stele3',
        hasPhysics: true,
        display: 0,
        castShadow: false,
        source: 'models/Stele3.glb',
        isAnimated: false
    }
]