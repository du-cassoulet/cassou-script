class VarOperateNode {
  constructor(varNameTok, operatorTok, newValueNode) {
    this.varNameTok = varNameTok;
    this.operatorTok = operatorTok;
    this.newValueNode = newValueNode;

    this.posStart = this.varNameTok.posStart;
    this.posEnd = this.newValueNode.posEnd;
  }
}

export default VarOperateNode;