"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.toArray = toArray;
function toArray() {
	return function (obj, addKey) {
		if (!angular.isObject(obj)) return obj;
		if (addKey === false) {
			return Object.keys(obj).map(function (key) {
				return obj[key];
			});
		} else {
			return Object.keys(obj).map(function (key) {
				let value = obj[key];
				return angular.isObject(value) ? Object.defineProperty(value, '$key', { enumerable: false, value: key }) : { $key: key, $value: value };
			});
		}
	};
}

Object.freeze(exports);