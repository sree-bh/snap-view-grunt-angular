(function (ng) {
	'use strict';

	ng
	    .module('sn-widget', [])
	    .directive('snapViewer', snViewer);

	snViewer.$inject = ['$timeout', '$interval'];

	function snViewer($timeout, $interval) {
		var lastSnap,
	    	ssInterval,
	    	directive = {
			    link: link,
			    scope: {
			    	snData: '='
			    },
				template: [
		            '<div>',
			            '<div class="controls">',
			            	'<button ng-click="prev()">',
			           			'&lt;',
				            '</button>',
				            '<button ng-click="slideShow()">',
				           		'Slide Show {{action}}',
			           	    '</button>',
				           	'<button ng-click="next()">',
				           		'&gt;',
			           		'</button>',
		           		'</div>',
		           		'<div ng-repeat="item in snData track by $index"',
		    	            'class="slide-container {{item.cls}}">',
		           			'<div style="background-image: url({{item.path}});" class="slide"></div>',
	           			'</div>',
	       			'</div>'
				].join(''),
				replace: true,
				restrict: 'EA'
		};
		
		return directive;
		
		function link(scope, el, attrs) {
			lastSnap = scope.snData.length - 1;
			scope.action = 'Play';
			scope.snData[lastSnap].cls = 'left';
			scope.snData[0].cls = 'shown';
			scope.snData[1].cls = 'next';
			scope.currentIdx = 0;
			scope.nextIdx = 1;
			scope.prevIdx = lastSnap;

			// Methods
			scope.slideShow = slideShow;
			scope.next = next;
			scope.prev = prev;
			
			function pause() {
				if (!!ssInterval) {
					$interval.cancel(ssInterval);
					ssInterval = null;
					scope.action = 'Play';
					
					return true;
				}
			}
			
			function slideShow() {
				if (pause()) {
					return;
				}
				
				scope.action = 'Pause';
				ssInterval = $interval(fnslideShow, 5000);
			}
			
			function fnslideShow(stopSS, isPrev) {
				
				if (stopSS === true) {
					pause();
				}
				
				if (scope.animationProgress) {
					return;
				}
				
				scope.animationProgress = true;
				
				if (isPrev) {
					$timeout(function () {
						scope.snData[scope.prevIdx].cls = 'animate shown';
						scope.snData[scope.currentIdx].cls = 'next';
						scope.snData[scope.nextIdx].cls = '';
						scope.nextIdx = scope.currentIdx;
						scope.currentIdx = scope.prevIdx;
						scope.prevIdx = scope.currentIdx === 0 ? lastSnap: scope.prevIdx-1;
					}, 1);
				} else {
					$timeout(function () {
						scope.snData[scope.prevIdx].cls = '';
						scope.snData[scope.currentIdx].cls = 'animate shown left';
						scope.prevIdx = scope.currentIdx;
						scope.currentIdx = scope.nextIdx;
						scope.nextIdx = scope.currentIdx === lastSnap ? 0: scope.nextIdx + 1;
					}, 1);
				}
				
				$timeout(function () {
					scope.snData[scope.prevIdx].cls = 'left';
					scope.snData[scope.currentIdx].cls = 'shown';
					scope.snData[scope.nextIdx].cls = 'next';
					scope.animationProgress = false;
				}, 1500);
			}
			
			function next() {
				fnslideShow(true);
			}
			
			function prev() {
				fnslideShow(true, true);
			}
		}
	}
})(angular);