
class PreboundObject {
  constructor() {
    for (const key in this) {
      if (this.hasOwnProperty(key) && this[key] instanceof Function) {
        this[key] = this[key].bind(this);
      }
    }
  }
}

export default PreboundObject;