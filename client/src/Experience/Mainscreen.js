import EventEmitter from "./Utils/EventEmitter.js";
import Experience from "./Experience.js";

export default class Mainscreen extends EventEmitter{
    constructor() {
        super()
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.pseudo = null
        this.steps = {
            landing: () => {
                const landing = document.querySelector('.loadingScreen-landing')
                landing.classList.add('loadingScreen--active')
                landing.querySelector('.loadingScreen-landing__button-login').addEventListener('click', () => {
                    landing.classList.remove('loadingScreen--active')
                    //this.steps.login()
                    this.steps.starting()
                })
                landing.querySelector('.loadingScreen-register__button-register').addEventListener('click', () => {
                    landing.classList.remove('loadingScreen--active')
                    this.steps.registration()
                })
            },
            login: () => {
                const landing = document.querySelector('.loadingScreen-login')
                landing.classList.add('loadingScreen--active')
            },
            registration: () => {
                const landing = document.querySelector('.loadingScreen-registration')
                landing.classList.add('loadingScreen--active')
                landing.querySelector('.loadingScreen-registration-return').addEventListener('click', () => {
                    landing.classList.remove('loadingScreen--active')
                    this.steps.landing()
                })
                landing.querySelector('.loadingScreen-registration__form').addEventListener('submit', (event) => {
                    event.preventDefault()
                    landing.classList.remove('loadingScreen--active')
                    this.steps.starting()
                })
            },
            starting: () => {
                const landing = document.querySelector('.loadingScreen-starting')
                landing.classList.add('loadingScreen--active')
                landing.querySelector('.loadingScreen-starting__form').addEventListener('submit', (event) => {
                    event.preventDefault()
                    landing.classList.remove('loadingScreen--active')
                    this.pseudo = landing.querySelector('#register-form-pseudo').value
                    this.trigger('pseudo-entered')
                    this.destroy()
                })
            }
        }
    }

    showInput()
    {
        if (this.debug.active) {
            this.steps.starting()
        } else {
            this.steps.landing()
        }
    }

    destroy() {
        this.steps = null
    }
}