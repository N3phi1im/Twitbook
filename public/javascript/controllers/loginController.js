(function() {
	'use strict';
	angular.module('app')
	.controller('loginController', loginController);

	loginController.$inject = ["UserFactory", "$state"];

	function loginController(UserFactory, $state) {
		var lg = this;
		lg.user = {};
		lg.status = UserFactory.status;
		lg.register = register;
		lg.login = login;
		lg.logout = UserFactory.logout;

		function register() {
			var u = lg.user;
			if(!u.username || !u.password || !u.cpassword || !(u.password === u.cpassword)) {
				return false;
			}
			UserFactory.register(u).then(function() {
				$state.go('Home');
			});
		}
		function login() {
			UserFactory.login(lg.user).then(function() {
				$state.go('Home');
			});
		}
	}
})();