import Errors from "../Errors.js";
import Value from "./Value.js";
import List from "./List.js";
import Boolean from "./Boolean.js";

class Number extends Value {
  static pi = new Number(Math.PI);

  constructor(value) {
    super();
    this.value = value;
  }

  addedTo(other) {
    if (other instanceof Number) {
      return [new Number(this.value + other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  subbedBy(other) {
    if (other instanceof Number) {
      return [new Number(this.value - other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  multedBy(other) {
    if (other instanceof Number) {
      return [new Number(this.value * other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  divedBy(other) {
    if (other instanceof Number) {
      if (other.value === 0) {
        return [null, new Errors.RTError(
          other.posStart, other.posEnd,
          "Division by zero"
        )]
      }

      return [new Number(this.value / other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  powedBy(other) {
    if (other instanceof Number) {
      return [new Number(this.value ** other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  moduledBy(other) {
    return [new Number(this.value % other.value).setContext(this.context), null];
  }

  getComparisonEq(other) {
    if (other instanceof Number) {
      return [new Boolean(this.value === other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  getComparisonNe(other) {
    if (other instanceof Number) {
      return [new Boolean(this.value !== other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  getComparisonLt(other) {
    if (other instanceof Number) {
      return [new Boolean(this.value < other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  getComparisonGt(other) {
    if (other instanceof Number) {
      return [new Boolean(this.value > other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  getComparisonLte(other) {
    if (other instanceof Number) {
      return [new Boolean(this.value <= other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  getComparisonGte(other) {
    if (other instanceof Number) {
      return [new Boolean(this.value >= other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  andedBy(other) {
    if (other instanceof Number) {
      return [new Boolean(this.value && other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  oredBy(other) {
    if (other instanceof Number) {
      return [new Number(this.value || other.value).setContext(this.context), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  notted() {
    return [new Boolean(!this.value).setContext(this.context), null];
  }

  isIn(other) {
    if (other instanceof List) {
      let includes = !!other.elements.find((e) =>
        this.constructor.name === e.constructor.name &&
        this.value === e.value
      )
      return [new Boolean(includes), null];
    } else {
      return [null, this.illegalOperation(this.posStart, this.posEnd)]
    }
  }

  copy() {
    let copy = new Number(this.value);
    copy.setPos(this.posStart, this.posEnd);
    copy.setContext(this.context);
    return copy;
  }

  isTrue() {
    return this.value !== 0;
  }

  toString() {
    return this.value.toString().yellow;
  }
}

export default Number;