import express from "express";
import cors from "cors";
import List from "../List.js";
import Object from "../Object.js";
import BuiltInFunction from "../BuiltInFunction.js";
import RTResult from "../../RTResult.js";
import PromiseClass from "../Promise.js";
import Void from "../Void.js";
import Converter from "../../Converter.js";

class Http {
  constructor() {
    this.name = "csc-http";
  }

  value_listen(app) {
    BuiltInFunction.prototype.args_listen = ["port"];
    BuiltInFunction.prototype.execute_listen = function(execCtx) {
      let port = execCtx.symbolTable.get("port");

      let promise = new Promise((resolve) => {
        app.listen(port.value, () => {
          resolve(new Void(null));
        });
      });
      
      return new RTResult().success(new PromiseClass(promise));
    }
  }

  value_format(app) {
    BuiltInFunction.prototype.args_format = ["format"];
    BuiltInFunction.prototype.execute_format = function(execCtx) {
      let format = execCtx.symbolTable.get("format");
      app.use(express[format.value]());

      return new RTResult().success(new Void(null));
    }
  }

  value_urlencoded(app) {
    BuiltInFunction.prototype.args_urlencoded = ["options"];
    BuiltInFunction.prototype.execute_urlencoded = function(execCtx) {
      let options = execCtx.symbolTable.get("options");
      let converter = new Converter();

      app.use(express.urlencoded(converter.nodeToValue(options)));
      return new RTResult().success(new Void(null));
    }
  }

  value_get(app) {
    BuiltInFunction.prototype.args_get = ["path", "callback"];
    BuiltInFunction.prototype.execute_get = function(execCtx) {
      let path = execCtx.symbolTable.get("path");
      let callback = execCtx.symbolTable.get("callback");
      let converter = new Converter();

      app.get(path.value, (req, res) => {
        let parsedReq = converter.valueToNode(req);

        converter = new Converter();
        let parsedRes = converter.valueToNode(res);

        let returnValue = callback.execute([parsedReq, parsedRes]);
        converter = new Converter();
        let result = converter.nodeToValue(returnValue.value);
        res.send(result);
      });

      return new RTResult().success(new Void(null));
    }
  }

  value_post(app) {
    BuiltInFunction.prototype.args_post = ["path", "callback"];
    BuiltInFunction.prototype.execute_post = function(execCtx) {
      let path = execCtx.symbolTable.get("path");
      let callback = execCtx.symbolTable.get("callback");
      let converter = new Converter();

      app.post(path.value, (req, res) => {
        let parsedReq = converter.valueToNode(req);

        converter = new Converter();
        let parsedRes = converter.valueToNode(res);

        let returnValue = callback.execute([parsedReq, parsedRes]);
        converter = new Converter();
        let result = converter.nodeToValue(returnValue.value);
        res.send(result);
      });

      return new RTResult().success(new Void(null));
    }
  }

  value_put(app) {
    BuiltInFunction.prototype.args_put = ["path", "callback"];
    BuiltInFunction.prototype.execute_put = function(execCtx) {
      let path = execCtx.symbolTable.get("path");
      let callback = execCtx.symbolTable.get("callback");
      let converter = new Converter();

      app.put(path.value, (req, res) => {
        let parsedReq = converter.valueToNode(req);

        converter = new Converter();
        let parsedRes = converter.valueToNode(res);

        let returnValue = callback.execute([parsedReq, parsedRes]);
        converter = new Converter();
        let result = converter.nodeToValue(returnValue.value);
        res.send(result);
      });

      return new RTResult().success(new Void(null));
    }
  }

  value_patch(app) {
    BuiltInFunction.prototype.args_patch = ["path", "callback"];
    BuiltInFunction.prototype.execute_patch = function(execCtx) {
      let path = execCtx.symbolTable.get("path");
      let callback = execCtx.symbolTable.get("callback");
      let converter = new Converter();

      app.patch(path.value, (req, res) => {
        let parsedReq = converter.valueToNode(req);

        converter = new Converter();
        let parsedRes = converter.valueToNode(res);

        let returnValue = callback.execute([parsedReq, parsedRes]);
        converter = new Converter();
        let result = converter.nodeToValue(returnValue.value);
        res.send(result);
      });

      return new RTResult().success(new Void(null));
    }
  }

  value_delete(app) {
    BuiltInFunction.prototype.args_delete = ["path", "callback"];
    BuiltInFunction.prototype.execute_delete = function(execCtx) {
      let path = execCtx.symbolTable.get("path");
      let callback = execCtx.symbolTable.get("callback");
      let converter = new Converter();

      app.delete(path.value, (req, res) => {
        let parsedReq = converter.valueToNode(req);

        converter = new Converter();
        let parsedRes = converter.valueToNode(res);

        let returnValue = callback.execute([parsedReq, parsedRes]);
        converter = new Converter();
        let result = converter.nodeToValue(returnValue.value);
        res.send(result);
      });

      return new RTResult().success(new Void(null));
    }
  }

  value_cors(app) {
    BuiltInFunction.prototype.args_cors = ["options"];
    BuiltInFunction.prototype.execute_cors = function(execCtx) {
      let options = execCtx.symbolTable.get("options");
      let converter = new Converter();

      app.use(cors(converter.nodeToValue(options)));

      return new RTResult().success(new Void(null));
    }
  }

  run() {
    const app = express();

    this.value_listen(app);
    this.value_format(app);
    this.value_urlencoded(app);
    this.value_get(app);
    this.value_post(app);
    this.value_put(app);
    this.value_patch(app);
    this.value_delete(app);
    this.value_cors(app);

    return new Object([
      new List(["listen", new BuiltInFunction("listen")]),
      new List(["format", new BuiltInFunction("format")]),
      new List(["urlencoded", new BuiltInFunction("urlencoded")]),
      new List(["get", new BuiltInFunction("get")]),
      new List(["post", new BuiltInFunction("post")]),
      new List(["put", new BuiltInFunction("put")]),
      new List(["patch", new BuiltInFunction("patch")]),
      new List(["delete", new BuiltInFunction("delete")]),
      new List(["cors", new BuiltInFunction("cors")])
    ]);
  }
}

export default Http;