import Npc from "./Npc.js";

export default [
    {
        id: 1,
        name: 'Eric Chef du village',
        type: Npc,
        model: 'chief_idle',
        position: {
            x: -83,
            y: 16,
            z: -17
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        scale: 1,
        positionOffset: 0,
        dialog: [
            'Bonjour, Je suis le chef du village',
            'Je suis là pour vous donner une quête',
            'Ramenez moi 2 diamants et 3 carottes pour la fête du village',
        ],
        travelPoints: null,
        quest: {
            id: 1,
            endDialog: [
                'Merci d\'avoir fait ma quête',
            ]
        },
        animations_type: 'chief'
    },
    {
        id: 2,
        name: 'Yann Bras droit du chef',
        type: Npc,
        model: 'pnj_idle',
        position: {
            x: -80,
            y: 16,
            z: -17
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        scale: 1,
        positionOffset: 0,
        dialog: [
            'Bonjour, je suis Yann',
            'Je suis un autre PNJ',
        ],
        travelPoints: [
            {x: -72, z: -17},
            {x: -80, z: -17},
        ],
        quest: null,
        animations_type: 'pnj'
    },
    {
        id: 3,
        name: 'Professeur',
        type: Npc,
        model: 'pnj_idle',
        position: {
            x: -44.3,
            y: 16,
            z: -13.93
        },
        rotation: {
            x: 0,
            y: Math.PI * 1.5,
            z: 0
        },
        scale: 1,
        positionOffset: 0,
        dialog: [
            'Les élèves sont bien calmes aujourd\'hui',
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj'
    },
    {
        id: 4,
        name: 'Enfant',
        type: Npc,
        model: 'pnj_idle',
        position: {
            x: -47.92,
            y: 16,
            z: -14.07
        },
        rotation: {
            x: 0,
            y: Math.PI * 0.5,
            z: 0
        },
        scale: 0.5,
        positionOffset: -0.5,
        dialog: [
            'C\'est bientôt la fête du village',
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj'
    },
    {
        id: 5,
        name: 'Enfant',
        type: Npc,
        model: 'pnj_idle',
        position: {
            x: -48.50,
            y: 16.1,
            z: -12.78
        },
        rotation: {
            x: 0,
            y: Math.PI * 0.5,
            z: 0
        },
        scale: 0.5,
        positionOffset: -0.5,
        dialog: [
            'Les cours sont ennuyeux',
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj'
    },
    {
        id: 6,
        name: 'Enfant',
        type: Npc,
        model: 'pnj_idle',
        position: {
            x: -48.732,
            y: 16.29,
            z: -15.23
        },
        rotation: {
            x: 0,
            y: Math.PI * 0.5,
            z: 0
        },
        scale: 0.5,
        positionOffset: -0.5,
        dialog: [
            'Vivement la récréation',
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj'
    },
    /*{
        id: 7,
        name: 'Villagois',
        type: Npc,
        model: 'pnj_idle',
        position: {
            x: -82.95,
            y: 16,
            z: -11.22
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        scale: 1,
        positionOffset: 0,
        dialog: [
            'Quelle belle journée',
        ],
        travelPoints: [
            {x: -81.705 , z: 14.02},
            {x: -58.684, z: 21.014},
            {x: -24.488, z: 13.741},
            {x: -38.505, z: -7.903},
            {x: -82.95, z: -11.22},
        ],
        quest: null,
        animations_type: 'pnj'
    },*/
    {
        id: 9,
        name: 'Mineur',
        type: Npc,
        model: 'pnj_idle',
        position: {
            x: -14.44,
            y: 17,
            z: 29.170
        },
        rotation: {
            x: 0,
            y: Math.PI,
            z: 0
        },
        scale: 1,
        positionOffset: 0,
        dialog: [
            'C\'est une belle journée pour miner',
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj'
    },
    {
        id: 10,
        name: 'Villagois',
        type: Npc,
        model: 'pnj_idle',
        position: {
            x: 11.22,
            y: 16,
            z: -2.29
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        scale: 1,
        positionOffset: 0,
        dialog: [
            'Mon coin préfére, que c\'est beau',
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj'
    },
]