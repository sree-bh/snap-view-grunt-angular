(function (ng) {
	'use strict';

	ng
	    .module('sn-ctrl', [])
	    .controller('snController', snCtrl);

	snCtrl.$inject = ['snDataService', '$interval', '$timeout'];

	function snCtrl(snDataService, $interval, $timeout) {
		/* jshint ignore:start */
		var self = this;
		/* jshint ignore:end */

		//Properties
		self.snapList = snDataService.snapList;

		// Methods
	}
})(angular);