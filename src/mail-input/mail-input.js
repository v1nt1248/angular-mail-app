"use strict"

mailInputCtrl.$inject = ["$scope", "cacheSrv"];
function mailInputCtrl($scope, cacheSrv) {

	let initComponent = () => {
		this.searchQuery = "";
		this.ngModel = this.searchQuery;
		this.original = {};
		this.originalName = [];
		this.isDone = false;
		this.filtered = [];
	};

	initComponent();

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

	this.selectedItem = null;

	this.chooseName = () => {
		let item = this.filtered[this.selectedItem];
		this.searchQuery = this.original[item];
		this.ngModel = this.original[item];
		this.filtered = [];
		this.selectedItem = null;
		this.isDone = true;
	}

	this.shift = () => {
		this.ngModel = this.searchQuery;
	}

	this.finishe = () => {
		if (this.selectedItem !== null) {
			this.chooseName();
		}
		this.isDone = true;
	}

	this.leaveFilteredList = () => {
		this.selectedItem = null;
	}

	this.mouseSelectItem = (index) => {
		this.selectedItem = index;
	}

}

export let mailInput = {
	bindings: {
		ngModel: "=",
		placeholder: "@"
	},
	templateUrl: "./mail-input/mail-input.html",
	controller: mailInputCtrl
}

Object.freeze(exports);