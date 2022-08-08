import PromptSync from "prompt-sync";
import fs from "fs";
import { getattr } from "../../utils.js";
import Errors from "../Errors.js";
import RTResult from "../RTResult.js";
import BaseFunction from "./BaseFunction.js";
import Number from "./Number.js";
import String from "./String.js";
import List from "./List.js";
import { run } from "../../index.js";

const prompt = PromptSync({ sigint: true });

class BuiltInFunction extends BaseFunction {
  static log = new BuiltInFunction("log");
  static ask = new BuiltInFunction("ask");
  static clear = new BuiltInFunction("clear");
  static run = new BuiltInFunction("run");
  static random = new BuiltInFunction("random");
  static round = new BuiltInFunction("round");
  static floor = new BuiltInFunction("floor");
  static ceil = new BuiltInFunction("ceil");
  static join = new BuiltInFunction("join");

  constructor(name) {
    super(name);
    this.args_log = ["value"];
    this.args_ask = ["value"];
    this.args_clear = [];
    this.args_run = ["fn"];
    this.args_random = [];
    this.args_round = ["value"];
    this.args_floor = ["value"];
    this.args_ceil = ["value"];
    this.args_join = ["join", "array"];
  }

  execute(args) {
    let res = new RTResult();
    let execCtx = this.generateNewContext();

    let methodName = `execute_${this.name}`;
    let methodArgs = `args_${this.name}`;
    let method = getattr(this, methodName, this.noVisitMethod);

    res.register(this.checkAndPopulateArgs(this[methodArgs], args, execCtx));
    if (res.shouldReturn()) return res;

    let returnValue = res.register(method(execCtx));
    if (res.shouldReturn()) return res;
    return res.success(returnValue);
  }

  noVisitMethod() {
    throw new Error(`No execute_${this.name} method defined`);
  }

  copy() {
    let copy = new BuiltInFunction(this.name);
    copy.setContext(this.context);
    copy.setPos(this.posStart, this.posEnd);
    return copy;
  }

  toString() {
    return `<built-in function ${this.name}>`;
  }

  execute_log(execCtx) {
    console.log(execCtx.symbolTable.get("value").toString());
    return new RTResult().success(Number.null);
  }

  execute_ask(execCtx) {
    const value = execCtx.symbolTable.get("value");

    if (value instanceof String) {
      const input = prompt(value.value);
      return new RTResult().success(new String(input));
    } else {
      return new RTResult().failure(new Errors.TypingError(
        value.posStart, value.posEnd,
        "Ask value should be a string"
      ));
    };
  }

  execute_clear() {
    console.clear();
    return new RTResult().success(Number.null);
  }

  execute_random() {
    return new RTResult().success(new Number(Math.random()));
  }

  execute_round(execCtx) {
    const value = execCtx.symbolTable.get("value");

    if (value instanceof Number) {
      return new RTResult().success(new Number(Math.round(value)));
    } else {
      return new RTResult().failure(new Errors.TypingError(
        value.posStart, value.posEnd,
        "Ask value should be a number"
      ));
    };
  }

  execute_floor(execCtx) {
    const value = execCtx.symbolTable.get("value");

    if (value instanceof Number) {
      return new RTResult().success(new Number(Math.floor(value)));
    } else {
      return new RTResult().failure(new Errors.TypingError(
        value.posStart, value.posEnd,
        "Ask value should be a number"
      ));
    };
  }

  execute_ceil(execCtx) {
    const value = execCtx.symbolTable.get("value");

    if (value instanceof Number) {
      return new RTResult().success(new Number(Math.ceil(value)));
    } else {
      return new RTResult().failure(new Errors.TypingError(
        value.posStart, value.posEnd,
        "Ask value should be a number"
      ));
    };
  }

  execute_run(execCtx) {
    let fn = execCtx.symbolTable.get("fn");

    if (!(fn instanceof String)) {
      return new RTResult().failure(new Errors.RTError(
        this.posStart, this.posEnd,
        "Argument must be a string",
        execCtx
      ));
    }

    fn = fn.value;
    try {
      const script = fs.readFileSync(fn, "utf-8");
      let [_, error] = run(fn, script.replace(/\r/g, ""));

      if (error) {
        return new RTResult().failure(new Errors.RTError(
          this.posStart, this.posEnd,
          `Failed to load script "${fn}"\n${error.asString()}`,
          execCtx
        ));
      }
    } catch(e) {
      return new RTResult().failure(new Errors.RTError(
        this.posStart, this.posEnd,
        `Failed to load script "${fn}"\n${e}`,
        execCtx
      ));
    }

    return new RTResult().success(Number.null);
  }

  execute_join(execCtx) {
    let join = execCtx.symbolTable.get("join");
    let array = execCtx.symbolTable.get("array");

    if (!(join instanceof String)) {
      return new RTResult().failure(new Errors.RTError(
        this.posStart, this.posEnd,
        "Argument must be a string",
        execCtx
      ));
    }

    if (!(array instanceof List)) {
      return new RTResult().failure(new Errors.RTError(
        this.posStart, this.posEnd,
        "Argument must be a list",
        execCtx
      ));
    }

    return new RTResult().success(
      new String(array.elements.map((e) => e.toString()).join(join.value))
    );
  }
}

export default BuiltInFunction;