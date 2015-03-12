var app = angular.module('myApp',[]);
app.controller('myController', ['$scope', function($scope){
	$scope.names = ['Amar','Akbar','Antony'];
	$scope.change = function() {
		$scope.names[2] = 'Test';
	}
}]);

app.directive('customRepeat', function(){
	// Runs during compile
	return {
		
		transclude: 'element',
		link: function($scope, iElm, iAttrs, controller,transclude) {
		 var str = iAttrs.customRepeat,
		 match = str.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),
		 collectionName = match[2],
		 itemName = match[1],
		 parent = iElm.parent(),
		 elements = [];
		 
		 $scope.$watchCollection(collectionName, function(collection) {
		 	for(var i=0;i<elements.length;i++) {
		 		elements[i].elem.remove();
		 		elements[i].scope.$destroy();
		 	}
		 	for(var i=0;i<collection.length;i++) {
		 		var scope = $scope.$new();
		 		scope.name = collection[i];
		 		transclude(scope,function(clone){
		 			parent.append(clone);
		 			var el = {};
		 			el.scope = scope;
		 			el.elem = clone;
		 			elements.push(el);
		 		});
		 	}
		 });
		}
	};
});
