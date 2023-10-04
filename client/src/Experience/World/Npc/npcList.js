import Npc from "./Npc.js";

export default [
    {
        id: 1,
        name: ['Chef du village', 'Village chief'],
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
            ["Oooooh, il fait beau aujourd'hui !!!", "Oh, it's a beautiful day today !!!"]
        ],
        nightDialog: [
            ["Le portail est réouvert grâce à vous", "The portal has been reopened thanks to you"],
            ["Une grande aventure vous attend", "An exciting adventure awaits you"]
        ],
        questDialog: {
            1: [
                ["Bonjour, je suis le chef du village !", "Hello, I'm the village chief !"],
                ["Avec le village, nous organisons une fête ce soir en l'honneur de votre initiation.",
                    "With the village, we are organizing a party tonight in honor of your initiation."],
                ["Pouvez-vous m'aider à rassembler les quelques courses qu'il nous manque ?",
                    "Can you help me gather the few items we need for the party?"]
            ],
            2: [
                ["Merci pour votre aide !!!", "Thank you for your help !!!"],
                ["Vous êtes terriblement efficace.", "You are terribly efficient."],
                ["Voici votre récompense, un peu de Kooma, cette poudre issue du raffinage de cristaux de Mithralite est assez rare, prenez en soin.",
                    "Here is your reward, a bit of Kooma, this powder refined from Mithralite crystals is quite rare, take care of it."],
                ["Je m'occupe du reste, rendez-vous ce soir à 20h.", "I'll take care of the rest, see you tonight at 8 PM."]
            ],
            3: [
                ["Bonsoir !!!", "Good evening !!!"],
                ["Je suis dans de beaux draps...", "I'm in a bit of a bind..."],
                ["La fête est sur le point de commencer mais le prêtre n'est toujours pas là...",
                    "The party is about to start, but the priest is still not here..."],
                ["J'ai encore besoin de votre aide, pouvez-vous le retrouver ?", "I still need your help, can you find him ?"]
            ],
            4: [
                ["Merci, tout est enfin réuni.", "Thank you, everything is finally ready."],
                ["Il est l'heure de commencer la fête !!!", "It's time to start the party !!!"],
                ["Je vous laisse l'honneur de disposer le fruit sacré au pied du portail.",
                    "I leave you the honor of placing the sacred fruit at the base of the portal."]
            ]
        },
        travelPoints: null,
        animations_type: 'chief',
        isDancing: false,
    },
    {
        id: 2,
        name: ['Bras droit du chef', 'Chief\'s right-hand man'],
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
            ['Bienvenue !', 'Welcome !'],
            ['Je suis le bras droit du chef', 'I am the chief\'s right-hand man'],
            ['Je vous conseille d\'aller le rencontrer dans le village', 'I advise you to go meet him in the village'],
            ['Il a besoin de votre aide', 'He needs your help']
        ],
        nightDialog: [
            ['Profitez bien de la fête !', 'Enjoy the party !']
        ],
        questDialog: {
            1: [
                ['Bienvenue !', 'Welcome !'],
                ['Je suis le bras droit du chef.', 'I am the chief\'s right-hand man.'],
                ['Je crois qu\'il vous attend à l\'entrée du village.', 'I believe he is waiting for you at the village entrance.']
            ]
        },
        travelPoints: null,
        quest: null,
        animations_type: 'pnj',
        isDancing: true,
    },
    {
        id: 3,
        name: ['Professeur', 'Teacher'],
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
            ["Les élèves sont bien calmes aujourd'hui", "The students are very calm today"]
        ],
        nightDialog: [
            ["Je suis le roi de la danse !", "I am the dance king!"]
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj',
        isDancing: true,
    },
    {
        id: 4,
        name: ['Enfant', 'Child'],
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
            ["C'est bientôt la fête du village", "The village festival is coming soon"]
        ],
        nightDialog: [
            ["Tu veux danser avec moi ?", "Do you want to dance with me?"]
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj',
        isDancing: true,
    },
    {
        id: 5,
        name: ['Enfant', 'Child'],
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
            ["Les cours sont ennuyeux", "Classes are boring"]
        ],
        nightDialog: [
            ["Trop cool la fête !", "The party is so cool!"]
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj',
        isDancing: true,
    },
    {
        id: 6,
        name: ['Enfant', 'Child'],
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
            ["Vivement la récréation", "Can't wait for recess"]
        ],
        nightDialog: [
            ["Jamais je ne dormirai !", "I'll never sleep!"]
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj',
        isDancing: true,
    },
    {
        id: 9,
        name: ['Mineur', 'Miner'],
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
            ["C'est une belle journée pour miner", "It's a beautiful day for mining"]
        ],
        nightDialog: [
            ["Les minerais sont plus beaux la nuit", "Ores are more beautiful at night"]
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj',
        isDancing: true,
    },
    {
        id: 10,
        name: ['Villagois', 'Villager'],
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
            ["Mon coin préféré, que c'est beau", "My favorite spot, it's so beautiful"]
        ],
        nightDialog: [
            ["Cette fête est magnifique", "This party is magnificent"]
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj',
        isDancing: true,
    },
    {
        id: 11,
        name: ['Prêtre', 'Priest'],
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
            ["Que la lumière vous protège", "May the light protect you"],
            ["... Hic ...", "... Hic ..."],
            ["... ...", "... ..."],
            ["OH !! Vous êtes là.", "OH !! You're here."],
            ["Comment !?!? C'est déjà l'heure de la fête ?", "What !?!? Is it already party time?"],
            ["Merci de m'avoir prévenu, pressons-nous !!!", "Thank you for letting me know, let's hurry !!!"]
        ],
        nightDialog: [
            ["Le pouvoir de la lumière est avec vous, le portail est ouvert",
                "The power of light is with you, the portal is open"]
        ],
        questDialog: {
            1: [
                ["Ouuuh, je crois que j'ai mangé un mauvais champignon, ça taaannnggueee...",
                    "Ouuuh, I think I ate a bad mushroom, it taaastes..."],
                ["...", "..."],
                ["... ...", "... ..."],
                ["OH !! Vous êtes là.", "OH !! You're here."],
                ["Comment !?!? C'est déjà l'heure de la fête ?", "What !?!? Is it already party time?"],
                ["Merci de m'avoir prévenu, pressons-nous !!!", "Thank you for letting me know, let's hurry !!!"]
            ]
        },
        travelPoints: null,
        quest: null,
        animations_type: 'priest',
        isDancing: false,
    },
    {
        id: 12,
        name: ['Fermier', 'Farmer'],
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
            ["Les récoltes sont bonnes cette année", "The harvest is good this year"]
        ],
        nightDialog: [
            ["Manger autant que vous voulez, c'est la fête !", "Eat as much as you want, it's the party !"]
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj',
        isDancing: true,
    },
    {
        id: 13,
        name: ['Cueilleur', 'Harvester'],
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
            ["Où sont les champignons ?", "Where are the mushrooms ?"],
            ["J'adore les champignons", "I love mushrooms"]
        ],
        nightDialog: [
            ["Les vers luisants sont magnifiques", "The fireflies are beautiful"]
        ],
        travelPoints: null,
        quest: null,
        animations_type: 'pnj',
        isDancing: true,
    }
]
