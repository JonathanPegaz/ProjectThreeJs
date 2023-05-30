export default [
    {
        name: 'skybox',
        type: 'cubeTexture',
        path: [
            'textures/environmentMap/Skybox/FS017/FS017_Day_Cubemap_front.png',
            'textures/environmentMap/Skybox/FS017/FS017_Day_Cubemap_back.png',
            'textures/environmentMap/Skybox/FS017/FS017_Day_Cubemap_up.png',
            'textures/environmentMap/Skybox/FS017/FS017_Day_Cubemap_down.png',
            'textures/environmentMap/Skybox/FS017/FS017_Day_Cubemap_right.png',
            'textures/environmentMap/Skybox/FS017/FS017_Day_Cubemap_left.png'
        ]
    },
    {
        name: 'skybox_night',
        type: 'cubeTexture',
        path: [
            'textures/environmentMap/Skybox/FS017/FS017_Night_Cubemap_front.png',
            'textures/environmentMap/Skybox/FS017/FS017_Night_Cubemap_back.png',
            'textures/environmentMap/Skybox/FS017/FS017_Night_Cubemap_up.png',
            'textures/environmentMap/Skybox/FS017/FS017_Night_Cubemap_down.png',
            'textures/environmentMap/Skybox/FS017/FS017_Night_Cubemap_right.png',
            'textures/environmentMap/Skybox/FS017/FS017_Night_Cubemap_left.png'
        ]
    },
    {
        name: 'interfaceNormalMap',
        type: 'texture',
        path: 'textures/interfaceNormalMap.png'
    },
    {
        name: 'foxModel',
        type: 'gltfModel',
        path: 'models/Fox/glTF/Fox.gltf'
    },
    {
        name: 'chief_idle',
        type: 'gltfModel',
        path: 'models/character/Chef village/chief_idle.glb'
    },
    {
        name: 'chief_walking',
        type: 'gltfModel',
        path: 'models/character/Chef village/chief_walking.glb'
    },
    {
        name: 'player_crouching',
        type: 'gltfModel',
        path: 'models/character/Joueur/player_crouching.glb'
    },
    {
        name: 'player_idle',
        type: 'gltfModel',
        path: 'models/character/Joueur/player_idle.glb'
    },
    {
        name: 'player_picking',
        type: 'gltfModel',
        path: 'models/character/Joueur/player_picking.glb'
    },
    {
        name: 'player_walking',
        type: 'gltfModel',
        path: 'models/character/Joueur/player_walking.glb'
    },
    {
        name: 'pnj_greeting',
        type: 'gltfModel',
        path: 'models/character/PNJ/pnj_greeting.glb'
    },
    {
        name: 'pnj_idle',
        type: 'gltfModel',
        path: 'models/character/PNJ/pnj_idle.glb'
    },
    {
        name: 'pnj_walking',
        type: 'gltfModel',
        path: 'models/character/PNJ/pnj_walking.glb'
    },
    {
        name: 'idle',
        type: 'gltfModel',
        path: 'models/character/Joueur/player_idle.glb'
    },
    {
        name: 'walking',
        type: 'gltfModel',
        path: 'models/character/Joueur/player_walking.glb'
    },
    {
        name: 'player',
        type: 'gltfModel',
        path: 'models/perso.gltf'
    },
    {
        name: 'water',
        type: 'texture',
        path: 'textures/water.png'
    },
    {
        name: 'islandHigh',
        type: 'gltfModel',
        path: 'models/island_lowpoly.glb'
    },
    // {
    //     name: 'flowers',
    //     type: 'gltfModel',
    //     path: 'models/fleurs.glb'
    // },
    // Icons
    {
        name:'exclamationMark',
        type:'texture',
        path:'icons/exclamation-mark-100.png'
    },
    {
        name:'speak',
        type:'texture',
        path:'icons/chat-bubble-50.png'

    },
    {
        name:'displacement',
        type:'texture',
        path:'textures/displacement.jpg'

    },
    {
        name: 'quest',
        type: 'json',
        path: 'quest/questRepository.json'
    },
    // Environnements
    {
        name: 'Barrieres',
        type: 'gltfModel',
        path: 'models/Barrieres.glb'
    },
    {
        name: 'Batiments',
        type: 'gltfModel',
        path: 'models/Batiments.glb'
    },
    {
        name: 'Dalles',
        type: 'gltfModel',
        path: 'models/Dalles.glb'
    },
    {
        name: 'Ferme',
        type: 'gltfModel',
        path: 'models/Ferme.glb'
    },
    {
        name: 'Flag',
        type: 'gltfModel',
        path: 'models/flag.glb'
    },
    /*{
        name: 'Pancarte',
        type: 'gltfModel',
        path: 'models/pancarte.glb'
    },*/
    {
        name: 'Panneaux',
        type: 'gltfModel',
        path: 'models/Panneaux.glb'
    },
    {
        name: 'Place',
        type: 'gltfModel',
        path: 'models/place.glb'
    },
    {
        name: 'Ponts',
        type: 'gltfModel',
        path: 'models/Ponts.glb'
    },
    {
        name: 'Portail_place',
        type: 'gltfModel',
        path: 'models/portail_place.glb'
    },
    {
        name: 'Portail_shader',
        type: 'gltfModel',
        path: 'models/portail_shader.glb'
    },
    {
        name: 'Props',
        type: 'gltfModel',
        path: 'models/Props.glb'
    },
    {
        name: 'Arbre_sacre',
        type: 'gltfModel',
        path: 'models/Arbre_sacre.glb'
    },
    {
        name: 'Arbre_rose',
        type: 'gltfModel',
        path: 'models/Arbre_rose.glb'
    },
    {
        name: 'Pine',
        type: 'gltfModel',
        path: 'models/Pine.glb'
    },
    {
        name: 'Arbres',
        type: 'gltfModel',
        path: 'models/Arbres.glb'
    },
    {
        name: 'Buissons',
        type: 'gltfModel',
        path: 'models/Buissons.glb'
    },
    {
        name: 'Carotte',
        type: 'gltfModel',
        path: 'models/carotte.glb'
    },
    {
        name: 'Champi',
        type: 'gltfModel',
        path: 'models/champi.glb'
    },
    {
        name: 'Crystal',
        type: 'gltfModel',
        path: 'models/Crystal.glb'
    },
    {
        name: 'Debris_carriere',
        type: 'gltfModel',
        path: 'models/Debris_carriere.glb'
    },
    {
        name: 'Ecume1',
        type: 'gltfModel',
        path: 'models/ecume1.glb'
    },
    {
        name: 'Ecume2',
        type: 'gltfModel',
        path: 'models/ecume2.glb'
    },
    {
        name: 'Ecume3',
        type: 'gltfModel',
        path: 'models/ecume3.glb'
    },
    {
        name: 'Ilot',
        type: 'gltfModel',
        path: 'models/Ilot.glb'
    },
    {
        name: 'Lac',
        type: 'gltfModel',
        path: 'models/Lac.glb'
    },
    {
        name: 'Miasme',
        type: 'gltfModel',
        path: 'models/miasme.glb'
    },
    {
        name: 'Cascade',
        type: 'gltfModel',
        path: 'models/cascade.glb'
    },
    {
        name: 'Rocher_livre',
        type: 'gltfModel',
        path: 'models/Rocher_livre.glb'
    },
    {
        name: 'Rochers',
        type: 'gltfModel',
        path: 'models/Rochers.glb'
    },
    {
        name: 'Ruine1',
        type: 'gltfModel',
        path: 'models/Ruine1.glb'
    },
    {
        name: 'Ruine2',
        type: 'gltfModel',
        path: 'models/Ruine2.glb'
    },
    {
        name: 'Ruine3',
        type: 'gltfModel',
        path: 'models/Ruine3.glb'
    },
    {
        name: 'Stele1',
        type: 'gltfModel',
        path: 'models/Stele1.glb'
    },
    {
        name: 'Stele2',
        type: 'gltfModel',
        path: 'models/Stele2.glb'
    },
    {
        name: 'Stele3',
        type: 'gltfModel',
        path: 'models/Stele3.glb'
    },
    {
        name: 'Cristaux_portail',
        type: 'gltfModel',
        path: 'models/Cristaux_portail.glb'
    },
    {
        name: 'Panneaux_collec',
        type: 'gltfModel',
        path: 'models/panneaux_collec.glb'
    },
    {
        name: 'Panneaux_direction',
        type: 'gltfModel',
        path: 'models/panneaux_direction.glb'
    },
    {
        name: 'Portail_intro',
        type: 'gltfModel',
        path: 'models/portail_intro.glb'
    },
    {
        name: 'Portail',
        type: 'gltfModel',
        path: 'models/portail.glb'
    },
    {
        name: 'Stand',
        type: 'gltfModel',
        path: 'models/stand.glb'
    }
]