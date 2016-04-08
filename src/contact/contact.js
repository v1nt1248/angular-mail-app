"use strict"

contactCtrl.$inject = ["$scope", "contactsSrv", "cacheSrv", "$mdDialog"];
function contactCtrl($scope, contactsSrv, cacheSrv, $mdDialog) {

	this.editPerson = (id) => {
		alert("Edit person " + id);
	};

	this.removePerson = (ev, id) => {
		// let confirm = $mdDialog.confirm()
		// 	.title("Вы действительно хотите удалить этот контакт?")
		// 	.ariaLabel("Confirm delete")
		// 	.targetEvent(ev)
		// 	.ok("Да")
		// 	.cancel("Нет");
		//
		// $mdDialog.show(confirm)
		// 	.then(function() {
		// 		return cacheSrv.delContact(id)
		// 			.then(() => {
		// 				$mdDialog.hide();
		// 			})
		// 	}, function() {
		// 		$mdDialog.hide();
		// 	});

		$mdDialog.show({
			template: '<div class="del-confirm">' +
								'<h3 class="md-title">Вы действительно хотите</h3>' +
								'<h3 class="md-title">удалить этот контакт?</h3>' +
								'<div class="action" layout="row" layout-align="space-around center">' +
								'<md-button class="md-raised md-primary" ng-click="actionNo()">Нет</md-button>' +
								'<md-button class="md-raised md-warn" ng-click="actionYes()">Да</md-button>' +
								'</div></div>',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: false,
			scope: $scope,
			controller: function DialogCtrl($scope, $mdDialog, cacheSrv) {
				console.log(id);

				$scope.actionNo = () => {
					$mdDialog.hide();
				}

				$scope.actionYes = () => {
					return cacheSrv.delContact(id)
						.then(() => {
							$scope.actionNo();
						})
				}
			}
		});
	};

}

export let contact = {
	bindings: {
		person: "="
	},
	templateUrl: "./contact/contact.html",
	controller: contactCtrl
}


Object.freeze(exports);

