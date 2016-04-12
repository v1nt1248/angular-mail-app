"use strict"

mailInputCtrl.$inject = ["$scope", "cacheSrv"];
function mailInputCtrl($scope, cacheSrv) {
	this.original = {};
	this.originalName = [];
	this.isDone = false;
	this.mail = "";
	this.filtered = null;
	this.searchQuery;
	
	if (this.originalName.length === 0) {
		this.original = cacheSrv.prepareContactList();
		for (let key of Object.keys(this.original)) {
			this.originalName.push(key);
		}
	}
	
	$scope.$watch("$ctrl.searchQuery", (newValue, oldValue) => {
		if (newValue === "") {
			this.filtered = [];
		}
		if (this.isDone) {
			this.isDone = false;
		} else {
			if ((newValue != oldValue) && (newValue !== "")) {
				this.filtered = this.originalName.filter( (item, i, arr) => {
					return item.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1;
				});
			}
		}
	});

	this.chooseName = (event, item) => {
		// this.searchQuery = item;
		this.searchQuery = this.original[item];
		this.mail = this.original[item];
		this.filtered = null;
		this.isDone = true;
	}

	this.shift = () => {
		this.mail = this.searchQuery;
	}

	this.basic = () => {
		this.isDone = false;
	}

}

export let mailInput = {
	bindings: {
		mail: "=",
		placeholder: "@",
		ngPattern: "@"
	},
	templateUrl: "./mail-input/mail-input.html",
	controller: mailInputCtrl
}

Object.freeze(exports);