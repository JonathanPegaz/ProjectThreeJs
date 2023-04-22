import * as THREE from 'three';
import Experience from "../Experience.js";

export default class HTMLPoints {

    constructor() {

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera


        this.raycaster = new THREE.Raycaster()
        this.points = [
            {
                position: new THREE.Vector3(1.55, 0.3, - 0.6),
                element: document.querySelector('.point-0')
            },
            {
                position: new THREE.Vector3(0.5, 0.8, - 1.6),
                element: document.querySelector('.point-1')
            },
            {
                position: new THREE.Vector3(1.6, 1.3, - 0.7),
                element: document.querySelector('.point-2')
            }
        ]
    }

    update() {
        // Go through each point
        for(const point of this.points)
        {
            // Get 2D screen position
            const screenPosition = point.position.clone()
            screenPosition.project(this.camera.instance)

            // Set the raycaster
            this.raycaster.setFromCamera(screenPosition, this.camera.instance)
            const intersects = this.raycaster.intersectObjects(this.scene.children, true)

            // No intersect found
            if(intersects.length === 0)
            {
                // Show
                point.element.classList.add('visible')
            }

            // Intersect found
            else
            {
                // Get the distance of the intersection and the distance of the point
                const intersectionDistance = intersects[0].distance
                const pointDistance = point.position.distanceTo(this.camera.instance.position)

                // Intersection is close than the point
                if(intersectionDistance < pointDistance)
                {
                    // Hide
                    point.element.classList.remove('visible')
                }
                // Intersection is further than the point
                else
                {
                    // Show
                    point.element.classList.add('visible')
                }
            }

            const translateX = screenPosition.x * this.sizes.width * 0.5
            const translateY = - screenPosition.y * this.sizes.height * 0.5
            point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }
    }


}
