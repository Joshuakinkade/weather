export default class Config {
  constructor() {
    this.storage = window.localStorage;
  }

  get(key) {
    return new Promise((resolve,reject) => {
      const data = this.storage.getItem(key);
      try {
        resolve(JSON.parse(data));
      } catch(err) {
        reject(err);
      }
    });
  }

  set(key,value) {
    return new Promise((resolve,reject) => {
      try {
        const data = JSON.stringify(value);
        this.storage.setItem(key,data);
        resolve();
      } catch(err) {
        reject(err);
      }
    });
  }
}