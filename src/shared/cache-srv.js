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
					return reply;
				})
		}
		return contacts;
	}

	this.addContact = (contact) => {
		contacts[contact.id] = contact;
		return contactsSrv.addContact(contact);
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
		return messages;
	}

}

Object.freeze(exports);
