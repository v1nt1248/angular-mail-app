"use strict"

export function cache() {
	let login;
	let folders;
	let contacts;
	let messages;

	this.setLogin = (mail) => {
		login = mail;
		console.log("SET " + login);
	};

	this.getLogin = () => {
		console.log("GET " + login);
		return login;
	};

	this.setFolders = (data) => {
		folders = data;
		console.log("SET " + JSON.stringify(folders));
	};

	this.getFolders = () => {
		console.log("GET " + JSON.stringify(folders));
		return folders;
	};

	this.setContacts = (data) => {
		contacts = data;
		console.log("SET " + JSON.stringify(contacts));
	}

	this.getContacts = () => {
		console.log("GET " + JSON.stringify(contacts));
		return contacts;
	}

	this.setMessages = (data) => {
		messages = data;
		console.log("SET " + JSON.stringify(messages));
	}

	this.getMessages = () => {
		console.log("GET " + JSON.stringify(messages));
		return messages;
	}

}

Object.freeze(exports);
