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
		console.log("Q: " + this.selectedItem);
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

	/* управление */

	let key = {up: 38, down: 40, enter: 13};

	this.leaveFilteredList = () => {
		this.selectedItem = null;
	}

	this.mouseSelectItem = (index) => {
		this.selectedItem = index;
		console.log("index: " + this.selectedItem);
	}

	this.keySelect = (event) => {
		let keycode = event.keyCode || event.which;

		switch (keycode) {
			case key.enter:
				if (this.selectedItem !== null) {
					this.chooseName();
				}
				break;
			case key.down:
				if (this.selectedItem === null) {
					this.selectedItem = 0;
					return;
				}
				if (this.selectedItem === (this.filtered.length - 1)) {
					this.selectedItem = this.filtered.length - 1;
					return;
				}
				this.selectedItem += 1;
				break;
			case key.up:
				if (this.selectedItem === 0) {
					this.selectedItem = 0;
					return;
				}
				this.selectedItem -= 1;
		}
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