"use strict";
//pulls down the user's gardens, displays their names
// and makes the garden id's accessible-
//gardenId will be used to get the user to the single garden view

app.controller("YardViewCtrl", function($scope, $q, PlantStorage, $window, $location, PlantGetter, AuthFactory){
	console.log("yardctrl is here");
	
	let user = AuthFactory.getUser();
    
    PlantStorage.getUserGardens(user).then(function(userGardenList){
		console.log("userGardenList", userGardenList);
		$scope.userGardens = userGardenList;

	});



    $scope.setThisGarden = function(thisGarden){
	
		PlantGetter.setCurrentGarden(thisGarden);
		console.log("thisGarden", thisGarden);
		$window.location.href = "#!/plantStuff/gardenView";
	


	};
});


	