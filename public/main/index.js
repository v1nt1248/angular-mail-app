"use strict";

var _toArray = require("../shared/to-array");

var toArray = _interopRequireWildcard(_toArray);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

let app = angular.module("myMail", ["ngMaterial", "ui.router", "ngMdIcons"]);

app.filter("toArray", toArray);

app.config(["$mdThemingProvider", "$stateProvider", "$urlRouterProvider", function (ngMdIconServiceProvider, $mdThemingProvider, $stateProvider, $urlRouterProvider) {

	$mdThemingProvider.theme("default").primaryPalette("indigo").accentPalette("orange").warnPalette("red").backgroundPalette("grey");
}]);