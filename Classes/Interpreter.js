import { getattr } from "../utils.js";
import Flags from "../Constants/Flags.js";
import RTResult from "./RTResult.js";
import Errors from "./Errors.js";
import Number from "./Interpreter/Number.js";
import Function from "./Interpreter/Function.js";
import String from "./Interpreter/String.js";
import List from "./Interpreter/List.js";
import Object from "./Interpreter/Object.js";
import Boolean from "./Interpreter/Boolean.js";

class Interpreter {
  constructor() {}

  visit(node, context) {
    let methodName = `visit_${node.constructor.name}`;
    let method = getattr(this, methodName, this.noVisitMethod);
    return method(node, context);
  }

  noVisitMethod(node) {
    throw new Error(`No visit_${node.constructor.name} method defined`);
  }

  visit_BooleanNode(node, context) {
    let bool = false;
    if (node.tok.value === "true") bool = true;

    return new RTResult().success(
      new Boolean(bool).setContext(context).setPos(node.posStart, node.posEnd)
    );
  }

  visit_NumberNode(node, context) {
    return new RTResult().success(
      new Number(node.tok.value).setContext(context).setPos(node.posStart, node.posEnd)
    );
  }

  visit_ListNode(node, context) {
    let res = new RTResult();
    let elements = [];

    for (const elementNode of node.elementNodes) {
      elements.push(res.register(this.visit(elementNode, context)));
      if (res.shouldReturn()) return res;
    }

    return res.success(
      new List(elements).setContext(context).setPos(node.posStart, node.posEnd)
    );
  }

  visit_ObjectNode(node, context) {
    let res = new RTResult();
    let elements = [];

    for (const elementNode of node.elementNodes) {
      elements.push(res.register(this.visit(elementNode, context)));
      if (res.shouldReturn()) return res;
    }

    return res.success(
      new Object(elements).setContext(context).setPos(node.posStart, node.posEnd)
    );
  }

  visit_StringNode(node, context) {
    return new RTResult().success(
      new String(node.tok.value).setContext(context).setPos(node.posStart, node.posEnd)
    );
  }

  visit_EntryNode(node, context) {
    let res = new RTResult();
    let keyName = node.keyTok.value;
    let value = res.register(this.visit(node.valueNode, context));
    if (res.shouldReturn()) return res;

    return res.success(
      new List([keyName, value]).setContext(context).setPos(node.posStart, node.posEnd)
    );
  }

  visit_VarAccessNode(node, context) {
    let res = new RTResult();
    let varName = node.varNameTok.value;
    let value = context.symbolTable.get(varName);

    if (!value) {
      return res.failure(new Errors.RTError(
        node.posStart, node.posEnd,
        `'${varName}' is not defined`,
        context
      ));
    }

    if (value instanceof Object) {
      for (let keyTok of node.varPathTok) {
        if (keyTok.type === Flags.TT_IDENTIFIER) {
          keyTok = context.symbolTable.get(keyTok.value);
        }

        value = value.elements.find((x) => x.elements[0] === keyTok.value).elements[1];
      }
    } else if (value instanceof List) {
      for (let keyTok of node.varPathTok) {
        if (keyTok.type === Flags.TT_IDENTIFIER) {
          keyTok = context.symbolTable.get(keyTok.value);
        }

        value = value.elements[keyTok.value];
      }
    }

    if (!value) {
      return res.failure(new Errors.RTError(
        node.posStart, node.posEnd,
        `'${varName}' is not defined`,
        context
      ));
    }

    value = value.copy().setPos(node.posStart, node.posEnd).setContext(context);
    return res.success(value);
  }

  visit_VarAssignNode(node, context) {
    let res = new RTResult();
    let varName = node.varNameTok.value;
    let value = res.register(this.visit(node.valueNode, context));
    if (res.shouldReturn()) return res;

    context.symbolTable.set(varName, value);
    return res.success(value);
  }

  visit_VarOperateNode(node, context) {
    let res = new RTResult();
    let varName = node.varNameTok.value;
    let symbolTable = context.symbolTable;
    let varValue = symbolTable.get(varName);

    let value = res.register(this.visit(node.newValueNode, context));
    if (res.shouldReturn()) return res;

    let result, error;

    if (node.operatorTok.type === Flags.TT_PLE) {
      [result, error] = varValue.addedTo(value)
    } else if (node.operatorTok.type === Flags.TT_MIE) {
      [result, error] = varValue.subbedBy(value)
    } else if (node.operatorTok.type === Flags.TT_MUE) {
      [result, error] = varValue.multedBy(value)
    } else if (node.operatorTok.type === Flags.TT_DIE) {
      [result, error] = varValue.divedBy(value)
    }

    symbolTable.set(varName, result);

    if (error) {
      return res.failure(error);
    } else {
      return res.success(result.setPos(node.posStart, node.posEnd));
    }
  }

  visit_VarReAssignNode(node, context) {
    let res = new RTResult();
    let varName = node.varNameTok.value;
    let value = res.register(this.visit(node.newValueNode, context));
    if (res.error) return res;

    function setValue(symbolTable) {
      let newNode = symbolTable.get(varName);

      if (newNode instanceof Object) {
        for (let i in node.varPathTok) {
          i = parseInt(i);
          let e = node.varPathTok[i];
          if (e.type === Flags.TT_IDENTIFIER) {
            e = symbolTable.get(e.value);
          }
          let ei = newNode.elements.findIndex((x) => x.elements[0] === e);
  
          if (ei + 1 === 0) {
            if (i + 1 === node.varPathTok.length) {
              newNode.elements.push(
                new List([e, value])
                  .setContext(context)
                  .setPos(node.posStart, node.posEnd)
              )
            } else {
              return res.failure(new Errors.RTError(
                node.posStart, node.posEnd,
                "Invalid assignment"
              ));
            }
          } else {
            if (i + 1 === node.varPathTok.length) {
              newNode.elements[ei].elements[1] = value;
            } else {
              newNode = newNode.elements[ei].elements[1];
            }
          }
        }
      } else if (newNode instanceof List) {
        for (let i in node.varPathTok) {
          i = parseInt(i);
          let e = node.varPathTok[i];
          if (e.type === Flags.TT_IDENTIFIER) {
            e = symbolTable.get(e.value);
          }
  
          if (e + 1 === 0) {
            if (i + 1 === node.varPathTok.length) {
              newNode.elements.push(value)
            } else {
              return res.failure(new Errors.RTError(
                node.posStart, node.posEnd,
                "Invalid assignment"
              ));
            }
          } else {
            if (i + 1 === node.varPathTok.length) {
              newNode.elements[e] = value;
            } else {
              if (!newNode.elements[e]) {
                return res.failure(new Errors.IllegalCharError(
                  node.posStart, node.posEnd,
                  `Invalid index '${e}' in list`
                ));
              }
              newNode = newNode.elements[e];
            }
          }
        }
      }
      
      symbolTable.set(varName, symbolTable.get(varName)); 
    }

    if (context.symbolTable.get(varName)) {
      setValue(context.symbolTable);
    }

    if (res.error) return res;
    return res.success(value);
  }

  visit_BinOpNode(node, context) {
    let res = new RTResult();
    let left = res.register(this.visit(node.leftNode, context));
    if (res.shouldReturn()) return res;
    let right = res.register(this.visit(node.rightNode, context));
    if (res.shouldReturn()) return res;

    let error, result;

    if (node.opTok.type === Flags.TT_PLUS) {
      [result, error] = left.addedTo(right);
    } else if (node.opTok.type === Flags.TT_MINUS) {
      [result, error] = left.subbedBy(right);
    } else if (node.opTok.type === Flags.TT_MUL) {
      [result, error] = left.multedBy(right);
    } else if (node.opTok.type === Flags.TT_DIV) {
      [result, error] = left.divedBy(right);
    } else if (node.opTok.type === Flags.TT_MODULO) {
      [result, error] = left.moduledBy(right);
    } else if (node.opTok.type === Flags.TT_POW) {
      [result, error] = left.powedBy(right);
    } else if (node.opTok.type === Flags.TT_EE) {
      [result, error] = left.getComparisonEq(right);
    } else if (node.opTok.type === Flags.TT_NE) {
      [result, error] = left.getComparisonNe(right);
    } else if (node.opTok.type === Flags.TT_LT) {
      [result, error] = left.getComparisonLt(right);
    } else if (node.opTok.type === Flags.TT_GT) {
      [result, error] = left.getComparisonGt(right);
    } else if (node.opTok.type === Flags.TT_LTE) {
      [result, error] = left.getComparisonLte(right);
    } else if (node.opTok.type === Flags.TT_GTE) {
      [result, error] = left.getComparisonGte(right);
    } else if (node.opTok.type === Flags.TT_OR) {
      [result, error] = left.oredBy(right);
    } else if (node.opTok.type === Flags.TT_AND) {
      [result, error] = left.andedBy(right);
    } else if (node.opTok.matches(Flags.TT_KEYWORD, "in")) {
      [result, error] = left.isIn(right);
    }

    if (error) {
      return res.failure(error);
    } else {
      return res.success(result.setPos(node.posStart, node.posEnd));
    }
  }

  visit_UnaryOpNode(node, context) {
    let res = new RTResult();
    let number = res.register(this.visit(node.node, context));
    if (res.shouldReturn()) return res;

    let error = null;

    if (node.opTok.type === Flags.TT_MINUS) {
      [number, error] = number.multedBy(new Number(-1));
    } else if (node.opTok.type === Flags.TT_NOT) {
      [number, error] = number.notted();
    }

    if (error) {
      return res.failure(error);
    } else {
      return res.success(number.setPos(node.posStart, node.posEnd));
    }
  }

  visit_IfNode(node, context) {
    let res = new RTResult();

    for (const [condition, expr, shouldReturnNull] of node.cases) {
      let conditionValue = res.register(this.visit(condition, context));
      if (res.shouldReturn()) return res;

      if (conditionValue.isTrue()) {
        let exprValue = res.register(this.visit(expr, context));
        if (res.shouldReturn()) return res;
        return res.success(shouldReturnNull ? Number.null: exprValue);
      }
    }

    if (node.elseCase) {
      let [expr, shouldReturnNull] = node.elseCase;
      let elseValue = res.register(this.visit(expr, context));
      if (res.shouldReturn()) return res;
      return res.success(shouldReturnNull ? Number.null: elseValue);
    }

    return res.success(Number.null);
  }

  visit_ForNode(node, context) {
    let res = new RTResult();
    let elements = []

    let startValue = res.register(this.visit(node.startValueNode, context));
    if (res.shouldReturn()) return res;

    let endValue = res.register(this.visit(node.endValueNode, context));
    if (res.shouldReturn()) return res;

    if (node.stepValueNode) {
      var stepValue = res.register(this.visit(node.stepValueNode, context));
      if (res.shouldReturn()) return res;
    } else {
      var stepValue = new Number(1);
    }

    let i = startValue.value;
    if (stepValue.value >= 0) {
      var condition = () => i < endValue.value;
    } else {
      var condition = () => i > endValue.value;
    }

    while (condition()) {
      context.symbolTable.set(node.varNameTok.value, new Number(i));
      i += stepValue.value;

      let value = res.register(this.visit(node.bodyNode, context));
      if (res.error && !res.loopShouldContinue && !res.loopShouldBreak) return res;

      if (res.loopShouldContinue) continue;
      if (res.loopShouldBreak) break;

      elements.push(value);
    }
    
    return res.success(
      node.shouldReturnNull ? Number.null:
      new List(elements).setContext(context).setPos(node.posStart, node.posEnd)
    );
  }

  visit_WhileNode(node, context) {
    let res = new RTResult();
    let elements = []

    while (true) {
      let condition = res.register(this.visit(node.conditionNode, context));
      if (res.shouldReturn()) return res;

      if (!condition.isTrue()) break;

      let value = res.register(this.visit(node.bodyNode, context));
      if (res.error && !res.loopShouldContinue && !res.loopShouldBreak) return res;

      if (res.loopShouldContinue) continue;
      if (res.loopShouldBreak) break;

      elements.push(value);
    }

    return res.success(
      node.shouldReturnNull ? Number.null:
      new List(elements).setContext(context).setPos(node.posStart, node.posEnd)
    );
  }

  visit_FuncDefNode(node, context) {
    let res = new RTResult();

    let funcName = node.varNameTok ? node.varNameTok.value: null;
    let bodyNode = node.bodyNode;
    let argNames = node.argNameToks.map((argName) => argName.value);
    let funcValue = new Function(funcName, bodyNode, argNames, node.shouldAutoReturn)
      .setContext(context)
      .setPos(node.posStart, node.posEnd);

    if (node.varNameTok) {
      context.symbolTable.set(funcName, funcValue);
    }

    return res.success(funcValue);
  }

  visit_CallNode(node, context) {
    let res = new RTResult();
    let args = []

    let valueToCall = res.register(this.visit(node.nodeToCall, context));
    if (res.shouldReturn()) return res;
    valueToCall = valueToCall.copy().setPos(node.posStart, node.posEnd);

    for (const argNode of node.argNodes) {
      args.push(res.register(this.visit(argNode, context)));
      if (res.shouldReturn()) return res;
    }

    let returnValue = res.register(valueToCall.execute(args));
    if (res.shouldReturn()) return res;
    returnValue = returnValue.copy().setPos(node.posStart, node.posEnd).setContext(context);
    return res.success(returnValue);
  }

  visit_ReturnNode(node, context) {
    let res = new RTResult();

    if (node.nodeToReturn) {
      var value = res.register(this.visit(node.nodeToReturn, context));
      if (res.shouldReturn()) return res;
    } else {
      var value = Number.null;
    }

    return res.successReturn(value);
  }

  visit_ContinueNode() {
    return new RTResult().successContinue();
  }

  visit_BreakNode() {
    return new RTResult().successBreak();
  }

  visit_TypeNode(node, context) {
    let res = new RTResult();

    if (!node.nodeElement) {
      return res.failure(new Errors.InvalidSyntaxError(
        node.posStart, node.posEnd,
        "Invalid element"
      ));
    }

    let value = res.register(this.visit(node.nodeElement, context));
    
    if (!value) {
      return res.failure(new Errors.IllegalCharError(
        node.posStart, node.posEnd,
        `Cannot read '${node.nodeElement.varNameTok.value}' of null`
      ));
    }

    return res.success(new String(value.constructor.name));
  }
}

export default Interpreter;