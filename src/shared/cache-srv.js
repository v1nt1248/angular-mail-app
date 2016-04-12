"use strict"

cache.$inject = ["contactsSrv", "messagesSrv"];
export function cache(contactsSrv, messagesSrv) {
	let login;
	let folders;
	let contacts;
	let messages;

	/* login */
	this.setLogin = (mail) => {
		login = mail;
	};

	this.getLogin = () => {
		return login;
	};

	/* mail folders */
	this.setFolders = (data) => {
		folders = data;
	};

	this.getFolders = () => {
		return folders;
	};

	/* contacts */
	this.setContacts = (data) => {
		contacts = data;
	}

	this.getContacts = () => {
		if (contacts === undefined) {
			contactsSrv.getContacts()
				.then((reply) => {
					contacts = reply;
					return reply;
				});
		}
		return contacts;
	}

	this.addContact = (contact) => {
		return contactsSrv.addContact(contact)
			.then((id) => {
				contact.id = id;
				contact.isMarked = false;
				contact.isSaved = true;
				contacts[id] = contact;
				return id;
			});
	}

	this.updateContact = (contact) => {
		contacts[contact.id] = contact;
		return contactsSrv.updateContact(contact);
	}

	this.delContact = (id) => {
		delete contacts[id];
		return contactsSrv.removeContact(id);
	}

	/* messages */
	this.setMessages = (data) => {
		messages = data;
	}

	this.getMessages = () => {
		if (messages === undefined) {
			return messagesSrv.getMessages()
				.then((reply) => {
					let tmpMessages = reply;
					for (let keyMsg of Object.keys(tmpMessages)) {
						let mes = this.additionMsg(tmpMessages[keyMsg]);


						let mail = tmpMessages[keyMsg].mailAddress;
						let cntct = tmpMessages[keyMsg].mailAddress;
						for (let keyContact of Object.keys(contacts)) {
							if (contacts[keyContact].email === mail) {
								cntct = contacts[keyContact].fullName;
								break;
							}
						}
						tmpMessages[keyMsg].contact = cntct;
					}
					messages = tmpMessages;
					return messages;
				});
		}
		return messages;
	}

	this.addMessage = (message) => {
		return messagesSrv.addMessage(message)
			.then((id) => {
				message.id = id;
				message = this.additionMsg(message);
				messages[id] = message;
				folders[messages[id].boxId].size += 1;
			});
	}

	this.delMessage = (id) => {
		if (messages[id].boxId === "2") {
			delete messages[id];
			folders[2].size -= 1;
			return messagesSrv.removeMessage(id);
		} else {
			folders[messages[id].boxId].size -= 1;
			messages[id].boxId = "2";
			folders[2].size += 1;
			return messagesSrv.updateMessage(messages[id]);
		}
	}

	this.additionMsg =(msg) => {
		let mail = msg.mailAddress;
		let cntct = msg.mailAddress;
		for (let keyContact of Object.keys(contacts)) {
			if (contacts[keyContact].email === mail) {
				cntct = contacts[keyContact].fullName;
				break;
			}
		}
		msg.contact = cntct;
		return msg;
	}

	this.prepareContactList = () => {
		let list = {};
		for (let key of Object.keys(contacts)) {
			let tmpEmail = contacts[key].email;
			let tmpFullName = contacts[key].fullName;
			let tmpSearcSpace = tmpFullName + " (" + tmpEmail + ")";
			list[tmpSearcSpace] = tmpEmail;
		}
		return list;
	}

}

Object.freeze(exports);
