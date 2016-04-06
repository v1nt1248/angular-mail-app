"use strict"

signInCtrl.$inject = ["$state", "signInSrv", "cacheSrv"];
function signInCtrl($state, signInSrv, cacheSrv) {
	this.login = {
		name: "",
		password: "",
		error: false
	};

	this.sendReq = () => {
		signInSrv.checkLogin(this.login)
			.then((result) => {
				if (result) {
					cacheSrv.setLogin(this.login.mail);
					$state.go("mail-app");
				} else {
					this.login = {
						name: "",
						password: "",
						error: true
					};
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
