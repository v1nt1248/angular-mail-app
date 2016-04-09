"use strict"

contactsCtrl.$inject = ["$scope", "cacheSrv", "$mdSidenav", "$mdDialog"];
function contactsCtrl($scope, cacheSrv, $mdSidenav, $mdDialog) {
	this.contacts = cacheSrv.getContacts();

	this.backSidenav = () => {
		this.sideNav();
	};

	this.createContact = (ev) => {
		$mdDialog.show({
			templateUrl: "./contact/contact-new.html",
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: false,
			scope: $scope,
			preserveScope: true,
			controller: function DialogCtrl($scope, $mdDialog, cacheSrv) {
				$scope.writingNow = false;

				$scope.newContact = {
					id: "new",
					fullName: "",
					gender: "",
					email: "",
					address: "",
					birthdate: ""
				};

				$scope.title = "Новый контакт";

				$scope.hide = () => {
					$mdDialog.hide();
				};

				$scope.cancel = () => {
					$mdDialog.cancel();
				};

				$scope.submit = () => {
					$scope.writingNow = true;
					cacheSrv.addContact($scope.newContact)
						.then((id) => {
							$scope.writingNow = false;
							$scope.hide();
						});
				}
			}
		});
	}

	this.action = (id, task) => {
		switch (task) {
			case "delete": 
				cacheSrv.delContact(id)
					.then(() => {
						console.log("Удаление контакта завершено");
					});
				break;
			case "edit":
				$mdDialog.show({
					templateUrl: "./contact/contact-new.html",
					parent: angular.element(document.body),
					clickOutsideToClose: false,
					scope: $scope,
					preserveScope: true,
					controller: function DialogCtrl($scope, $mdDialog, cacheSrv) {
						$scope.writingNow = false;
						$scope.tmpContact = angular.copy($scope.$ctrl.contacts[id]);
						$scope.newContact = $scope.$ctrl.contacts[id];

						$scope.title = "Редактирование контакта";

						$scope.hide = () => {
							$mdDialog.hide();
						};

						$scope.cancel = () => {
							$scope.$ctrl.contacts[id] = $scope.tmpContact;
							$mdDialog.cancel();
						};

						$scope.submit = () => {
							$scope.writingNow = true;
							cacheSrv.updateContact($scope.newContact)
								.then((id) => {
									$scope.writingNow = false;
									$scope.hide();
								});
						}
					}
				});
				break;
		}
	}
}

export let contacts = {
	bindings: {
		sideNav: "&"
	},
	templateUrl: "./contacts/contacts.html",
	controller: contactsCtrl
}


Object.freeze(exports);
