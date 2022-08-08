import Interpreter from "../Interpreter.js";
import RTResult from "../RTResult.js";
import BaseFunction from "./BaseFunction.js";
import Number from "./Number.js";

class Function extends BaseFunction {
  constructor(name, bodyNode, argNames, shouldAutoReturn) {
    super(name);
    this.bodyNode = bodyNode;
    this.argNames = argNames;
    this.shouldAutoReturn = shouldAutoReturn;
  }

  execute(args) {
    let res = new RTResult();
    let interpreter = new Interpreter();
    let execCtx = this.generateNewContext();

    res.register(this.checkAndPopulateArgs(this.argNames, args, execCtx));
    if (res.shouldReturn()) return res;

    let value = res.register(interpreter.visit(this.bodyNode, execCtx));
    if (res.shouldReturn() && res.funcReturnValue === null) return res;

    let retValue = (this.shouldAutoReturn ? value: null) || res.funcReturnValue || Number.null;
    return res.success(retValue);
  }

  copy() {
    let copy = new Function(this.name, this.bodyNode, this.argNames, this.shouldAutoReturn);
    copy.setContext(this.context);
    copy.setPos(this.posStart, this.posEnd);
    return copy;
  }

  toString() {
    return `<function ${this.name}>`;
  }
}

export default Function;