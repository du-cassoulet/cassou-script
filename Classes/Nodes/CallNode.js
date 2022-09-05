class CallNode {
  constructor(nodeToCall, argNodes) {
    this.nodeToCall = nodeToCall;
    this.argNodes = argNodes;

    this.posStart = this.nodeToCall.posStart;

    if (argNodes.length > 0) {
      this.posEnd = this.argNodes[this.argNodes.length - 1].posEnd;
    } else {
      this.posEnd = this.nodeToCall.posEnd;
    }
  }
}

export default CallNode;