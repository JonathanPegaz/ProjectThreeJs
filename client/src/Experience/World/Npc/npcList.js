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
        dialog: [
            'Bonjour, Je suis le chef du village',
            'Je suis là pour vous donner une quête',
            'Ramenez moi 2 diamants et 3 carottes pour la fête du village',
        ],
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
    }
]