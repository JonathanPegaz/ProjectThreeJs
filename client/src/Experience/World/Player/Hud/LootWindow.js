import Experience from "../../../Experience.js";
import EventEmitter from "../../../Utils/EventEmitter.js";

export default class LootWindow extends EventEmitter{
  constructor() {
    super();
    this.experience = new Experience()

    this.interface = document.querySelector('#loot')

    this.init()
  }

  async init() {
    this.lootList = document.createElement('ul')
    this.lootList.classList.add('loot-list')
    this.interface.appendChild(this.lootList)

    await this.wait(() => this.experience.world !== undefined).then(() => {
      this.experience.world.collectZone.list.forEach((collectZone) => {
        collectZone.on(`collect-${collectZone.id}`, (loot) => {
          this.display(loot)
        })
      })
    })
  }

  display(loot) {
    return new Promise((resolve) => {
      const li = document.createElement('li');
      li.classList.add('loot-item');
      if (loot === 'diamond' || loot === 'mushroom' || loot === 'carrot' || loot === 'apple') {
        li.innerHTML = `<img src="icons/items/${loot}.png" alt="${loot}"><span> +1</span>`
      } else {
        li.innerHTML = `<span>Unknown +1</span>`
      }
      this.lootList.appendChild(li)

      setTimeout(() => {
        li.classList.add('active');
      }, 10);

      setTimeout(() => {
        li.classList.remove('active');
        setTimeout(() => {
          this.lootList.removeChild(li);
          resolve(true);
        }, 500);
      }, 5000);
    });
  }


  destroy() {
    this.interface = null
  }

  wait(callback) {
    return new Promise((resolve) => {
      const check = () => {
        const value = callback();
        if (value) {
          resolve(value);
        } else {
          setTimeout(check, 0);
        }
      };
      check();
    });
  }
}