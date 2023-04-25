export default class PoolManager {
    constructor(createObjectFn, objectLimit = 100) {
      this.createObjectFn = createObjectFn;
      this.objectLimit = objectLimit;
      this.pool = [];
    }
  
    getObject() {
      let object = this.pool.pop();
      if (!object) {
        if (this.pool.length >= this.objectLimit) {
          // Pool is full, can't create a new object
          console.warn('PoolManager: maximum object limit reached.');
          return null;
        }
        object = this.createObjectFn();
      }
      object.visible = true;
      return object;
    }
  
    releaseObject(object) {
      object.visible = false;
      this.pool.push(object);
    }
}