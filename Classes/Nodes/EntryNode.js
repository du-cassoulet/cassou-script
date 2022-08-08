class EntryNode {
  constructor(keyTok, valueNode) {
    this.keyTok = keyTok;
    this.valueNode = valueNode;

    this.posStart = this.keyTok.posStart;
    this.posEnd = this.valueNode.posEnd;
  }
}

export default EntryNode;