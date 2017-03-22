"use strict";
///this shows the user a specific garden and the plants
//in that garden

app.controller("GardenViewCtrl", function($scope, $route, $routeParams, $window, $location, PlantGetter, PlantStorage, AuthFactory){
	// console.log('gardenview wants to run');
	let user = AuthFactory.getUser();
	$scope.styleObject = {};
	// $scope.gardenId = $routeParams.gardenId;
	// console.log("routeparamsgardenid", $routeParams.gardenId);
	
	// PlantStorage.getSingleGarden($routeParams.gardenId).then(function(userPlantlist){
	// 	// console.log("userPlantlist", userPlantlist);
	// 	$scope.userGarden = userPlantlist;
	// });
	$scope.currentGarden = {};
	// $scope.objectStyle = {};

 	let intialG = () => {
 		$scope.currentGarden = PlantGetter.getCurrentGarden();
 	

 		console.log("this is the garden", $scope.currentGarden);
 		// console.log("this is the id your filtering", $scope.currentGarden.id);
 		let gardenKey = $scope.currentGarden.id;
 		$scope.filterGarden = gardenKey;
 		
 	
      };

      
 		


 

 	intialG();

 	 


	let filterfunction = (items)=> {
	// function to invoke by Angular each time
  // Angular passes in the `items` which is our Array
  // return function (items) {
  	var userTime = new Date();
    	let miliDate = userTime.getTime();
    	let cleanedDate = ((((miliDate / 1000 ) / 60) / 60) / 24);
    	let wholeDate = cleanedDate.toFixed(0);
    	// console.log(wholeDate);
    // Create a new Array
    // let filtered = [];

    // loop through existing Array
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      // console.log("item", items[i]);
      let dirtyPlant = items[i].waterTimeline;
      let cleanPlant = parseInt(dirtyPlant);
      let dateDiff = wholeDate - cleanPlant;
      // console.log("dateDiff", dateDiff);
      let interval = items[i].waterInterval;
      // console.log("interval", interval);
      // check if the individual Array element begins with `a` or not
      if (dateDiff > interval) {
         $scope.styleObject = "fadeClass";
        items[i].styleObject = $scope.styleObject;
        // push it into the Array if it does!
        // $scope.styleObject = "fadeClass";
	  }
	   else {
	   	$scope.styleObject = " ";
	   }

    }
    // boom, return the Array after iteration's complete
    // console.log("filteredarray", items);
     // return filtered;
  };



	
	PlantStorage.getUserPlantList(user).then(function(userPlantList){
		// console.log("userPlantList", userPlantList);

		filterfunction(userPlantList);
		// console.log("filterFunction", userPlantList);
		$scope.userPlants = userPlantList;
	
	});


    


	
    
    	
    
///filter plants to only show whats in their garden///////
	$scope.goToPlantView = (plantId)=>{
		// console.log("you clicked go to plantview", plant.id);
		$window.location.href= "#!/plantStuff/plantView/plantId";

	};
	
	$scope.setThisPlant = function(plantpotato){
		PlantGetter.setCurrentPlant(plantpotato);
		console.log("we set this plant", plantpotato);
		
		$window.location.href = "#!/plantStuff/plantView";

	};
	$scope.killTheWabbit = function(plantId){
		// console.log("kill the wabbit", plantId);
		PlantStorage.deleteUserPlant(plantId).then(function(comeback){
			// $window.location.href = "#!/plantStuff/gardenView";
			// $scope.apply();
			$route.reload();
		});
	};
	$scope.goBackToTheYard = function(){
		$window.location.href = "#!/yardView";
	};
	

});
