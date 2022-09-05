import Http from "./Interpreter/Modules/Http.js";
import Colors from "./Interpreter/Modules/Colors.js";
import WebSocket from "./Interpreter/Modules/Websocket.js";

class Modules {
  constructor() {
    this["csc-http"] = Http;
    this["csc-colors"] = Colors;
    this["csc-websocket"] = WebSocket;
  }
}

export default Modules;