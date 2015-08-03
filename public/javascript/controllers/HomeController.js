(function() {
	'use strict';
	angular.module('app')
	.controller('homeController', homeController);

	homeController.$inject = ['HomeFactory'];

	function homeController(HomeFactory) {
		var vm = this;
		vm.posts = HomeFactory.posts;
		console.log(vm.posts);
	}
})();