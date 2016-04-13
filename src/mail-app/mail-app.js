"use strict"

mailAppCtrl.$inject = ["$scope", "$state", "cacheSrv", "$mdSidenav", "$mdDialog"];
function mailAppCtrl($scope, $state, cacheSrv, $mdSidenav, $mdDialog) {
	this.folders = cacheSrv.getFolders();

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
				$scope.error = {
					email: false,
					subj: false
				};

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
					$scope.error = {
						email: false,
						subj: false
					};

					if ($scope.newMsg.subject.length === 0) {
						$scope.error.subj = true;
					}

					if (($scope.newMsg.mailAddress.length === 0) || !(/.+@.+\..+/i.test($scope.newMsg.mailAddress))) {
						$scope.error.email = true;
					}
					
					if ($scope.error.subj || $scope.error.email) {
						return false;
					}

					$scope.writingNow = true;
					// alert(JSON.stringify($scope.newMsg));
					// $scope.writingNow = false;
					// $scope.hide();
					// $state.reload("mail-app.folders");
					
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
