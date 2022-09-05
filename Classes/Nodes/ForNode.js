class ForNode {
  constructor(varNameTok, startValueNode, endValueNode, stepValueNode, bodyNode, shouldReturnNull) {
    this.varNameTok = varNameTok;
    this.startValueNode = startValueNode;
    this.endValueNode = endValueNode;
    this.stepValueNode = stepValueNode;
    this.bodyNode = bodyNode;
    this.shouldReturnNull = shouldReturnNull;

    this.posStart = this.varNameTok.posStart;
    this.posEnd = this.bodyNode.posEnd;
  }
}

export default ForNode;