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
      ALERT: (message, duration) => this.alert(message, duration),
      KILL: (message, duration) => this.kill(message, duration),
      QUEST: (message, duration) => this.quest(message, duration),
    };
  }

  area(message, duration) {
    return new Promise((resolve) => {
      const areaInterface = this.interface.querySelector('.announcement-area')
      areaInterface.innerHTML = '<h1 class="announcement-content-h1">' + message + '</h1>';
      areaInterface.classList.add('announcement-active');
      setTimeout(() => {
        this.interface.classList.remove('announcement-active');
        this.interface.querySelector('.announcement-area').innerHTML = '';
        resolve(true);
      }, duration);
    });
  }

  alert(message, duration) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, duration);
    });
  }

  kill(message, duration) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, duration);
    });
  }

  quest(message, duration) {
    return new Promise((resolve) => {
      const areaInterface = this.interface.querySelector('.announcement-quest')
      areaInterface.innerHTML = '<h1 class="announcement-content-h1">' + message + '</h1>';
      areaInterface.classList.add('announcement-active');
      setTimeout(() => {
        this.interface.classList.remove('announcement-active');
        this.interface.querySelector('.announcement-quest').innerHTML = '';
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
    clearTimeout(this.queueTimeout);
  }
}
