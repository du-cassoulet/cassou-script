class BinOpNode {
	constructor(leftNode, opTok, rightNode) {
		this.leftNode = leftNode;
		this.opTok = opTok;
		this.rightNode = rightNode;

		this.posStart = this.leftNode.posStart;
		this.posEnd = this.rightNode.posEnd;
	}

	toString() {
		return `(${this.leftNode}, ${this.opTok}, ${this.rightNode})`;
	}
}

export default BinOpNode;
