"use strict";

app.controller("YardViewCtrl", function($scope, $q, PlantStorage, $window, $location, PlantGetter, AuthFactory){
	let user = AuthFactory.getUser();

    PlantStorage.getUserGardens(user).then(function(userGardenList){
		$scope.userGardens = userGardenList;
	});

    $scope.setThisGarden = function(thisGarden){
	
		PlantGetter.setCurrentGarden(thisGarden);
		$window.location.href = "#!/plantStuff/gardenView";
	};
});


	