"use strict";

app.controller("NewGardenCtrl", function($scope, AuthFactory, $window, $location, PlantStorage){
	console.log("gardenCtrl wants to run");
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
		console.log("add garden", $scope.newGardenObject);
		// send that data to firebase
		PlantStorage.addNewGarden($scope.newGardenObject).then(function(comeback){
			// console.log("added a garden you should probably do stuff");
			$window.location.href = "#!/yardView";
			$scope.$apply();
		});
	};
});

