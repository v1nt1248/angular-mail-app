"use strict"

export function cache() {
	let login;

	this.setLogin = (mail) => {
		login = mail;
	};

	this.getLogin = () => {
		return login;
	};

}

Object.freeze(exports);
