import Errors from "../Errors.js";
import Number from "./Number.js";
import Value from "./Value.js";

class List extends Value {
	constructor(elements) {
		super();
		this.elements = elements;
	}

	addedTo(other) {
		let newList = this.copy();
		newList.elements.push(other);
		return [newList, null];
	}

	subbedBy(other) {
		if (other instanceof Number) {
			let newList = this.copy();
			try {
				newList.elements.splice(other.value, 1);
				return [newList, null];
			} catch {
				return [
					null,
					new Errors.RTError(
						other.posStart,
						other.posEnd,
						"Element at this index could not be removed from list because index is out of bounds",
						this.context
					),
				];
			}
		} else {
			return [null, this.illegalOperation(this, other)];
		}
	}

	multedBy(other) {
		if (other instanceof List) {
			let newList = this.copy();
			newList.elements = [...newList.elements, ...other.elements];
			return [newList, null];
		} else if (other instanceof Number) {
			let newList = this.copy();
			let currentList = this.copy();

			if (other < 1) return [null, this.illegalOperation(this, other)];

			for (let i = 1; i < other; ++i) {
				newList.elements = [...newList.elements, ...currentList.elements];
			}
			return [newList, null];
		} else {
			return [null, this.illegalOperation(this, other)];
		}
	}

	copy() {
		let copy = new List([...this.elements]);
		copy.setPos(this.posStart, this.posEnd);
		copy.setContext(this.context);
		return copy;
	}

	toString(tabNum = 0) {
		let tab = "";
		for (let i = 0; i < tabNum; i++) tab += " ";
		return (
			"[".gray +
			"\n" +
			this.elements
				.map((e) => {
					return "  " + tab + e.toString(tabNum + 2);
				})
				.join(",\n") +
			"\n" +
			tab +
			"]".gray
		);
	}
}

export default List;
