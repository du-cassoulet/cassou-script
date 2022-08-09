import Value from "./Value.js";

class Object extends Value {
  constructor(elements) {
    super();
    this.elements = elements;
  }

  copy() {
    let copy = new Object([...this.elements]);
    copy.setPos(this.posStart, this.posEnd);
    copy.setContext(this.context);
    return copy;
  }

  toString() {
    if (this.elements.length === 0) return "{}";
    let obj = {}
    this.elements.forEach((e) => {
      obj[e.elements[0]] = e.elements[1].toString();
    });

    return obj;
  }
}

export default Object;