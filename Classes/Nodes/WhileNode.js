class WhileNode {
	constructor(conditionNode, bodyNode, shouldReturnNull) {
		this.conditionNode = conditionNode;
		this.bodyNode = bodyNode;
		this.shouldReturnNull = shouldReturnNull;

		this.posStart = this.conditionNode.posStart;
		this.posEnd = this.bodyNode.posEnd;
	}
}

export default WhileNode;
