// Fichier: physics-worker.js

importScripts('https://unpkg.com/three/build/three.js');
importScripts('https://unpkg.com/cannon-es/dist/cannon.js');
importScripts('https://unpkg.com/cannon-es-debugger/dist/cannon-es-debugger.js');
importScripts('https://unpkg.com/three-to-cannon/build/three-to-cannon.js');

self.onmessage = function(event) {
    const { command, payload } = event.data;

    switch (command) {
        case 'init':
            init();
            break;
        case 'createBoxShape':
            createBoxShape(payload);
            break;
        case 'createTrimeshShape':
            createTrimeshShape(payload);
            break;
        case 'addNpcBody':
            addNpcBody(payload);
            break;
        case 'update':
            update(payload);
            break;
        case 'destroy':
            destroy();
            break;
        default:
            console.error('Commande inconnue :', command);
    }
};
let world, objectsToUpdate, debuggerInstance;

function init() {
    world = new CANNON.World();
    world.gravity.set(0, -29.82, 0);
    world.broadphase = new CANNON.SAPBroadphase(world);
    world.allowSleep = true;
    objectsToUpdate = [];
}

function createBoxShape(mesh) {
    const result = threeToCannon(mesh, { type: ShapeType.BOX });
    const body = new CANNON.Body({ mass: 0 });
    body.addShape(result.shape, result.offset, result.orientation);
    world.addBody(body);
}

function createTrimeshShape(mesh) {
    const geometry = mesh.geometry;
    const vertices = [];
    geometry.attributes.position.array.forEach((vertex, index) => {
        if (index % 3 === 0) {
            vertices.push(
                vertex,
                geometry.attributes.position.array[index + 1],
                geometry.attributes.position.array[index + 2]
            );
        }
    });
    const indices = [];
    for (let i = 0; i < geometry.index.array.length; i += 3) {
        indices.push(
            geometry.index.array[i],
            geometry.index.array[i + 1],
            geometry.index.array[i + 2]
        );
    }

    const body = createBody(new CANNON.Trimesh(vertices, indices));
    world.addBody(body);
}

function addNpcBody(payload) {

}

function createBody(shape) {
    const body = new CANNON.Body({
        mass: 0,
        shape,
    });
    return body;
}

function update(time) {
    world.step(1 / 60, time * 0.001, 3);

    self.postMessage({
        command: 'update',
        payload: {
            bodies: world.bodies.map((body) => ({
                id: body.id,
                position: body.position,
                quaternion: body.quaternion,
            })),
        },
    });

}

function destroy() {
    // Retirez tous les corps
    for (const object of objectsToUpdate) {
        world.removeBody(object.body);
    }

    world = null;
    objectsToUpdate = [];
}

// Exportez les fonctions nécessaires pour les appeler depuis le worker
export { init, createBoxShape, createTrimeshShape, update, destroy };
