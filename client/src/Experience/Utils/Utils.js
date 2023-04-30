import * as THREE from "three";
import * as CANNON from 'cannon-es'

export const randnum = (min, max) => {
    return Math.random() * (max - min) + min;
}

export const img2matrix = {
    fromImage: (image, width, depth, minHeight, maxHeight) => {
        width = width | 0;
        depth = depth | 0;
        let i, j;
        const matrix = [];
        const canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');
        let imgData, pixel, channels = 4;
        const heightRange = maxHeight - minHeight;
        let heightData;
        canvas.width = width;
        canvas.height = depth;
        ctx.drawImage(image, 0, 0, width, depth);
        imgData = ctx.getImageData(0, 0, width, depth).data;
        for (i = 0 | 0; i < depth; i = (i + 1) | 0) {
            matrix.push([]);
            for (j = 0 | 0; j < width; j = (j + 1) | 0) {
                pixel = i * depth + j;
                heightData = imgData[pixel * channels] / 255 * heightRange + minHeight;
                matrix[i].push(heightData);
            }
        }
        return matrix;
    },
    fromUrl: (url, width, depth, minHeight, maxHeight) => {
        return function () {
            return new Promise(function (onFulfilled, onRejected) {
                const image = new Image();
                image.crossOrigin = "anonymous";
                image.onload = function () {
                    const matrix = img2matrix.fromImage(image, width, depth, minHeight, maxHeight);
                    onFulfilled(matrix);
                };
                image.src = url;
            });
        }
    }
}

export function shapeToGeometry(shape, { flatShading = true } = {}) {
    switch (shape.type) {
        case CANNON.Shape.types.SPHERE: {
            return new THREE.SphereGeometry(shape.radius, 8, 8)
        }

        case CANNON.Shape.types.PARTICLE: {
            return new THREE.SphereGeometry(0.1, 8, 8)
        }

        case CANNON.Shape.types.PLANE: {
            return new THREE.PlaneGeometry(500, 500, 4, 4)
        }

        case CANNON.Shape.types.BOX: {
            return new THREE.BoxGeometry(shape.halfExtents.x * 2, shape.halfExtents.y * 2, shape.halfExtents.z * 2)
        }

        case CANNON.Shape.types.CYLINDER: {
            return new THREE.CylinderGeometry(shape.radiusTop, shape.radiusBottom, shape.height, shape.numSegments)
        }

        case CANNON.Shape.types.CONVEXPOLYHEDRON: {
            const geometry = new THREE.Geometry()

            // Add vertices
            for (let i = 0; i < shape.vertices.length; i++) {
                const vertex = shape.vertices[i]
                geometry.vertices.push(new THREE.Vector3(vertex.x, vertex.y, vertex.z))
            }

            // Add faces
            for (let i = 0; i < shape.faces.length; i++) {
                const face = shape.faces[i]

                const a = face[0]
                for (let j = 1; j < face.length - 1; j++) {
                    const b = face[j]
                    const c = face[j + 1]
                    geometry.faces.push(new THREE.Face3(a, b, c))
                }
            }

            geometry.computeBoundingSphere()

            if (flatShading) {
                geometry.computeFaceNormals()
            } else {
                geometry.computeVertexNormals()
            }

            return geometry
        }

        case CANNON.Shape.types.HEIGHTFIELD: {
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

                        vertices.push(
                            v0.x, v0.y, v0.z,
                            v1.x, v1.y, v1.z,
                            v2.x, v2.y, v2.z
                        );

                        const i = vertices.length / 3 - 3;
                        indices.push(i, i + 1, i + 2);
                    }
                }
            }

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            geometry.setIndex(indices);
            geometry.computeBoundingSphere();

            geometry.computeBoundingBox();
            geometry.computeVertexNormals();

            return geometry;
        }

        case CANNON.Shape.types.TRIMESH: {
            const geometry = new THREE.Geometry()

            const v0 = new CANNON.Vec3()
            const v1 = new CANNON.Vec3()
            const v2 = new CANNON.Vec3()
            for (let i = 0; i < shape.indices.length / 3; i++) {
                shape.getTriangleVertices(i, v0, v1, v2)
                geometry.vertices.push(
                    new THREE.Vector3(v0.x, v0.y, v0.z),
                    new THREE.Vector3(v1.x, v1.y, v1.z),
                    new THREE.Vector3(v2.x, v2.y, v2.z)
                )
                const j = geometry.vertices.length - 3
                geometry.faces.push(new THREE.Face3(j, j + 1, j + 2))
            }

            geometry.computeBoundingSphere()

            if (flatShading) {
                geometry.computeFaceNormals()
            } else {
                geometry.computeVertexNormals()
            }

            return geometry
        }

        default: {
            throw new Error(`Shape not recognized: "${shape.type}"`)
        }
    }
}

export function bodyToMesh(body, material) {
    const group = new THREE.Group()

    group.position.copy(body.position)
    group.quaternion.copy(body.quaternion)

    const meshes = body.shapes.map((shape) => {
        const geometry = shapeToGeometry(shape)

        return new THREE.Mesh(geometry, material)
    })

    meshes.forEach((mesh, i) => {
        const offset = body.shapeOffsets[i]
        const orientation = body.shapeOrientations[i]
        mesh.position.copy(offset)
        mesh.quaternion.copy(orientation)

        group.add(mesh)
    })

    return group
}

export const setGradient = (geometry, colors, axis, reverse) => {
    geometry.computeBoundingBox();
    const bbox = geometry.boundingBox;
    const size = new THREE.Vector3().subVectors(bbox.max, bbox.min);
    const vertexIndices = ['a', 'b', 'c'];
    let face, vertex, normalized = new THREE.Vector3(), normalizedAxis = 0;
    for (let c = 0; c < colors.length - 1; c++) {
        const colorDiff = colors[c + 1].stop - colors[c].stop;
        for (let i = 0; i < geometry.attributes.position.count; i += 3) {
            for (let v = 0; v < 3; v++) {
                vertex = new THREE.Vector3(
                    geometry.attributes.position.array[i + v * 3],
                    geometry.attributes.position.array[i + v * 3 + 1],
                    geometry.attributes.position.array[i + v * 3 + 2]
                );
                normalizedAxis = normalized.subVectors(vertex, bbox.min).divide(size)[axis];
                if (reverse) {
                    normalizedAxis = 1 - normalizedAxis;
                }
                if (normalizedAxis >= colors[c].stop && normalizedAxis <= colors[c + 1].stop) {
                    const localNormalizedAxis = (normalizedAxis - colors[c].stop) / colorDiff;
                    geometry.attributes.color.array[i + v * 3] = colors[c].color.r + (colors[c + 1].color.r - colors[c].color.r) * localNormalizedAxis;
                    geometry.attributes.color.array[i + v * 3 + 1] = colors[c].color.g + (colors[c + 1].color.g - colors[c].color.g) * localNormalizedAxis;
                    geometry.attributes.color.array[i + v * 3 + 2] = colors[c].color.b + (colors[c + 1].color.b - colors[c].color.b) * localNormalizedAxis;
                }
            }
        }
    }
    geometry.attributes.color.needsUpdate = true;
};