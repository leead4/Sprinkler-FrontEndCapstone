"use strict";

app.controller("NewGardenCtrl", function($scope, AuthFactory, $window, $location, PlantStorage){
	let user = AuthFactory.getUser();

	$scope.newGardenObject = {
		gardenName:'',
		gardenZip: '',
 		uid: user,
 		sunValue: false,
 		partShadeValue: false,
 		fullShadeValue: false
 	};

	$scope.addYourGarden = function(){
		PlantStorage.addNewGarden($scope.newGardenObject).then(function(comeback){
			$window.location.href = "#!/yardView";
			$scope.$apply();
		});


	};

	$scope.goBacktoYardview = function() {
		$window.location.href = "#!/yardView";
		$scope.apply();
		
		};
});

