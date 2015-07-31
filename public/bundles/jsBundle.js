(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html'
		});
		$urlRouterProvider.otherwise('/');
	}
})();


(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	HomeController.$inject = [];

	function HomeController() {
		var vm = this;
		vm.title = 'This is amazing!';
	}
})();
(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {};
		
		return o;
	}
})();