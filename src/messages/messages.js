"use strict"

messagesCtrl.$inject = ["$scope", "$state", "cacheSrv", "$mdDialog"];
function messagesCtrl($scope, $state, cacheSrv, $mdDialog) {
	this.activeMsgId = "";

	this.removeMsg = (ev, id) => {
		this.activeMsgId = id;
		let fldrId = $state.params.folderId;
		console.log(fldrId);
		$state.go("mail-app.folders", {folderId: fldrId});

		$mdDialog.show({
			template: '<div class="del-confirm">' +
			'<h3 class="md-title">Вы действительно хотите</h3>' +
			'<h3 class="md-title">удалить это сообщение?</h3>' +
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

				$scope.actionNo = () => {
					$mdDialog.cancel();
				}

				$scope.actionYes = () => {
					$scope.deletingNow = true;
					cacheSrv.delMessage(id)
						.then(() => {
							$scope.deletingNow = false;
							$mdDialog.hide();
							$state.reload("mail-app.folders");
						});
				}
			}
		});
	}

	this.goState = (id) => {
		this.activeMsgId = id;
		let params = {msgId: id};
		$state.go("mail-app.folders.message", params);
	}
}

export let messages = {
	bindings: {
		messages: "="
	},
	templateUrl: "./messages/messages.html",
	controller: messagesCtrl
}


Object.freeze(exports);
