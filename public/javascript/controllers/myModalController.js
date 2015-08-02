(function() {
	'use strict';
	angular.module('app')
	.controller('myModalController', myModalController);

	myModalController.$inject = ["$modal"];

	function myModalController($modalInstance, items) {
		var vm = this;

		vm.ok = function () {
			$modalInstance.close();
		};

		vm.cancel = function () { 
			$modalInstance.dismiss('cancel');
		}
	}
})();