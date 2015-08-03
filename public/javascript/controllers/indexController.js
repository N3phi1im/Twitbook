(function() {
	'use strict';
	angular.module('app')
	.controller('indexController', indexController);

	indexController.$inject = ["$modal", "$dialogs"];

	function indexController($modal, $dialogs) {
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
	}
})();
