"use strict"

signInSrv.$inject = ["$http"];
export function signInSrv($http) {

	let checkFlags = {
		isCompleted: false,
		isSuccess: false
	};

	this.checkLogin = (login) => {
		if (login === undefined) {
			return checkFlags.isSuccess;
		} else {
			return $http.get("https://shining-heat-1509.firebaseio.com/users.json")
				.then((response) => {
					let users = response.data[0];
					checkFlags.isCompleted = true;
					if ((login.name === users.name) && (login.password === (users.password).toString())) {
						checkFlags.isSuccess = true;
					} else {
						checkFlags.isSuccess = false;
					}
					return checkFlags.isSuccess;
				});
		}
	};
}

Object.freeze(exports);
