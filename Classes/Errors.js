class Error {
  constructor(posStart, posEnd, errorName, details) {
    this.posStart = posStart;
    this.posEnd = posEnd;
    this.errorName = errorName;
    this.details = details;
  }

  asString() {
    let result = `${this.errorName}: ${this.details}\nFile ${this.posStart.fn}, line ${this.posStart.ln + 1}`;
    return result;
  }
}

class IllegalCharError extends Error {
  constructor(posStart, posEnd, details) {
    super(posStart, posEnd, "Illegal Character", details);
  }
}

class InvalidSyntaxError extends Error {
  constructor(posStart, posEnd, details) {
    super(posStart, posEnd, "Invalid Syntax", details);
  }
}

class ExpectedCharError extends Error {
  constructor(posStart, posEnd, details) {
    super(posStart, posEnd, "Expected Character", details);
  }
}

class TypingError extends Error {
  constructor(posStart, posEnd, details) {
    super(posStart, posEnd, "Typing Error", details);
  }
}

class RTError extends Error {
  constructor(posStart, posEnd, details, context) {
    super(posStart, posEnd, "Runtime Error", details);
    this.context = context;
  }

  asString() {
    let result = `${this.generateTraceback()}${this.errorName}: ${this.details}\nFile ${this.posStart.fn}, line ${this.posStart.ln + 1}`;
    return result;
  }

  generateTraceback() {
    let result = "";
    let pos = this.posStart;
    let ctx = this.context;

    while (ctx) {
      result += `  ${this.errorName}: ${this.details}, in ${ctx.displayName}\n  ` + result;
      pos = ctx.parentEntryPos;
      ctx = ctx.parent;
    }

    return "Traceback (most recent call last):\n" + result;
  }
}

export default {
  IllegalCharError,
  InvalidSyntaxError,
  RTError,
  ExpectedCharError,
  TypingError
}