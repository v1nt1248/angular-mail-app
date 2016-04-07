"use strict"

mailAppSrv.$inject = ["$http"];
export function mailAppSrv($http) {

	this.getMailBoxes = () => {
		return $http.get("https://cards-v1nt1248.firebaseio.com/mail-boxes.json")
			.then((response) => {
				let boxesTemp = response.data;
				let folders = {};
				for (let box of boxesTemp) {
					// преобразование данных
					let folderTmp = {
						id: box.id,
						name: box.name,
						icon: box.icon,
						size: 0
					};
					folders[folderTmp.id] = folderTmp;
				}
				return folders;
			})
			.catch((err) => {
				console.error(err);
			});
	}

	this.countMessages = (folders, messages) => {
		for (let msgId of Object.keys(messages)) {
			folders[messages[msgId].boxId].size += 1;
		}
		return folders;
	}


}

Object.freeze(exports);