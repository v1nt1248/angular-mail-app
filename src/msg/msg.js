"use strict"

msgCtrl.$inject = ["messagesSrv"];
function msgCtrl(messagesSrv) {

}

export let msg = {
	bindings: {
		message: "="
	},
	templateUrl: "./msg/msg.html",
	controller: msgCtrl
}


Object.freeze(exports);
