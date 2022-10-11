class VarAssignNode {
	constructor(varNameTok, valueNode) {
		this.varNameTok = varNameTok;
		this.valueNode = valueNode;

		this.posStart = this.varNameTok.posStart;
		this.posEnd = this.valueNode.posEnd;
	}
}

export default VarAssignNode;
