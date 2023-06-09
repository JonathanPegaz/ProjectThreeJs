import Barriere from "./Buildings/Barriere.js";
import Batiments from "./Buildings/Batiments.js";
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
import Champi from "./Nature/Vegetations/Champi.js";
import Ecume1 from "./Nature/Ecume1.js";
import Cascade from "./Nature/Cascade.js";
import Ecume2 from "./Nature/Ecume2.js";
import Flag from "./Buildings/Flag.js";
import Place from "./Buildings/Place.js";
import PortailPlace from "./Buildings/PortailPlace.js";
import PortailShader from "./Buildings/PortailShader.js";
import Ecume3 from "./Nature/Ecume3.js";
import Carotte from "./Nature/Vegetations/Carrote.js";
import CristauxPortail from "./Nature/CristauxPortail.js";
import PanneauxCollec from "./Buildings/PanneauxCollec.js";
import PanneauxDirection from "./Buildings/PanneauxDirection.js";
import PortailIntro from "./Buildings/PortailIntro.js";
import Stand from "./Buildings/Stand.js";
import Bol from "./Buildings/Bol.js";
import FruitPose from "./Nature/FruitPose.js";
import FruitRamasse from "./Nature/FruitRamasse.js";
import PortailIntroShader from "./Buildings/PortailIntroShader.js";
import Flamme from "./Buildings/Flamme.js";
import Torch from "./Buildings/Torch.js";
import Vent1 from "./Nature/Vent1.js";

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
        isAnimated: false,
        isInteractive: false
    },
    {
        type: Batiments,
        resource: 'Batiments',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: Bol,
        resource: 'Bol',
        hasPhysics: false,
        display: 0,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: Ferme,
        resource: 'Ferme',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: Flag,
        resource: 'Flag',
        hasPhysics: false,
        display: 1,
        castShadow: true,
        isAnimated: true,
        isInteractive: false
    },
    {
        type: Panneaux,
        resource: 'Panneaux',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: PanneauxCollec,
        resource: 'Panneaux_collec',
        hasPhysics: true,
        display: 0,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: PanneauxDirection,
        resource: 'Panneaux_direction',
        hasPhysics: true,
        display: 0,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: Place,
        resource: 'Place',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: Ponts,
        resource: 'Ponts',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: PortailIntro,
        resource: 'Portail_intro',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: PortailPlace,
        resource: 'Portail_place',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: PortailShader,
        resource: 'Portail_shader',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        isAnimated: true,
        isInteractive: true
    },
    {
        type: PortailIntroShader,
        resource: 'Portail_intro_shader',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        isAnimated: true,
        isInteractive: false
    },
    {
        type: Props,
        resource: 'Props',
        hasPhysics: true,
        display: 0,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: Stand,
        resource: 'Stand',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
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
        isAnimated: false,
        isInteractive: true
    },
    {
        type: ArbreRose,
        resource: 'Arbre_rose',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: Pine,
        resource: 'Pine',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: Arbres,
        resource: 'Arbres',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
    // Others
    {
        type: Buisson,
        resource: 'Buissons',
        hasPhysics: false,
        display: 0,
        castShadow: false,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: Carotte,
        resource: 'Carotte',
        hasPhysics: false,
        display: 0,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: Champi,
        resource: 'Champi',
        hasPhysics: false,
        display: 0,
        castShadow: true,
        isAnimated: false,
        isInteractive: true
    },
    {
        type: Crystal,
        resource: 'Crystal',
        hasPhysics: true,
        display: 1,
        castShadow: false,
        isAnimated: false,
        isInteractive: true
    },
    {
        type: DebrisCarriere,
        resource: 'Debris_carriere',
        hasPhysics: false,
        display: 0,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: Ecume1,
        resource: 'Ecume1',
        hasPhysics: false,
        display: 1,
        castShadow: false,
        isAnimated: true,
        isInteractive: false
    },
    {
        type: Ecume2,
        resource: 'Ecume2',
        hasPhysics: false,
        display: 1,
        castShadow: false,
        isAnimated: true,
        isInteractive: false
    },
    {
        type: Ecume3,
        resource: 'Ecume3',
        hasPhysics: false,
        display: 1,
        castShadow: false,
        isAnimated: true,
        isInteractive: false
    },
    {
        type: FruitPose,
        resource: 'Fruit_pose',
        hasPhysics: false,
        display: 0,
        castShadow: true,
        isAnimated: false,
        isInteractive: true
    },
    {
        type: FruitRamasse,
        resource: 'Fruit_ramasse',
        hasPhysics: false,
        display: 0,
        castShadow: true,
        isAnimated: true,
        isInteractive: true
    },
    {
        type: Ilot,
        resource: 'Ilot',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: Lac,
        resource: 'Lac',
        hasPhysics: false,
        display: 2,
        castShadow: false,
        isAnimated: true,
        isInteractive: false
    },
    {
        type: Cascade,
        resource: 'Cascade',
        hasPhysics: false,
        display: 1,
        castShadow: true,
        isAnimated: true,
        isInteractive: false
    },
    {
        type: RocherLivre,
        resource: 'Rocher_livre',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: Rochers,
        resource: 'Rochers',
        hasPhysics: true,
        display: 2,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: Ruine1,
        resource: 'Ruine1',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        isAnimated: false,
        isInteractive: true
    },
    {
        type: Ruine2,
        resource: 'Ruine2',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        isAnimated: false,
        isInteractive: true
    },
    {
        type: Ruine3,
        resource: 'Ruine3',
        hasPhysics: true,
        display: 1,
        castShadow: true,
        isAnimated: false,
        isInteractive: true
    },
    {
        type: Stele1,
        resource: 'Stele1',
        hasPhysics: true,
        display: 0,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: Stele2,
        resource: 'Stele2',
        hasPhysics: true,
        display: 0,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: Stele3,
        resource: 'Stele3',
        hasPhysics: true,
        display: 0,
        castShadow: true,
        isAnimated: false,
        isInteractive: false
    },
   {
        type: CristauxPortail,
        resource: 'Cristaux_portail',
        hasPhysics: false,
        display: 0,
        castShadow: false,
        isAnimated: false,
        isInteractive: false
    },
    {
        type: Flamme,
        resource: 'Flamme',
        hasPhysics: false,
        display: 0,
        castShadow: false,
        isAnimated: true,
        isInteractive: false
    },
    {
        type: Torch,
        resource: 'Torch',
        hasPhysics: true,
        display: 0,
        castShadow: false,
        isAnimated: true,
        isInteractive: false
    },
    {
        type: Vent1,
        resource: 'Vent1',
        hasPhysics: false,
        display: 0,
        castShadow: false,
        isAnimated: true,
        isInteractive: false
    }
]