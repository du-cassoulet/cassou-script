class VarAccessNode {
  constructor(varNameTok, varPathTok) {
    this.varNameTok = varNameTok;
    this.varPathTok = varPathTok;

    this.posStart = this.varNameTok.posStart;
    this.posEnd = this.varPathTok.posEnd;
  }
}

export default VarAccessNode;