class UnaryOpNode {
	constructor(opTok, node) {
		this.opTok = opTok;
		this.node = node;

		this.posStart = this.opTok.posStart;
		this.posEnd = node.posEnd;
	}

	toString() {
		return `(${this.opTok}, ${this.node})`;
	}
}

export default UnaryOpNode;
