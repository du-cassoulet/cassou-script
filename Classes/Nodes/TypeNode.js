class TypeNode {
  constructor(nodeElement, typeTok) {
    this.nodeElement = nodeElement;
    this.typeTok = typeTok;

    if (this.nodeElement) {
      this.posStart = this.nodeElement.posStart;
      this.posEnd = this.nodeElement.posEnd;
    } else {
      this.posStart = this.typeTok.posStart;
      this.posEnd = this.typeTok.posEnd;
    }
  }

  toString() {
    return `${this.nodeElement}`;
  }
}

export default TypeNode;