import { PlaneGeometry, Mesh, LoadingManager, TextureLoader, CubeTextureLoader } from 'three'
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
        this.pseudo = null

        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        // Overlay
        const overlayGeometry = new PlaneGeometry(2, 2, 1, 1)
        const overlay = new Mesh(overlayGeometry, overlayMaterial)
        this.scene.add(overlay)

        const loadingBarElement = document.querySelector('.loading-bar')
        const loadingManager = new LoadingManager(
            // Loaded
            () =>
            {
                // Wait a little
                window.setTimeout(() =>
                {
                    // Update loadingBarElement
                    loadingBarElement.classList.add('ended')
                    loadingBarElement.style.transform = ''

                    // Show input
                    this.showInput()
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

    showInput()
    {
        // Ajouter l'input pour rentrer le pseudo
        const inputContainer = document.createElement('div')
        inputContainer.style.position = 'absolute'
        inputContainer.style.top = '50%'
        inputContainer.style.left = '50%'
        inputContainer.style.transform = 'translate(-50%, -50%)'
        inputContainer.style.display = 'flex'
        inputContainer.style.flexDirection = 'column'
        inputContainer.style.alignItems = 'center'

        const inputLabel = document.createElement('label')
        inputLabel.innerText = 'Entrez votre pseudo :'
        inputLabel.style.marginBottom = '10px'
        inputLabel.style.fontFamily = 'Arial, sans-serif'
        inputLabel.style.fontSize = '24px'
        inputLabel.style.color = 'white'

        const inputElement = document.createElement('input')
        inputElement.type = 'text'
        inputElement.style.width = '200px'
        inputElement.style.padding = '10px'
        inputElement.style.borderRadius = '5px'
        inputElement.style.border = 'none'
        inputElement.style.background = '#555555'
        inputElement.style.color = 'white'
        inputElement.style.fontFamily = 'Arial, sans-serif'
        inputElement.style.fontSize = '18px'
        inputElement.style.textAlign = 'center'

        const submitButton = document.createElement('button')
        submitButton.type = 'submit'
        submitButton.innerText = 'Valider'
        submitButton.style.padding = '10px'
        submitButton.style.marginTop = '20px'
        submitButton.style.borderRadius = '5px'
        submitButton.style.border = 'none'
        submitButton.style.background = '#555555'
        submitButton.style.color = 'white'
        submitButton.style.fontFamily = 'Arial, sans-serif'
        submitButton.style.fontSize = '18px'
        submitButton.style.cursor = 'pointer'

        const form = document.createElement('form')

        inputContainer.appendChild(inputLabel)
        inputContainer.appendChild(inputElement)
        inputContainer.appendChild(submitButton)
        form.appendChild(inputContainer)
        document.body.appendChild(form)

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.pseudo = inputElement.value;
            this.trigger('pseudo-entered')
            form.remove();
            // Animate overlay
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })
        });
    }

    destroy() {
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