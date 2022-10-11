class StringNode {
	constructor(tok) {
		this.tok = tok;

		this.posStart = this.tok.posStart;
		this.posEnd = this.tok.posEnd;
	}

	toString() {
		return `${this.tok}`;
	}
}

export default StringNode;
