class VarReAssignNode {
	constructor(varNameTok, varPathTok, newValueNode) {
		this.varNameTok = varNameTok;
		this.varPathTok = varPathTok;
		this.newValueNode = newValueNode;

		this.posStart = this.varNameTok.posStart;
		this.posEnd = this.newValueNode.posEnd;
	}
}

export default VarReAssignNode;
