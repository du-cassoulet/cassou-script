class FuncDefNode {
	constructor(varNameTok, argNameToks, bodyNode, shouldAutoReturn) {
		this.varNameTok = varNameTok;
		this.argNameToks = argNameToks;
		this.bodyNode = bodyNode;
		this.shouldAutoReturn = shouldAutoReturn;

		if (this.varNameTok) {
			this.posStart = this.varNameTok.posStart;
		} else if (this.argNameToks.length > 0) {
			this.posStart = this.argNameToks[0].posStart;
		} else {
			this.posStart = this.bodyNode.posStart;
		}

		this.posEnd = this.bodyNode.posEnd;
	}
}

export default FuncDefNode;
