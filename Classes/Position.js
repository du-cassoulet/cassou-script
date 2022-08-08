class Position {
  constructor(idx, ln, col, fn, ftxt) {
    this.idx = idx;
    this.ln = ln;
    this.col = col;
    this.fn = fn;
    this.ftxt = ftxt;
  }

  advance(currentChar = null) {
    ++this.idx;
    ++this.col;

    if (currentChar === "\n") {
      ++this.ln;
      this.col = 0;
    }

    return this;
  }

  copy() {
    return new Position(this.idx, this.ln, this.col, this.fn, this.ftxt);
  }
}

export default Position;