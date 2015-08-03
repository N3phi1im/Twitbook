(function() {
	'use strict';
	angular.module('app')
	.controller('homeController', homeController);

	homeController.$inject = ['HomeFactory', 'UserFactory'];

	function homeController(HomeFactory, UserFactory) {
		var vm = this;
		vm.posts = HomeFactory.posts;
	}
})();