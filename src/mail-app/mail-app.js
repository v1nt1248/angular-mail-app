"use strict"

mailAppCtrl.$inject = ["$scope", "$state", "cacheSrv", "$mdSidenav", "$mdDialog"];
function mailAppCtrl($scope, $state, cacheSrv, $mdSidenav, $mdDialog) {
	this.folders = cacheSrv.getFolders();

	// if (this.folders === undefined) {
	// 	mailAppSrv.getMailBoxes()
	// 		.then((reply) => {
	// 			this.folders = reply;
	// 			cacheSrv.setFolders(this.folders);
	// 		});
	// }

	this.toggleSidenav = () => {
		return $mdSidenav("left").toggle();
	}

	this.createNewMsg = () => {
		$mdDialog.show({
			templateUrl: "./msg/msg-new.html",
			parent: angular.element(document.body),
			clickOutsideToClose: false,
			scope: $scope,
			preserveScope: true,
			controller: function DialogCtrl($scope, $state, $mdDialog, cacheSrv) {
				$scope.writingNow = false;

				$scope.newMsg = {
					id: "new",
					boxId: 1,
					mailAddress: "",
					subject: "",
					body: "",
					isMarked: false,
					isOut: true,
					isRead: true
				};

				$scope.hide = () => {
					$mdDialog.hide();
				};

				$scope.cancel = () => {
					$mdDialog.cancel();
				};

				$scope.submit = () => {
					$scope.writingNow = true;
					// let fldrId = $state.params.folderId;
					// console.log(fldrId);
					cacheSrv.addMessage($scope.newMsg)
						.then((id) => {
							$scope.writingNow = false;
							$scope.hide();
							$state.reload("mail-app.folders");
						});
				}
			}
		});
	}


	
}

export let mailApp = {
	bindings: {},
	templateUrl: "./mail-app/mail-app.html",
	controller: mailAppCtrl
}


Object.freeze(exports);
