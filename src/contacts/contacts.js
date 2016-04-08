"use strict"

contactsCtrl.$inject = ["$scope", "contactsSrv", "cacheSrv", "$mdSidenav", "$mdDialog"];
function contactsCtrl($scope, contactsSrv, cacheSrv, $mdSidenav, $mdDialog) {
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
			controller: function DialogCtrl($scope, $mdDialog, contactsSrv, cacheSrv) {
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

				$scope.closeDialog = () => {
					$mdDialog.hide();
				};

				$scope.submit = () => {
					$scope.writingNow = true;
					cacheSrv.addContact($scope.newContact)
						.then((id) => {
							$scope.$ctrl.contacts[id] = $scope.newContact;
							$scope.writingNow = false;
							$scope.closeDialog();
						});
				}
			}
		});
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
