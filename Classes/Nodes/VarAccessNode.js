class VarAccessNode {
  constructor(varNameTok) {
    this.varNameTok = varNameTok;

    this.posStart = this.varNameTok.posStart;
    this.posEnd = this.varNameTok.posEnd;
  }
}

export default VarAccessNode;