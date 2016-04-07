"use strict"

messagesCtrl.$inject = ["messagesSrv"];
function messagesCtrl(messagesSrv) {

}

export let messages = {
	bindings: {
		messages: "="
	},
	templateUrl: "./messages/messages.html",
	controller: messagesCtrl
}


Object.freeze(exports);
