class ForOfNode {
  constructor(varNameTok, listNode, bodyNode, shouldReturnNull) {
    this.varNameTok = varNameTok;
    this.listNode = listNode;
    this.bodyNode = bodyNode;
    this.shouldReturnNull = shouldReturnNull;

    this.posStart = this.varNameTok.posStart;
    this.posEnd = this.bodyNode.posEnd;
  }
}

export default ForOfNode;