class SwitchNode {
  constructor(switchTok, cases, defaultNode) {
    this.switchTok = switchTok;
    this.cases = cases;
    this.defaultNode = defaultNode;

    this.posStart = this.switchTok.posStart;
    this.posEnd = this.switchTok.posEnd;
  }
}

export default SwitchNode;