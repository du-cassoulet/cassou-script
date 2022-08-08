import Number from "./Number.js";
import Value from "./Value.js";
import List from "./List.js";

class String extends Value {
  constructor(value) {
    super();
    this.value = value;
  }

  addedTo(other) {
    if (other instanceof String) {
      return [new String(this.value + other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.addedTo, other)];
    }
  }

  multedBy(other) {
    if (other instanceof Number) {
      return [new String(this.value.repeat(other.value)).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.addedTo, other)];
    }
  }

  getComparisonEq(other) {
    if (other instanceof String) {
      return [new Number(+(this.value === other.value)).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.addedTo, other)];
    }
  }

  isIn(other) {
    if (other instanceof List) {
      let includes = !!other.elements.find((e) =>
        this.constructor.name === e.constructor.name &&
        this.value === e.value
      )
      return [new Number(+includes), null];
    } else if (other instanceof String) {
      return [new Number(+(other.value.includes(this.value))), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  isTrue() {
    return length(this.value) > 0;
  }

  copy() {
    let copy = new String(this.value);
    copy.setPos(this.posStart, this.posEnd);
    copy.setContext(this.context);
    return copy;
  }

  toString() {
    return this.value.toString();
  }
}

export default String;