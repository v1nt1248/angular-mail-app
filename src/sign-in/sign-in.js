"use strict"

signInCtrl.$inject = ["$state", "signInSrv", "cacheSrv", "mailAppSrv", "contactsSrv", "messagesSrv"];
function signInCtrl($state, signInSrv, cacheSrv, mailAppSrv, contactsSrv, messagesSrv) {
	this.wait = false;

	this.login = {
		name: "",
		password: "",
		error: false
	};

	this.sendReq = () => {
		this.wait = true;
		let fldrs;
		signInSrv.checkLogin(this.login)
			.then((result) => {
				if (result) {
					cacheSrv.setLogin(this.login.name);
					return mailAppSrv.getMailBoxes()
						.then((folders) => {
							fldrs = folders;
							return contactsSrv.getContacts()
						})
						.then((contacts) => {
							cacheSrv.setContacts(contacts);
							return messagesSrv.getMessages();
						})
						.then((messages) => {
							fldrs = mailAppSrv.countMessages(fldrs, messages);
							cacheSrv.setFolders(fldrs);
							cacheSrv.setMessages(messages);
							this.wait = false;
							$state.go("mail-app");
						});
				} else {
					this.login = {
						name: "",
						password: "",
						error: true
					};
					this.wait = false;
				}
			});
	};
}


export let signIn = {
	bindings: {},
	templateUrl: "./sign-in/sign-in.html",
	controller: signInCtrl
}

Object.freeze(exports);
