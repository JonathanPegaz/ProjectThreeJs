import Npc from "./Npc.js";

export default [
    {
        name: 'jeaneude',
        type: Npc,
        model: 'jean-eude',
        position: {
            x: -84,
            y: 15.5,
            z: -17
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        dialog: [
            'Bonjour, je suis Jean-Eude',
            'Je suis un PNJ',
        ]
    },
    {
        name: 'jean-yves',
        type: Npc,
        path: 'jean-yves',
        position: {
            x: -80,
            y: 15.5,
            z: -17
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        dialog: [
            'Bonjour, je suis Jean-Yves',
            'Je suis un autre PNJ',
        ]
    }
]