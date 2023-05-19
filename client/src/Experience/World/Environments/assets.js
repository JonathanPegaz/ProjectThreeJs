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

export const assets = [
    //          Environment
    // buildings
    {
        type: Barriere,
        resource: 'Barrieres',
        hasPhysics: true,
    },
    {
        type: Batiments,
        resource: 'Batiments',
        hasPhysics: true,

    },
    {
        type: Dalles,
        resource: 'Dalles',
        hasPhysics: false,
    },
    {
        type: Panneaux,
        resource: 'Panneaux',
        hasPhysics: true,
    },
    {
        type: Ponts,
        resource: 'Ponts',
        hasPhysics: true,
    },
    {
        type: Props,
        resource: 'Props',
        hasPhysics: true,
    },
    // Nature
    //  Vegetations
    //     Trees
    {
        type: ArbreSacre,
        resource: 'Arbre_sacre',
        hasPhysics: true,
    },
    {
        type: ArbreRose,
        resource: 'Arbre_rose',
        hasPhysics: true,
    },
    {
        type: Pine,
        resource: 'Pine',
        hasPhysics: true,
    },
    {
        type: Arbres,
        resource: 'Arbres',
        hasPhysics: true,
    },
    // Others
    {
        type: Buisson,
        resource: 'Buissons',
        hasPhysics: false,
    },
    {
        type: Crystal,
        resource: 'Crystal',
        hasPhysics: true,
    },
    {
        type: DebrisCarriere,
        resource: 'Debris_carriere',
        hasPhysics: false,
    },
    {
        type: Ilot,
        resource: 'Ilot',
        hasPhysics: true,
    },
    {
        type: Lac,
        resource: 'Lac',
        hasPhysics: false,
    },
    {
        type: RocherLivre,
        resource: 'Rocher_livre',
        hasPhysics: true,
    },
    {
        type: Rochers,
        resource: 'Rochers',
        hasPhysics: true,
    },
    {
        type: Ruine1,
        resource: 'Ruine1',
        hasPhysics: true,
    },
    {
        type: Ruine2,
        resource: 'Ruine2',
        hasPhysics: true,
    },
    {
        type: Ruine3,
        resource: 'Ruine3',
        hasPhysics: true,
    },
    {
        type: Stele1,
        resource: 'Stele1',
        hasPhysics: true,
    },
    {
        type: Stele2,
        resource: 'Stele2',
        hasPhysics: true,
    },
    {
        type: Stele3,
        resource: 'Stele3',
        hasPhysics: true,
    }
]