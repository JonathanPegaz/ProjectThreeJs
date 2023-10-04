import EventEmitter from "../../../Utils/EventEmitter.js";
import Experience from "../../../Experience.js";
import { v4 as uuidv4 } from 'uuid';
import {Vector3} from "three";


export default class Task extends EventEmitter{
  constructor() {
    super();
    this.experience = new Experience()
    this.world = this.experience.world

    this.id = null
    this.name = null
    this.description = null
    this.type = null
    this.requirements = null
    this.order = null
    this.active = null
    this.extra = null
    const transition = document.getElementById('transition')
    const transitionH1 = document.getElementById('transition-h1')
    const transitionInput = document.getElementById('transition-input')
    this.extraFunction = {
      moveNPC: (id, x, y, z, transitionActive = false) => {
        if (!transitionActive) {
          this.experience.npc.list[id].moveToPosition(new Vector3(x, y, z))
          return
        }
        transition.classList.add("transition-active")
        window.setTimeout(() => {
          this.experience.npc.list[id].moveToPosition(new Vector3(x, y, z))
          transition.classList.remove("transition-active")
        }, 1000)
      },
      setNight: () => {
        transitionH1.innerHTML = ["Quelques heures plus tard...", "A few hours later..."][this.experience.locale]
        transition.classList.add("transition-active")
        this.experience.world.environment.setNight()
        window.setTimeout(() => {
          transition.classList.remove("transition-active")
          transitionH1.innerHTML = ""
        }, 3000)
      },
      setParty: () => {
        transition.classList.add("transition-active")
        this.experience.world.environment.setParty()
        window.setTimeout(() => {
          transition.classList.remove("transition-active")
        }, 3000)
      },
      endGame: () => {
        transitionInput.style.display = "flex"
        transitionH1.innerHTML = ["Merci d'avoir joué, La suite arrive bientôt !", "Thanks for playing, the rest is coming soon!"][this.experience.locale]
        transition.classList.add("transition-active")
        transition.style.pointerEvents = "initial"
        document.getElementById('btn-freeNav').addEventListener('click', () => {
          transition.classList.remove("transition-active")
          transition.style.pointerEvents = "none"
          transitionH1.innerHTML = ""
          transitionInput.style.display = "none"
          document.getElementById('btn-freeNav').removeEventListener('click', () => {})
        })
      }
    }
  }

  init(param) {
    this.id = uuidv4()

    this.name = param.name
    this.description = param.description
    this.type = this.constructor.name
    this.order = param.order !== undefined ? param.order : 0
    this.active = false
    if (param.extra !== undefined)
      this.extra = param.extra
  }

  catch() {
    throw new Error("You have to implement the method catch!");
  }

  isComplete() {
    if (this.extra !== null)
      this.callExtra()

    this.trigger("completed")
  }

  callExtra() {
    Object.entries(this.extra).forEach(([key, value]) => {
      const functionName = value.functionName;
      const params = value.params;
      this.extraFunction[functionName](...params);
    });
  }

  setActive() {
    this.active = true
  }

  destroy() {
    this.id = null
    this.name = null
    this.description = null
    this.type = null
    this.requirements = null
    this.world = null
    this.order = null
    this.extra = null
    this.extraFunction = null
  }
}