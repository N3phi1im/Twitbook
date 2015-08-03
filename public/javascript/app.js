(function() {
	'use strict';
	angular.module('app', ['ui.router', 'ui.bootstrap', 'dialogs'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/home',
			templateUrl: 'views/home.html'
		}).state('Login',{
			url: '/',
			templateUrl: 'views/login.html'
		}).state('Profile',{
			url: '/Profile',
			templateUrl: 'views/profile.html'
		}).state('Register',{
			url: '/Register',
			templateUrl: 'views/register.html'
		});
		$urlRouterProvider.otherwise('/');
	}
})();

