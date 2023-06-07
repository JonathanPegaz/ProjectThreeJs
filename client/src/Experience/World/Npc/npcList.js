import Npc from "./Npc.js";

export default [
    {
        id: 1,
        name: 'Chef du village',
        type: Npc,
        model: 'chief_idle',
        position: {
            x: -65.36,
            y: 16.1,
            z: -14.39
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        nightPosition: {
            x: 49.61,
            y: 14.25,
            z: -71.85
        },
        nightRotation: {
            x: 0,
            y: Math.PI * 0.5,
            z: 0
        },
        scale: 1,
        positionOffset: 0,
        dialog: [
            "Oooooh, il fait beau aujourd'hui !!!"
        ],
        nightDialog: [
            'Le portail est réouvert grace à vous',
            'Une grande aventure vous attend',
        ],
        questDialog: {
            1: [
                "Bonjour, je suis le chef du village !",
                "Avec le village, nous organisons une fête ce soir en l'honneur de votre initiation." ,
                "Pouvez-vous m'aider à rassembler les quelques courses qu'il nous manque ?",
            ],
            2: [
              "Merci pour votre aider !!!",
              "Vous êtes terriblement efficace.",
                "Voici votre récompense, un peu de Kooma, cette poudre issue du raffinage de cristaux de Mithralite est assez rare, prenez en soin.",
              "Je m'occupe du reste, rendez-vous ce soir à 20h."
            ],
            3: [
              "Bonsoir !!!",
              "Je suis dans de beaux draps...",
              "La fête est sur le point de commencer mais le prêtre n'est toujours pas là...",
              "J'ai encore besoin de votre aide, pouvez-vous le retrouver ?"
            ],
            4: [
              "Merci, tout est enfin réuni.",
              "Il est l'heure de commencer la fête !!!",
              "Je vous laisse l'honneur de disposer le fruit sacré au pied du portail."
            ]
        },
        travelPoints: null,
        animations_type: 'chief',
        isDancing: false,
    },
    {
        id: 2,
        name: 'Bras droit du chef',
        type: Npc,
        model: 'pnj_idle',
        position: {
            x: -87.39,
            y: 15.54,
            z: -16.92
        },
        rotation: {
            x: 0,
            y: Math.PI * 1.5,
            z: 0
        },
        nightPosition: {
            x: 50.17,
            y: 14.01,
            z: -62.63
        },
        nightRotation: {
            x: 0,
            y: Math.PI * 0.7,
            z: 0
        },
        scale: 1,
        positionOffset: 0,
        dialog: [
            'Bienvenue !',
            'Je suis le bras droit du chef',
            'Je vous conseille d\'aller le rencontrer dans le village',
            'Il à besoin de votre aide',
        ],
        nightDialog: [
            'Profitez bien de la fête !',
        ],
        questDialog: {
            1: [
                "Bienvenue !",
                "Je suis le bras droit du chef." ,
                "Je crois qu'il vous attend à l'entrée du village.",
            ]
        },
        travelPoints: null,
        quest: null,
        animations_type: 'pnj',
        isDancing: true,
    },
    {
        id: 3,
        name: 'Professeur',
        type: Npc,
        model: 'pnj_idle',
        position: {
            x: -44.3,
            y: 16.17,
            z: -13.93
        },
        rotation: {
            x: 0,
            y: Math.PI * 1.5,
            z: 0
        },
        nightPosition: {
            x: 52.57,
            y: 14.25,
            z: -66.85
        },
        nightRotation: {
            x: 0,
            y: Math.PI * 0.25,
            z: 0
        },
        scale: 1,
        positionOffset: 0,
        dialog: [
            'Les élèves sont bien calmes aujourd\'hui',
        ],
        nightDialog: [
            'Je suis le roi de la danse !',
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj',
        isDancing: true,
    },
    {
        id: 4,
        name: 'Enfant',
        type: Npc,
        model: 'pnj_idle',
        position: {
            x: -47.92,
            y: 16.37,
            z: -14.07
        },
        rotation: {
            x: 0,
            y: Math.PI * 0.5,
            z: 0
        },
        nightPosition: {
            x: 54.72,
            y: 14.25,
            z: -68.06
        },
        nightRotation: {
            x: 0,
            y: 0,
            z: 0
        },
        scale: 0.5,
        positionOffset: -0.5,
        dialog: [
            'C\'est bientôt la fête du village',
        ],
        nightDialog: [
            'Tu veux danser avec moi ?',
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj',
        isDancing: true,
    },
    {
        id: 5,
        name: 'Enfant',
        type: Npc,
        model: 'pnj_idle',
        position: {
            x: -48.50,
            y: 16.37,
            z: -12.78
        },
        rotation: {
            x: 0,
            y: Math.PI * 0.5,
            z: 0
        },
        nightPosition: {
            x: 56.25,
            y: 13.85,
            z: -64.70
        },
        nightRotation: {
            x: 0,
            y: Math.PI * 1.6,
            z: 0
        },
        scale: 0.5,
        positionOffset: -0.5,
        dialog: [
            'Les cours sont ennuyeux',
        ],
        nightDialog: [
            'Trop cool la fête !',
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj',
        isDancing: true,
    },
    {
        id: 6,
        name: 'Enfant',
        type: Npc,
        model: 'pnj_idle',
        position: {
            x: -48.732,
            y: 16.37,
            z: -15.23
        },
        rotation: {
            x: 0,
            y: Math.PI * 0.5,
            z: 0
        },
        nightPosition: {
            x: 53.78,
            y: 13.85,
            z: -63.77
        },
        nightRotation: {
            x: 0,
            y: Math.PI * 0.5,
            z: 0
        },
        scale: 0.5,
        positionOffset: -0.5,
        dialog: [
            'Vivement la récréation',
        ],
        nightDialog: [
            'Jamais je ne dormirai !',
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj',
        isDancing: true,
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
            y: 16.17,
            z: 29.170
        },
        rotation: {
            x: 0,
            y: Math.PI,
            z: 0
        },
        nightPosition: {
            x: 60.295,
            y: 13.88,
            z: -65.93
        },
        nightRotation: {
            x: 0,
            y: Math.PI * 1.5,
            z: 0
        },
        scale: 1,
        positionOffset: 0,
        dialog: [
            'C\'est une belle journée pour miner',
        ],
        nightDialog: [
            'Les minerais sont plus beaux la nuit',
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj',
        isDancing: true,
    },
    {
        id: 10,
        name: 'Villagois',
        type: Npc,
        model: 'pnj_idle',
        position: {
            x: 11.22,
            y: 13.86,
            z: -2.29
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        nightPosition: {
            x: 56.21,
            y: 13.99,
            z: -66.75
        },
        nightRotation: {
            x: 0,
            y: Math.PI * 1.8,
            z: 0
        },
        scale: 1,
        positionOffset: 0,
        dialog: [
            'Mon coin préféré, que c\'est beau',
        ],
        nightDialog: [
            'Cette fête est magnifique',
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj',
        isDancing: true,
    },
    {
        id: 11,
        name: 'Prêtre',
        type: Npc,
        model: 'priest_idle',
        position: {
            x: 52.788,
            y: 26.2,
            z: 61.299
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        nightPosition: {
            x: 55.34,
            y: 14.40,
            z: -72.16
        },
        nightRotation: {
            x: 0,
            y: Math.PI * 1.75,
            z: 0
        },
        scale: 1,
        positionOffset: 0,
        dialog: [
            "Que la lumière vous protège",
            "... Hic ..."
        ],
        nightDialog: [
            'Le pouvoir de la lumière est avec vous, le portail est ouvert',
        ],
        questDialog: {
            1: [
              "Ouuuh, je crois que j'ai mangé un mauvais champignon, ça taaannnggueee...",
              "...",
              "... ...",
              "OH !! Vous êtes là.",
              "Comment !?!? C'est déjà l'heure de la fête ?",
              "Merci de m'avoir prévenu, pressons-nous !!!"
            ]
        },
        travelPoints: null,
        quest: null,
        animations_type: 'priest',
        isDancing: false,
    },
    {
        id: 12,
        name: 'Fermier',
        type: Npc,
        model: 'pnj_idle',
        position: {
            x: -51.172,
            y: 16.66,
            z: 16.476
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        nightPosition: {
            x: 51.191,
            y: 13.97,
            z: -59.36
        },
        nightRotation: {
            x: 0,
            y: Math.PI * 0.7,
            z: 0
        },
        scale: 1,
        positionOffset: 0,
        dialog: [
            'Les récoltes sont bonnes cette année',
        ],
        nightDialog: [
            'Manger autant que vous voulez, c\'est la fête !',
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj',
        isDancing: true,
    },
    {
        id: 13,
        name: 'Cueilleur',
        type: Npc,
        model: 'pnj_idle',
        position: {
            x: 29.602,
            y: 14.2,
            z: -34.93
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        nightPosition: {
            x: 62.174,
            y: 13.82,
            z: -62.812
        },
        nightRotation: {
            x: 0,
            y: Math.PI * 1.5,
            z: 0
        },
        scale: 1,
        positionOffset: 0,
        dialog: [
            'Ou sont les champignons ?', 'J\'adore les champignons',
        ],
        nightDialog: [
            'Les vers luisants sont magnifiques',
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj',
        isDancing: true,
    },
]