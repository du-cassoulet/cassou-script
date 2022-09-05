import Value from "./Value.js";

class Boolean extends Value {
  constructor(value) {
    super();
    this.value = value;
  }

  getComparisonEq(other) {
    if (other instanceof Boolean) {
      return [new Boolean(this.value === other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  getComparisonNe(other) {
    if (other instanceof Boolean) {
      return [new Boolean(this.value !== other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  getComparisonLt(other) {
    if (other instanceof Boolean) {
      return [new Boolean(this.value < other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  getComparisonGt(other) {
    if (other instanceof Boolean) {
      return [new Boolean(this.value > other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  getComparisonLte(other) {
    if (other instanceof Boolean) {
      return [new Boolean(this.value <= other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  getComparisonGte(other) {
    if (other instanceof Boolean) {
      return [new Boolean(this.value >= other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  andedBy(other) {
    if (other instanceof Boolean) {
      return [new Boolean(this.value && other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  oredBy(other) {
    if (other instanceof Boolean) {
      return [new Boolean(this.value || other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  notted() {
    return [new Boolean(!this.value).setContext(this.context), null];
  }

  copy() {
    let copy = new Boolean(this.value);
    copy.setPos(this.posStart, this.posEnd);
    copy.setContext(this.context);
    return copy;
  }

  isTrue() {
    return this.value;
  }

  toString() {
    return this.value.toString().yellow;
  }
}

export default Boolean;