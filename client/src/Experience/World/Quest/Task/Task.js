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

    this.extraFunction = {
      moveNPC: (id, x, y, z) => {
        this.experience.npc.list[id].moveToPosition(new Vector3(x, y, z))
      },
      setNight: () => {
        this.experience.world.environment.setNight()
      },
      setParty: () => {
        this.experience.world.environment.setParty()
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