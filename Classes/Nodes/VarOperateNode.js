class VarOperateNode {
	constructor(varNameTok, varPathTok, operatorTok, newValueNode) {
		this.varNameTok = varNameTok;
		this.varPathTok = varPathTok;
		this.operatorTok = operatorTok;
		this.newValueNode = newValueNode;

		this.posStart = this.varNameTok.posStart;
		this.posEnd = this.newValueNode.posEnd;
	}
}

export default VarOperateNode;
