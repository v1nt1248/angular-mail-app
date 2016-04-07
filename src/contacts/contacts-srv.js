"use strict"

contactsSrv.$inject = ["$http"];
export function contactsSrv($http) {

	this.getContacts = () => {
		return $http.get("https://cards-v1nt1248.firebaseio.com/contacts.json")
			.then((response) => {
				let contactsTmp = response.data;
				let contacts = {};
				for (let key of Object.keys(contactsTmp)) {
					// преобразование типов
					let tmp = {
						id: contactsTmp[key].id,
						fullName: contactsTmp[key].fullName,
						gender: contactsTmp[key].gender,
						email: contactsTmp[key].email,
						address: (contactsTmp[key].address != undefined) ? contactsTmp[key].address : "",
						birthdate: (contactsTmp[key].birthdate != undefined) ? contactsTmp[key].birthdate : "",
						isSaved: true,
						isMarked: false
					};
					contacts[tmp.id] = tmp;
					return contacts;
				}
			}, (err) => { console.error(err)});
	}

	this.removeContact = (personId) => {
		return $http.delete("https://cards-v1nt1248.firebaseio.com/contacts/" + personId + ".json")
			.then((response) => {}, (err) => {console.error(err);});
	}

	this.addContact = (person) => {
		// преобразование типов
		let prsnJSON = {
			id: person.id,
			fullName: person.fullName,
			gender: person.gender,
			email: person.email,
			address: person.address,
			birthdate: person.birthdate
		};
		let personId = "";
		return $http.post("https://cards-v1nt1248.firebaseio.com/contacts.json", prsnJSON)
			.then((response) => {
				personId = response.data.name;
				person.id = personId;
				return this.updateContact(person);
			}, (err) => { console.error(err); })
			.then(() => {
				return person.id;
			});
	}

	this.updateContact = (person) => {
		// преобразование типов
		let prsnJSON = {
			id: person.id,
			fullName: person.fullName,
			gender: person.gender,
			email: person.email,
			address: person.address,
			birthdate: person.birthdate
		};
		let personId = person.id;
		let url = "https://cards-v1nt1248.firebaseio.com/contacts/" + personId + ".json";
		return $http.put(url, prsnJSON)
			.then((response) => {}, (err) => { console.error(err); });
	}

	this.prepareList = (contacts) => {
		let list = [];
		for (let key of Object.keys(contacts)) {
			let tmp = {name: "", email: "", searchSpace: ""};
			tmp.name = contacts[key].fullName;
			tmp.email = contacts[key].email;
			tmp.searchSpace = tmp.name + " (" + tmp.email + ") ";
			list.push(tmp);
		}
		return list;
	}

}

Object.freeze(exports);
