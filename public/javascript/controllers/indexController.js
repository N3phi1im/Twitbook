(function() {
	'use strict';
	angular.module('app')
	.controller('indexController', indexController);

	indexController.$inject = ["$modal"];

	function indexController($modal) {
		var ix = this;

		// Right Hand Menu Dropdown 
		ix.status = {
			isopen: false
		};

		ix.toggleDropdown = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			ix.status.isopen = !ix.status.isopen;
		};

		// Modal for Post Button

		ix.open = function (size) {

			var modalInstance = $modal.open({
				animation: true,
				templateUrl: 'views/myModalContent.html',
				controller: 'myModalController',
			});
		};
	}
})(); 