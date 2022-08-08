class VarReAssignNode {
  constructor(varNameTok, newValueNode) {
    this.varNameTok = varNameTok;
    this.newValueNode = newValueNode;

    this.posStart = this.varNameTok.posStart;
    this.posEnd = this.newValueNode.posEnd;
  }
}

export default VarReAssignNode;