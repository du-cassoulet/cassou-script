import Converter from "../../Converter.js";
import RTResult from "../../RTResult.js";
import BuiltInFunction from "../BuiltInFunction.js";
import List from "../List.js";
import Object from "../Object.js";
import Void from "../Void.js";

class WebsocketClass {
	constructor() {
		this.name = "csc-websocket";
	}

	value_onMessage() {
		BuiltInFunction.prototype.args_colorify = ["url", "callback"];
		BuiltInFunction.prototype.execute_colorify = function (execCtx) {
			let url = execCtx.symbolTable.get("url");
			let callback = execCtx.symbolTable.get("callback");
			let socket = new WebSocket(url.value);

			socket.onmessage = function (event) {
				let converter = new Converter();
				callback.execute([converter.valueToNode(event)]);
			};

			return new RTResult().success(new Void(null));
		};
	}

	run() {
		this.value_onMessage();

		return new Object([
			new List(["onMessage", new BuiltInFunction("onMessage")]),
		]);
	}
}

export default WebsocketClass;
