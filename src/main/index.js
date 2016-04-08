"use strict"

import {toArray} from "../shared/to-array";
import {cache} from "../shared/cache-srv";
import {signInSrv} from "../sign-in/sign-in-srv";
import {mailAppSrv} from "../mail-app/mail-app-srv";
import {contactsSrv} from "../contacts/contacts-srv";
import {messagesSrv} from "../messages/messages-srv";
import {signIn} from "../sign-in/sign-in";
import {mailApp} from "../mail-app/mail-app";
import {contacts} from "../contacts/contacts";
import {contact} from "../contact/contact";
import {messages} from "../messages/messages";
import {msg} from "../msg/msg";

let app = angular.module("myMail", ["ngMaterial", "ui.router", "ngMdIcons"]);

app.filter("toArray", toArray);
app.service("cacheSrv", cache);
app.service("signInSrv", signInSrv);
app.service("mailAppSrv", mailAppSrv);
app.service("contactsSrv", contactsSrv);
app.service("messagesSrv", messagesSrv);
app.component("signIn", signIn);
app.component("mailApp", mailApp);
app.component("contacts", contacts);
app.component("contact", contact);
app.component("messages", messages);
app.component("msg", msg);

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
		})
		.state("mail-app.folders", {
			url: "/:folderId",
			template: `<messages messages="$ctrl.messages"></messages>`,
			resolve: {
				data: ["$stateParams", "cacheSrv", function($stateParams, cacheSrv) {
					let messagesTmp = cacheSrv.getMessages();
					let messages = {};
					for (let key of Object.keys(messagesTmp)) {
						if ((messagesTmp[key].boxId).toString() === $stateParams.folderId) {
							messages[key] = messagesTmp[key];
						}
					}
					return messages;
				}]
			},
			controller: function(data) {
				this.messages = data;
			},
			controllerAs: "$ctrl"
		})
		.state("mail-app.folders.message", {
			url: "/:msgId",
			template: `<msg message="$ctrl.message"></msg>`,
			resolve: {
				msgContent: ["$stateParams", "cacheSrv", function($stateParams, cacheSrv) {
					let messages = cacheSrv.getMessages();
					let msgId = $stateParams.msgId;
					let msg = messages[msgId];
					return msg;
				}]
			},
			controller: function(msgContent) {
				this.message = msgContent;
			},
			controllerAs: "$ctrl"
		});

	$urlRouterProvider.otherwise('login');

});

