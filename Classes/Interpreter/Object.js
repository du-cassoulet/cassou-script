import List from "./List.js";
import Value from "./Value.js";

class Object extends Value {
  constructor(elements) {
    super();
    this.elements = elements;
  }

  copy() {
    let copy = new Object([ ...this.elements ]);
    copy.setPos(this.posStart, this.posEnd);
    copy.setContext(this.context);
    return copy;
  }

	addedTo(other) {
		if (other instanceof Object) {
			return [new Object([...this.elements, ...other.elements]), null];
		} else {
			return [null, this.illegalOperation(this.posStart, this.posEnd)];
		}
	}

  toString(tabNum = 0) {
    let tab = "";
    for (let i = 0; i < tabNum; i++) tab += " ";
    return "{".gray + "\n" + this.elements.map((e) => {
      return "  " + tab + e.elements[0].toString() + ": ".gray + e.elements[1].toString(tabNum + 2);
    }).join(",\n") + "\n" + tab + "}".gray;
  }
}

export default Object;