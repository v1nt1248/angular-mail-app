"use strict"

mailAppCtrl.$inject = ["mailAppSrv", "cacheSrv", "$mdSidenav"];
function mailAppCtrl(mailAppSrv, cacheSrv, $mdSidenav) {
	this.folders = cacheSrv.getFolders();

	if (this.folders === undefined) {
		mailAppSrv.getMailBoxes()
			.then((reply) => {
				this.folders = reply;
				cacheSrv.setFolders(this.folders);
			});
	}

	this.toggleSidenav = () => {
		return $mdSidenav("left").toggle();
	}
	
}

export let mailApp = {
	bindings: {},
	templateUrl: "./mail-app/mail-app.html",
	controller: mailAppCtrl
}


Object.freeze(exports);
