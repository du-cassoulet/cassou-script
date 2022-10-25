import Number from "./Number.js";
import Value from "./Value.js";
import List from "./List.js";
import Boolean from "./Boolean.js";

class String extends Value {
	constructor(value) {
		super();
		this.value = value;
	}

	addedTo(other) {
		if (other instanceof String) {
			return [
				new String(this.value + other.value).setContext(this.context),
				null,
			];
		} else if (other instanceof Number) {
			return [
				new String(this.value + other.value.toString()).setContext(
					this.context
				),
				null,
			];
		} else {
			return [null, this.illegalOperation(this.addedTo, other)];
		}
	}

	multedBy(other) {
		if (other instanceof Number) {
			return [
				new String(this.value.repeat(other.value)).setContext(this.context),
				null,
			];
		} else {
			return [null, this.illegalOperation(this.addedTo, other)];
		}
	}

	getComparisonEq(other) {
		if (other instanceof String) {
			return [
				new Boolean(this.value === other.value).setContext(this.context),
				null,
			];
		} else {
			return [null, this.illegalOperation(this.addedTo, other)];
		}
	}

	getComparisonNe(other) {
		if (other instanceof String) {
			return [
				new Boolean(this.value !== other.value).setContext(this.context),
				null,
			];
		} else {
			return [null, this.illegalOperation(this.addedTo, other)];
		}
	}

	isIn(other) {
		if (other instanceof List) {
			let includes = !!other.elements.find(
				(e) =>
					this.constructor.name === e.constructor.name && this.value === e.value
			);
			return [new Boolean(includes), null];
		} else if (other instanceof String) {
			return [new Boolean(other.value.includes(this.value)), null];
		} else {
			return [null, this.illegalOperation(this.posStart, this.posEnd)];
		}
	}

	isTrue() {
		return this.value.length > 0;
	}

	copy() {
		let copy = new String(this.value);
		copy.setPos(this.posStart, this.posEnd);
		copy.setContext(this.context);
		return copy;
	}

	toString(tabNum) {
		if (!tabNum) {
			return this.value.toString();
		} else {
			return `'${this.value}'`.green;
		}
	}
}

export default String;
