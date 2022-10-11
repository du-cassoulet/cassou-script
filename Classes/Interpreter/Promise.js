import Value from "./Value.js";

class Promise extends Value {
	constructor(value, id) {
		super();
		this.value = value;
		this.id = id;
	}

	copy() {
		let copy = new Promise(this.value, this.id);
		copy.setPos(this.posStart, this.posEnd);
		copy.setContext(this.context);
		return copy;
	}

	toString() {
		return `Promise ${"<pending>".cyan}`;
	}
}

export default Promise;
