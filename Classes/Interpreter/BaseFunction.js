import Context from "../Context.js";
import RTResult from "../RTResult.js";
import SymbolTable from "../SymbolTable.js";
import Value from "./Value.js";
import Errors from "../Errors.js";

class BaseFunction extends Value {
  constructor(name) {
    super();
    this.name = name || "anonymous";
  }

  generateNewContext() {
    let newContext = new Context(this.name, this.context, this.posStart);
    newContext.symbolTable = new SymbolTable(newContext.parent.symbolTable);
    return newContext;
  }

  checkArgs(argNames, args) {
    let res = new RTResult();
    if (args.length > argNames.length) {
      return res.failure(new Errors.RTError(
        this.posStart, this.posEnd,
        `${args.length - argNames.length} too many args passed into '${this.name}'`,
        this.context
      ));
    }

    if (args.length < argNames.length) {
      return res.failure(new Errors.RTError(
        this.posStart, this.posEnd,
        `${argNames.length - args.length} too few args passed into '${this.name}'`,
        this.context
      ));
    }

    return res.success(null);
  }

  populateArgs(argNames, args, execCtx) {
    for (const i in args) {
      let argName = argNames[i];
      let argValue = args[i];
      argValue.setContext(execCtx);
      execCtx.symbolTable.set(argName, argValue);
    }
  }

  checkAndPopulateArgs(argNames, args, execCtx) {
    let res = new RTResult();
    res.register(this.checkArgs(argNames, args));
    if (res.shouldReturn()) return res;

    this.populateArgs(argNames, args, execCtx);
    return res.success(null);
  }
}

export default BaseFunction;