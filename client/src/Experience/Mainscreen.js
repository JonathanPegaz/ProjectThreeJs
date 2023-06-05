import EventEmitter from "./Utils/EventEmitter.js";
import Experience from "./Experience.js";

export default class Mainscreen extends EventEmitter{
    constructor() {
        super()
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.pseudo = null
        this.loadingScreen = document.querySelector('#loadingScreen')
        this.steps = {
            landing: () => {
                const element = document.querySelector('.loadingScreen-landing')
                element.classList.add('loadingScreen--active')
                element.querySelector('.loadingScreen-landing__button-login').addEventListener('click', () => {
                    element.classList.remove('loadingScreen--active')
                    //this.steps.login()
                    this.steps.starting()
                })
                element.querySelector('.loadingScreen-register__button-register').addEventListener('click', () => {
                    element.classList.remove('loadingScreen--active')
                    this.steps.registration()
                })
            },
            login: () => {
                const element = document.querySelector('.loadingScreen-login')
                element.classList.add('loadingScreen--active')
                this.experience.alert.type.SYSTEM('Vous êtes maintenant connecté.', 4000, 'check_icon')
            },
            registration: () => {
                const element = document.querySelector('.loadingScreen-registration')
                element.classList.add('loadingScreen--active')
                element.querySelector('.loadingScreen-registration-return').addEventListener('click', () => {
                    element.classList.remove('loadingScreen--active')
                    this.steps.landing()
                })
                element.querySelector('.loadingScreen-registration__form').addEventListener('submit', (event) => {
                    event.preventDefault()
                    element.classList.remove('loadingScreen--active')
                    this.steps.starting()
                    this.experience.alert.addQueue(this.experience.alert.type.SYSTEM,
                      'félicitations ! votre compte a bien été créé.',
                      4000,
                      'check_icon'
                    )
                })
            },
            starting: () => {
                const element = document.querySelector('.loadingScreen-starting')
                element.classList.add('loadingScreen--active')
                element.querySelector('.loadingScreen-starting__form').addEventListener('submit', (event) => {
                    event.preventDefault()
                    element.classList.remove('loadingScreen--active')
                    this.pseudo = element.querySelector('#register-form-pseudo').value
                    this.trigger('pseudo-entered')
                    let elements = document.querySelectorAll('.loading-hidden');
                    for (let i = 0; i < elements.length; i++) {
                        elements[i].classList.remove('loading-hidden');
                    }
                    this.experience.alert.type.SYSTEM('Bienvenue initié !', 4000, 'tchat_icon')
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
        this.pseudo = null
        if (this.loadingScreen !== null) {
            this.loadingScreen.remove()
            this.loadingScreen = null
        }
    }
}