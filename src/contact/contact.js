"use strict"

contactCtrl.$inject = ["$scope", "$mdDialog"];
function contactCtrl($scope, $mdDialog) {

	this.removePerson = (ev, prsnId) => {
		$mdDialog.show({
			template: '<div class="del-confirm">' +
								'<h3 class="md-title">Вы действительно хотите</h3>' +
								'<h3 class="md-title">удалить контакт</h3>' +
								'<h3 class="md-title accent">{{personTmp.fullName}} ?</h3>' +
								'<div class="action" layout="row" layout-align="space-around center">' +
								'<md-button class="md-raised md-primary" ng-click="actionNo()">Нет</md-button>' +
								'<md-button class="md-raised md-warn" ng-click="actionYes()">Да</md-button>' +
								'</div>' +
								'<md-progress-linear md-mode="indeterminate" ng-if="deletingNow"></md-progress-linear>' +
								'</div>',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: false,
			scope: $scope,
			preserveScope: true,
			controller: function DialogCtrl($scope, $mdDialog) {
				$scope.deletingNow = false;
				$scope.personTmp = $scope.$ctrl.person;

				$scope.actionNo = () => {
					$mdDialog.cancel();
				}

				$scope.actionYes = () => {
					$scope.deletingNow = true;
					$scope.$ctrl.onAction({id: prsnId, task: "delete"});
					$scope.deletingNow = false;
					$mdDialog.hide();
				}
			}
		});
	}

	this.editPerson = (prsnId) => {
		this.onAction({id: prsnId, task: "edit"});
	}

}

export let contact = {
	bindings: {
		person: "=",
		onAction: "&"
	},
	templateUrl: "./contact/contact.html",
	controller: contactCtrl
}


Object.freeze(exports);

