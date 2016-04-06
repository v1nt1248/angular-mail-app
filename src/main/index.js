"use strict"

import {toArray} from "../shared/to-array";
import {cache} from "../shared/cache-srv";
import {signInSrv} from "../sign-in/sign-in-srv";
import {mailAppSrv} from "../mail-app/mail-app-srv";
import {signIn} from "../sign-in/sign-in";
import {mailApp} from "../mail-app/mail-app";

let app = angular.module("myMail", ["ngMaterial", "ui.router", "ngMdIcons"]);

app.filter("toArray", toArray);
app.service("cacheSrv", cache);
app.service("signInSrv", signInSrv);
app.service("mailAppSrv", mailAppSrv);
app.component("signIn", signIn);
app.component("mailApp", mailApp);

app.config(function(ngMdIconServiceProvider, $mdThemingProvider, $stateProvider, $urlRouterProvider) {

	$mdThemingProvider.theme("default")
		.primaryPalette("indigo")
		.accentPalette("orange")
		.warnPalette("red")
		.backgroundPalette("grey");

	$stateProvider
		.state("login", {
			url: "/login",
			template: "<sign-in></sign-in>"
		})
		.state("mail-app", {
			url: "/mail",
			template: "<mail-app></mail-app>",
			resolve: {
				flag: ["signInSrv", function(signInSrv) {
					return signInSrv.checkLogin();
				}]
			},
			controller: function($state, flag) {
				if (!flag) {
					$state.go("login");
				}
			},
			controllerAs: "$crtl"
		});

	$urlRouterProvider.otherwise('login');

});

