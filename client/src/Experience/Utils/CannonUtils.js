import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from "../Experience.js";
import {setGradient} from "./Utils.js";

export default class CannonUtils
{
    constructor() {
        this.experience = new Experience()
        this.physics = this.experience.physics
        this.scene = this.experience.scene

    }

    static createCannonTrimesh(geometry) {
        if (!geometry.isBufferGeometry) return null;
        const posAttr = geometry.attributes.position;
        const vertices = geometry.attributes.position.array;
        let indices = [];
        for (let i = 0; i < posAttr.count; i++) {
            indices.push(i);
        }
        return new CANNON.Trimesh(vertices, indices);
    }

    static createCannonConvex(geometry) {
        if (!geometry.isBufferGeometry) return null;
        const posAttr = geometry.attributes.position;
        const floats = geometry.attributes.position.array;
        const vertices = [];
        const faces = [];
        let face = [];
        let index = 0;
        for (let i = 0; i < posAttr.count; i += 3) {
            vertices.push(new CANNON.Vec3(floats[i], floats[i + 1], floats[i + 2]));
            face.push(index++);
            if (face.length === 3) {
                faces.push(face);
                face = [];
            }
        }
        return new CANNON.ConvexPolyhedron(vertices, faces);
    }

    addVisual(body, name, castShadow = false, receiveShadow = true) {
        body.name = name;
        if (this.currentMaterial === undefined) this.currentMaterial = new THREE.MeshLambertMaterial({
            color: 0x888888
        });
        if (this.settings === undefined) {
            this.settings = {
                stepFrequency: 60,
                quatNormalizeSkip: 2,
                quatNormalizeFast: true,
                gx: 0,
                gy: 0,
                gz: 0,
                iterations: 3,
                tolerance: 0.0001,
                k: 1e6,
                d: 3,
                scene: 0,
                paused: false,
                rendermode: "solid",
                constraints: false,
                contacts: false,
                cm2contact: false,
                normals: false,
                axes: false,
                particleSize: 0.1,
                shadows: false,
                aabbs: false,
                profiling: false,
                maxSubSteps: 3
            }
            this.particleGeo = new THREE.SphereGeometry(1, 16, 8);
            this.particleMaterial = new THREE.MeshLambertMaterial({
                color: 0xff0000
            });
        }
        let mesh;
        if (body instanceof CANNON.Body) mesh = this.shape2Mesh(body, castShadow, receiveShadow);
        if (mesh) {
            body.threemesh = mesh;
            mesh.castShadow = castShadow;
            mesh.receiveShadow = receiveShadow;
            this.scene.add(mesh);
            console.log(mesh)
        }
    }

    shape2Mesh(body, castShadow, receiveShadow) {
        const obj = new THREE.Object3D();
        const material = new CANNON.Material('default')
        let index = 0;
        body.shapes.forEach(function (shape) {
            let mesh;
            let geometry;
            let v0, v1, v2;
            switch (shape.type) {
                case CANNON.Shape.types.SPHERE:
                    const sphere_geometry = new THREE.SphereGeometry(shape.radius, 8, 8);
                    mesh = new THREE.Mesh(sphere_geometry, material);
                    break;
                case CANNON.Shape.types.PLANE:
                    geometry = new THREE.PlaneGeometry(100, 100, 4, 4);
                    mesh = new THREE.Object3D();
                    const submesh = new THREE.Object3D();
                    THREE.ImageUtils.crossOrigin = '';
                    var floorMap = THREE.ImageUtils.loadTexture('');
                    floorMap.wrapS = floorMap.wrapT = THREE.RepeatWrapping;
                    floorMap.repeat.set(25, 25);
                    const groundMaterial = new THREE.MeshPhongMaterial({
                        color: new THREE.Color('#111'),
                        specular: new THREE.Color('black'),
                        shininess: 0,
                        bumpMap: floorMap
                    });
                    const ground = new THREE.Mesh(geometry, groundMaterial);
                    ground.scale.set(1, 1, 1);
                    submesh.add(ground);
                    mesh.add(submesh);
                    break;
                case CANNON.Shape.types.BOX:
                    const box_geometry = new THREE.BoxGeometry(shape.halfExtents.x * 2,
                        shape.halfExtents.y * 2,
                        shape.halfExtents.z * 2);
                    mesh = new THREE.Mesh(box_geometry, new THREE.MeshLambertMaterial({
                        color: 0x888888,
                        wireframe: true,
                        transparent: true,
                        opacity: 0
                    }));
                    break;
                case CANNON.Shape.types.CONVEXPOLYHEDRON:
                    const geo = new THREE.BufferGeometry();
                    shape.vertices.forEach(function (v) {
                        geo.vertices.push(new THREE.Vector3(v.x, v.y, v.z));
                    });
                    shape.faces.forEach(function (face) {
                        const a = face[0];
                        for (let j = 1; j < face.length - 1; j++) {
                            const b = face[j];
                            const c = face[j + 1];
                            geo.faces.push(new THREE.Face3(a, b, c));
                        }
                    });
                    geo.computeBoundingSphere();
                    geo.computeFaceNormals();
                    mesh = new THREE.Mesh(geo, material);
                    break;
                case CANNON.Shape.types.HEIGHTFIELD:
                    const geometry = new THREE.BufferGeometry();
                    const vertices = [];
                    const indices = [];

                    const v0 = new CANNON.Vec3();
                    const v1 = new CANNON.Vec3();
                    const v2 = new CANNON.Vec3();

                    for (let xi = 0; xi < shape.data.length - 1; xi++) {
                        for (let yi = 0; yi < shape.data[xi].length - 1; yi++) {
                            for (let k = 0; k < 2; k++) {
                                shape.getConvexTrianglePillar(xi, yi, k === 0);
                                v0.copy(shape.pillarConvex.vertices[0]);
                                v1.copy(shape.pillarConvex.vertices[1]);
                                v2.copy(shape.pillarConvex.vertices[2]);
                                v0.vadd(shape.pillarOffset, v0);
                                v1.vadd(shape.pillarOffset, v1);
                                v2.vadd(shape.pillarOffset, v2);
                                vertices.push(v0.x, v0.y, v0.z, v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
                                const i = vertices.length / 3 - 3;
                                indices.push(i, i + 1, i + 2);
                            }
                        }
                    }

                    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
                    geometry.setIndex(indices);

                    geometry.computeBoundingSphere();
                    geometry.computeVertexNormals();

                    const rev = true;
                    const colors = [{
                        stop: 0,
                        color: new THREE.Color(0xf12711)
                    }, {
                        stop: .25,
                        color: new THREE.Color(0xf5af19)
                    }, {
                        stop: .5,
                        color: new THREE.Color(0xfffc00)
                    }, {
                        stop: .75,
                        color: new THREE.Color(0x00e969)
                    }, {
                        stop: 1,
                        color: new THREE.Color(0x053105)
                    }];
                    //setGradient(geometry, colors, 'z', rev);

                    const material = new THREE.MeshLambertMaterial({
                        colors: 0x00ff00,
                        wireframe: false
                    });
                    mesh = new THREE.Mesh(geometry, material);
                    break;
                case CANNON.Shape.types.TRIMESH:
                    geometry = new THREE.Geometry();
                    v0 = new CANNON.Vec3();
                    v1 = new CANNON.Vec3();
                    v2 = new CANNON.Vec3();
                    for (let i = 0; i < shape.indices.length / 3; i++) {
                        shape.getTriangleVertices(i, v0, v1, v2);
                        geometry.vertices.push(
                            new THREE.Vector3(v0.x, v0.y, v0.z),
                            new THREE.Vector3(v1.x, v1.y, v1.z),
                            new THREE.Vector3(v2.x, v2.y, v2.z)
                        );
                        var j = geometry.vertices.length - 3;
                        geometry.faces.push(new THREE.Face3(j, j + 1, j + 2));
                    }
                    geometry.computeBoundingSphere();
                    geometry.computeFaceNormals();
                    mesh = new THREE.Mesh(geometry,  new THREE.MeshLambertMaterial({
                        vertexColors: THREE.VertexColors,
                        wireframe: false
                    }));
                    break;
                default:
                    throw new Error('Visual type not recognized: ' + shape.type);
            }
            mesh.receiveShadow = receiveShadow;
            mesh.castShadow = castShadow;
            mesh.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = castShadow;
                    child.receiveShadow = receiveShadow;
                }
            });
            const o = body.shapeOffsets[index];
            const q = body.shapeOrientations[index++];
            mesh.position.set(o.x, o.y, o.z);
            mesh.quaternion.set(q.x, q.y, q.z, q.w);
            obj.add(mesh);
        });
        return obj;
    }

    static createTrimesh(geometry) {
        let vertices
        if (geometry.index === null) {
            vertices = (geometry.attributes.position).array
        } else {
            vertices = (geometry.clone().toNonIndexed().attributes.position).array
        }
        const indices = Object.keys(vertices).map(Number)
        return new CANNON.Trimesh(vertices, indices)
    }

    static createConvexPolyhedron(geometry) {
        console.log('createConvexPolyhedron', geometry)
        const position = geometry.attributes.position
        const normal = geometry.attributes.normal
        const vertices = []
        for (let i = 0; i < position.count; i++) {
            vertices.push(new THREE.Vector3().fromBufferAttribute(position, i))
        }
        const faces= []
        for (let i = 0; i < position.count; i += 3) {
            const vertexNormals =
                normal === undefined
                    ? []
                    : [
                        new THREE.Vector3().fromBufferAttribute(normal, i),
                        new THREE.Vector3().fromBufferAttribute(
                            normal,
                            i + 1
                        ),
                        new THREE.Vector3().fromBufferAttribute(
                            normal,
                            i + 2
                        ),
                    ]
            const face = {
                a: i,
                b: i + 1,
                c: i + 2,
                normals: vertexNormals,
            }
            faces.push(face)
        }

        const verticesMap = {}
        const points = []
        const changes = []
        for (let i = 0, il = vertices.length; i < il; i++) {
            const v = vertices[i]
            const key =
                Math.round(v.x * 100) +
                '_' +
                Math.round(v.y * 100) +
                '_' +
                Math.round(v.z * 100)
            if (verticesMap[key] === undefined) {
                verticesMap[key] = i
                points.push(
                    new CANNON.Vec3(vertices[i].x, vertices[i].y, vertices[i].z)
                )
                changes[i] = points.length - 1
            } else {
                changes[i] = changes[verticesMap[key]]
            }
        }

        const faceIdsToRemove = []
        for (let i = 0, il = faces.length; i < il; i++) {
            const face = faces[i]
            face.a = changes[face.a]
            face.b = changes[face.b]
            face.c = changes[face.c]
            const indices = [face.a, face.b, face.c]
            for (let n = 0; n < 3; n++) {
                if (indices[n] === indices[(n + 1) % 3]) {
                    faceIdsToRemove.push(i)
                    break
                }
            }
        }

        for (let i = faceIdsToRemove.length - 1; i >= 0; i--) {
            const idx = faceIdsToRemove[i]
            faces.splice(idx, 1)
        }

        const cannonFaces = faces.map(function (f) {
            if (f.c === undefined) return [f.a, f.b, f.b]
            return [f.a, f.b, f.c]
        })

        console.log(points)
        console.log(cannonFaces)

        return new CANNON.ConvexPolyhedron({
            vertices: points,
            faces: cannonFaces,
        })
    }

    static offsetCenterOfMass(body, centerOfMass) {
        body.shapeOffsets.forEach((offset) => {
            centerOfMass.vadd(offset, centerOfMass)
        })
        centerOfMass.scale(1 / body.shapes.length, centerOfMass)
        body.shapeOffsets.forEach((offset) => {
            offset.vsub(centerOfMass, offset)
        })
        const worldCenterOfMass = new CANNON.Vec3()
        body.vectorToWorldFrame(centerOfMass, worldCenterOfMass)
        body.position.vadd(worldCenterOfMass, body.position)
    }
}