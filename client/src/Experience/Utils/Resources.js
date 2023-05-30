import {PlaneGeometry, Mesh, LoadingManager, TextureLoader, CubeTextureLoader, FileLoader, AudioLoader} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from './EventEmitter.js'
import { gsap } from 'gsap'
import {overlayMaterial} from "../Shaders/OverlayShaders.js";
import Experience from "../Experience.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()

        this.sources = sources

        this.items = {}
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        // Overlay
        // const overlayGeometry = new PlaneGeometry(2, 2, 1, 1)
        // const overlay = new Mesh(overlayGeometry, overlayMaterial)
        // this.scene.add(overlay)

        // add Html home video full screen
        this.homeVideoDiv = document.createElement('div')
        this.homeVideoDiv.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        `
        this.homeVideo = document.createElement('video')
        this.homeVideo.src = './video/home.mp4'
        this.homeVideo.autoplay = true
        this.homeVideo.loop = true
        this.homeVideo.muted = true
        this.homeVideo.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transform: translate(-50%, -50%);
        `
        this.homeVideoDiv.appendChild(this.homeVideo)
        document.body.appendChild(this.homeVideoDiv)

        // Loading bar
        const loadingBarElement = document.createElement('div')
        loadingBarElement.style.cssText = `
            position: absolute;
            top: 50%;
            width: 100%;
            height: 2px;
            background: #ffffff;
            transform: scaleX(0.3);
            transform-origin: top left;
            transition: transform 0.5s;
        `
        document.body.appendChild(loadingBarElement)
        const loadingManager = new LoadingManager(
            // Loaded
            () =>
            {
                // Wait a little
                window.setTimeout(() =>
                {
                    // create css class ended
                    const style = document.createElement('style')
                    style.type = 'text/css'
                    style.innerHTML = '.ended { ' +
                        '    transform: scaleX(0);\n' +
                        '    transform-origin: 100% 0;\n' +
                        '    transition: transform 1.5s ease-in-out;  ' +
                        '}'
                    document.getElementsByTagName('head')[0].appendChild(style)

                    // Update loadingBarElement
                    loadingBarElement.classList.add('ended')
                    loadingBarElement.style.transform = ''
                }, 500)
            },

            // Progress
            (itemUrl, itemsLoaded, itemsTotal) =>
            {
                // Calculate the progress and update the loadingBarElement
                const progressRatio = itemsLoaded / itemsTotal
                loadingBarElement.style.transform = `scaleX(${progressRatio})`
            }
        )

        this.loaders = {}
        this.loaders.dracoLoader = new DRACOLoader()
        this.loaders.dracoLoader.setDecoderPath('/draco/')
        this.loaders.gltfLoader = new GLTFLoader(loadingManager)
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
        this.loaders.textureLoader = new TextureLoader()
        this.loaders.cubeTextureLoader = new CubeTextureLoader()
        this.loaders.fileLoader = new FileLoader();
        this.loaders.audioLoader = new AudioLoader();
    }

    startLoading()
    {
        // Load each source
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if (source.type === 'json') {
                this.loaders.fileLoader.load(
                  source.path,
                  (jsonText) => {
                      const json = JSON.parse(jsonText);
                      this.sourceLoaded(source, json);
                  }
                );
            }
            else if (source.type === 'audio') {
                this.loaders.audioLoader.load(
                  source.path,
                  (file) => {
                      this.sourceLoaded(source, file);
                  }
                );
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file

        this.loaded++

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
    }

    removeOverlay() {
        // Animate overlay
        gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })
    }

    destroy() {

        // dispose of all the things
        for (const item of Object.values(this.items)) {
            if (item.dispose) {
                item.dispose()
            }
        }

        this.sources = null
        this.items = null
        this.experience = null
        this.scene = null
        this.toLoad = null
        this.loaded = null
        this.setLoaders = null
        this.startLoading = null

        this.loaders.dracoLoader = null
        this.loaders.gltfLoader = null
        this.loaders.textureLoader = null
        this.loaders.cubeTextureLoader = null
        this.loaders = null
    }
}