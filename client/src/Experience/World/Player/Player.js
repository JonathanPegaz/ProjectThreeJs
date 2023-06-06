import Experience from "../../Experience.js";
import {clone} from "three/examples/jsm/utils/SkeletonUtils.js";
import {
    AnimationMixer, AxesHelper,
    CircleGeometry, DoubleSide,
    FrontSide,
    Mesh,
    MeshBasicMaterial,
    MeshToonMaterial,
    Object3D,
    PlaneGeometry
} from "three";


export default class Player {
    constructor(isParrain) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.physics = this.experience.physics
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.network = this.experience.network
        this.isParrain = isParrain

        if (this.isParrain) {
            this.resource = this.resources.items.parrain
        } else {
            this.resource = this.resources.items.player
        }


        this.object = new Object3D()
        this.object.position.set(0, 0, 0)

        this.setModel()
        this.setAnimation()
    }

    setModel() {
        this.model = clone(this.resource.scene.children[0])
        this.model.scale.set(0.175, 0.175, 0.175)
        this.model.position.set(0, -0.5, 0)

        this.model.traverse((child) =>
        {
            if(child instanceof Mesh)
            {
                child.castShadow = false
                child.receiveShadow = true
                child.material = new MeshToonMaterial({
                    ...child.material,
                    side: FrontSide,
                    type: 'MeshToonMaterial',
                })
                if(child.name == "body_1") {
                    child.material.color.setHex(0x0e1111)
                }
            }
        })

        this.object.add(this.model)

        // Fake shadow
        const shadowgeo = new PlaneGeometry( 0.65, 0.65 );
        const shadowmat = new MeshBasicMaterial( {
            map: this.resources.items.roundshadow, transparent: true, depthWrite: false
        } );
        const shadow = new Mesh( shadowgeo, shadowmat );
        shadow.renderOrder = -1;
        shadow.rotation.x = - Math.PI / 2;
        shadow.position.y = -0.35;
        this.object.add( shadow );

        this.scene.add(this.object);
    }

    setAnimation()
    {
        const temp = this.isParrain ? '' : '_nocape'
        this.animations = {}
        this.resource.animations.push(this.resources.items[`player_idle${temp}`].animations[0])
        this.resource.animations.push(this.resources.items[`player_walking${temp}`].animations[0])
        this.resource.animations.push(this.resources.items[`player_running${temp}`].animations[0])
        this.resource.animations.push(this.resources.items[`player_picking${temp}`].animations[0])
        this.resource.animations.push(this.resources.items[`player_kicking${temp}`].animations[0])

        //this.resource.animations.push(this.resources.items.player_crouching.animations[0])
        this.mixer = new AnimationMixer(this.model)

        console.log(this.resource)

        // action
        this.animations.idle = {
            clip: this.resource.animations[1],
            action: this.mixer.clipAction(this.resource.animations[1])
        }

        this.animations.walk = {
            clip: this.resource.animations[2],
            action: this.mixer.clipAction(this.resource.animations[2])
        }

        this.animations.run = {
            clip: this.resource.animations[3],
            action: this.mixer.clipAction(this.resource.animations[3])
        }

        this.animations.pick = {
            clip: this.resource.animations[4],
            action: this.mixer.clipAction(this.resource.animations[4])
        }

        this.animations.kick = {
            clip: this.resource.animations[5],
            action: this.mixer.clipAction(this.resource.animations[5])
        }

        /*this.animations.crouch = {
            clip: this.resource.animations[4],
            action: this.mixer.clipAction(this.resource.animations[4])
        }*/
    }

    destroy() {
        this.object.traverse((child) => {
            if (child.isMesh) {
                child.geometry.dispose()
                if (child.material.texture) {
                    child.material.texture.dispose()
                }
                child.material.dispose()
            }
        })

        this.mixer = null;
        this.animations = null;
        this.model = null;
        this.object = null;
    }
}