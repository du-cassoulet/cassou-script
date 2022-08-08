import Errors from "../Errors.js";

class Value {
  constructor() {
    this.setPos();
    this.setContext();
  }

  setPos(posStart = null, posEnd = null) {
    this.posStart = posStart;
    this.posEnd = posEnd;
    return this;
  }

  setContext(context) {
    this.context = context;
    return this;
  }

  addedTo(other) {
    return [null, this.illegalOperation(other)];
  }

  subbedBy(other) {
    return [null, this.illegalOperation(other)];
  }

  multedBy(other) {
    return [null, this.illegalOperation(other)];
  }

  divedBy(other) {
    return [null, this.illegalOperation(other)];
  }

  powedBy(other) {
    return [null, this.illegalOperation(other)];
  }

  moduledBy(other) {
    return [null, this.illegalOperation(other)];
  }

  getComparisonEq(other) {
    return [null, this.illegalOperation(other)];
  }

  getComparisonNe(other) {
    return [null, this.illegalOperation(other)];
  }

  getComparisonLt(other) {
    return [null, this.illegalOperation(other)];
  }

  getComparisonGt(other) {
    return [null, this.illegalOperation(other)];
  }

  getComparisonLte(other) {
    return [null, this.illegalOperation(other)];
  }

  getComparisonGte(other) {
    return [null, this.illegalOperation(other)];
  }

  andedBy(other) {
    return [null, this.illegalOperation(other)];
  }

  oredBy(other) {
    return [null, this.illegalOperation(other)];
  }

  notted() {
    return [null, this.illegalOperation()];
  }

  execute() {
    return [null, this.illegalOperation()];
  }

  isIn(other) {
    return [null, this.illegalOperation(other)];
  }

  getIn(other) {
    return [null, this.illegalOperation(other)];
  }

  copy() {
    throw new Error("No copy method defined");
  }

  isTrue() {
    return false;
  }

  illegalOperation(other = null) {
    if (!other) other = this;
    return new Errors.InvalidSyntaxError(
      this.posStart, this.posEnd,
      "Illegal operation",
      this.context
    );
  }
}

export default Value;