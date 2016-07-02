(function (ng) {
    'use strict';

    ng
    .module('sn-service', [])
    .service('snDataService', snService);
	
    snService.$inject = ['$q', '$http'];

    function snService($q, $http) {
        /* jshint ignore:start */
        var self = this;
        /* jshint ignore:end */

    	self.snapList = [
            {
            	path: 'gallery/Koala.jpg',
            	cls: '',
            },
            {
            	path: 'gallery/Chrysanthemum.jpg',
            	cls: '',
            },
        	{
            	path: 'gallery/Desert.jpg',
            	cls: '',
            },
        	{
            	path: 'gallery/Penguins.jpg',
            	cls: '',
            },
        	{
            	path: 'gallery/Tulips.jpg',
            	cls: '',
            },
        	{
            	path: 'gallery/Lighthouse.jpg',
            	cls: ''
            }
        ];

    	function init() {
    		
    	}
    }
})(angular);