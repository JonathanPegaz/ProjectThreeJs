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
        source: 'models/Barrieres.glb'
    },
    {
        type: Batiments,
        resource: 'Batiments',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        source: 'models/Batiments.glb'
    },
    {
        type: Dalles,
        resource: 'Dalles',
        hasPhysics: false,
        display: 0,
        castShadow: false,
        source: 'models/Dalles.glb'
    },
    {
        type: Ferme,
        resource: 'Ferme',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        source: 'models/Ferme.glb'
    },
    {
        type: Panneaux,
        resource: 'Panneaux',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        source: 'models/Panneaux.glb'
    },
    {
        type: Ponts,
        resource: 'Ponts',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        source: 'models/Ponts.glb'
    },
    {
        type: Props,
        resource: 'Props',
        hasPhysics: true,
        display: 0,
        castShadow: true,
        source: 'models/Props.glb'
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
        source: 'models/Arbre_sacre.glb'
    },
    {
        type: ArbreRose,
        resource: 'Arbre_rose',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        source: 'models/Arbre_rose.glb'
    },
    {
        type: Pine,
        resource: 'Pine',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        source: 'models/Pine.glb'
    },
    {
        type: Arbres,
        resource: 'Arbres',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        source: 'models/Arbres.glb'
    },
    // Others
    {
        type: Buisson,
        resource: 'Buissons',
        hasPhysics: false,
        display: 0,
        castShadow: false,
        source: 'models/Buissons.glb'
    },
    {
        type: Crystal,
        resource: 'Crystal',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        source: 'models/Crystal.glb'
    },
    {
        type: DebrisCarriere,
        resource: 'Debris_carriere',
        hasPhysics: false,
        display: 2,
        castShadow: false,
        source: 'models/Debris_carriere.glb'
    },
    {
        type: Ilot,
        resource: 'Ilot',
        hasPhysics: true,
        display: 2,
        castShadow: false,
        source: 'models/Ilot.glb'
    },
    {
        type: Lac,
        resource: 'Lac',
        hasPhysics: false,
        display: 2,
        castShadow: false,
        source: 'models/Lac.glb'
    },
    {
        type: RocherLivre,
        resource: 'Rocher_livre',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        source: 'models/Rocher_livre.glb'
    },
    {
        type: Rochers,
        resource: 'Rochers',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        source: 'models/Rochers.glb'
    },
    {
        type: Ruine1,
        resource: 'Ruine1',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        source: 'models/Ruine1.glb'
    },
    {
        type: Ruine2,
        resource: 'Ruine2',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        source: 'models/Ruine2.glb'
    },
    {
        type: Ruine3,
        resource: 'Ruine3',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        source: 'models/Ruine3.glb'
    },
    {
        type: Stele1,
        resource: 'Stele1',
        hasPhysics: true,
        display: 0,
        castShadow: true,
        source: 'models/Stele1.glb'
    },
    {
        type: Stele2,
        resource: 'Stele2',
        hasPhysics: true,
        display: 0,
        castShadow: true,
        source: 'models/Stele2.glb'
    },
    {
        type: Stele3,
        resource: 'Stele3',
        hasPhysics: true,
        display: 0,
        castShadow: true,
        source: 'models/Stele3.glb'
    },
    {
        type: TreeAnimated,
        resource: 'tree_animated',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        source: 'models/tree_animated.glb',
    }
]