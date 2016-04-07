"use strict"

messagesSrv.$inject = ["$http"];
export function messagesSrv($http) {

	this.makeMsgJSON = () => {
		return {
			id: "new",
			boxId: 1,
			mailAddress: "",
			subject: "",
			body: "",
			isOut: true,
			isRead: true
		};
	}

	this.getMessages = () => {
		return $http.get("https://cards-v1nt1248.firebaseio.com/messages.json")
			.then((response) => {
				let messagesTmp = response.data;
				let messages = {};
				// преобразование типов
				for (let key of Object.keys(messagesTmp)) {
					let tmp = {
						id: messagesTmp[key].id,
						boxId: messagesTmp[key].boxId,
						mailAddress: messagesTmp[key].mailAddress,
						subject: messagesTmp[key].subject,
						body: messagesTmp[key].body,
						isOut: messagesTmp[key].isOut,
						isRead: messagesTmp[key].isRead,
						contact: null
					};
					messages[tmp.id] = tmp;
				}
				return messages;
			}, (err) => {
				console.error(err);
			});
	}

	this.removeMessage = (msgId) => {
		return $http.delete("https://cards-v1nt1248.firebaseio.com/messages/" + msgId + ".json")
			.then((response) => {}, (err) => { console.error(err); });
	}

	this.updateMessage = (msg) => {
		// преобразование типов
		let msgJSON = {
			id: msg.id,
			boxId: msg.boxId,
			mailAddress: msg.mailAddress,
			subject: msg.subject,
			body: msg.body,
			isOut: msg.isOut,
			isRead: msg.isRead
		};
		let msgId = msg.id;
		let url = "https://cards-v1nt1248.firebaseio.com/messages/" + msgId + ".json";
		return $http.put(url, msgJSON)
			.then((response) => {}, (err) => { console.error(err); });
	}

	this.addMessage = (msg) => {
		let msgJSON = {
			id: msg.id,
			boxId: msg.boxId,
			mailAddress: msg.mailAddress,
			subject: msg.subject,
			body: msg.body,
			isOut: msg.isOut,
			isRead: msg.isRead
		};
		let msgId = "";
		return $http.post("https://cards-v1nt1248.firebaseio.com/messages.json", msgJSON)
			.then((response) => {
				msgId = response.data.name;
				msg.id = msgId;
				return this.updateMessage(msg);
			}, (err) => {console.error(err);})
			.then(() => {
				return msg.id;
			});
	}

}

Object.freeze(exports);