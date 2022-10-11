class Token {
	constructor(_type, value = null, posStart = null, posEnd = null) {
		this.type = _type;
		this.value = value;

		if (posStart !== null) {
			this.posStart = posStart.copy();
			this.posEnd = posStart.copy();
			this.posEnd.advance();
		}

		if (posEnd !== null) {
			this.posEnd = posEnd;
		}
	}

	matches(_type, value) {
		return this.type === _type && this.value === value;
	}

	toString() {
		if (this.value) {
			return `${this.type}:${this.value}`;
		}
		return `${this.type}`;
	}
}

export default Token;
