import Experience from "../Experience.js";

export default class HTMLAnnouncement {
  constructor() {
    this.experience = new Experience();

    this.interface = null;
    this.duration = null;
    this.waitingQueue = [];
    this.waitingQueueActive = false;
    this.type = null;
    this.queueTimeout = null;

    this.init();
  }

  init() {
    this.interface = document.querySelector('.announcement');
    this.duration = 2000;
    this.type = {
      AREA: (message, duration) => this.area(message, duration),
      SYSTEM: (message, duration, icon) => this.system(message, duration, icon),
      QUEST: (message, duration, icon) => this.quest(message, duration, icon),
    };
  }

  area(message, duration) {
    return new Promise((resolve) => {
      const areaInterface = this.interface.querySelector('.announcement-area')
      areaInterface.innerHTML = '<h1 class="announcement-content-h1">' + message + '</h1>';
      areaInterface.classList.toggle('announcement-active');
      setTimeout(() => {
        areaInterface.classList.toggle('announcement-active');
        areaInterface.innerHTML = '';
        resolve(true);
      }, duration);
    });
  }

  system(message, duration, icon = null) {
    return new Promise((resolve) => {
      const areaInterface = this.interface.querySelector('.announcement-system')

      const img = icon ? `<img src="icons/${icon}.svg" alt="icon">` : ''
      areaInterface.innerHTML = `
        <div class="announcement-alert__content">
            ${img}
            <p class="announcement-alert__message">${message}</p>
        </div>
      `;

      areaInterface.classList.toggle('announcement-active');
      setTimeout(() => {
        areaInterface.classList.toggle('announcement-active');
        areaInterface.innerHTML = '';
        resolve(true);
      }, duration);
    });
  }

  quest(message, duration, icon = null) {
    return new Promise((resolve) => {
      const areaInterface = this.interface.querySelector('.announcement-quest')
      const img = icon ? `<img src="icons/${icon}.svg" alt="icon">` : ''
      areaInterface.innerHTML = `
        <div class="announcement-alert__content">
            ${img}
            <p class="announcement-alert__message">${message}</p>
        </div>
      `;
      areaInterface.classList.add('announcement-active');
      setTimeout(() => {
        areaInterface.classList.remove('announcement-active');
        areaInterface.innerHTML = '';
        resolve(true);
      }, duration);
    });
  }

  async addQueue(type = this.type.AREA, message, duration = this.duration) {
    this.waitingQueue.push({
      type: type,
      message: message,
      duration: duration,
    });
    if (!this.waitingQueueActive) {
      this.processQueue();
    }
  }

  async processQueue() {
    if (this.waitingQueue.length === 0) {
      this.waitingQueueActive = false;
      return;
    }

    this.waitingQueueActive = true;

    const item = this.waitingQueue[0];
    const { type, message, duration } = item;

    await type(message, duration);

    this.waitingQueue.shift();

    this.queueTimeout = setTimeout(() => {
      this.processQueue();
    }, 0);
  }

  clearQueue() {
    this.waitingQueueActive = false;
    clearTimeout(this.queueTimeout);
    this.waitingQueue = [];
  }

  destroy() {
    this.interface = null;
    this.duration = null;
    this.waitingQueue = [];
    this.waitingQueueActive = null;
    this.type = null;
    clearTimeout(this.queueTimeout);
  }
}
