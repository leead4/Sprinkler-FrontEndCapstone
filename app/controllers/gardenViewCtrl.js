"use strict";

app.controller("GardenViewCtrl", function($scope, $route, $routeParams, $window, $location, PlantGetter, PlantStorage, AuthFactory){
	let user = AuthFactory.getUser();
	$scope.styleObject = {};
	$scope.currentGarden = {};
	
 	let intialG = () => {
 		$scope.currentGarden = PlantGetter.getCurrentGarden();
 		let gardenKey = $scope.currentGarden.id;
 		$scope.filterGarden = gardenKey;
      };

 	intialG();

	let filterfunction = (items)=> {
	
  	var userTime = new Date();
    	let miliDate = userTime.getTime();
    	let cleanedDate = ((((miliDate / 1000 ) / 60) / 60) / 24);
    	let wholeDate = cleanedDate.toFixed(0);
    
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      let dirtyPlant = items[i].waterTimeline;
      let cleanPlant = parseInt(dirtyPlant);
      let dateDiff = wholeDate - cleanPlant;
      let interval = items[i].waterInterval;
      if (dateDiff > interval) {
         $scope.styleObject = "fadeClass";
        items[i].styleObject = $scope.styleObject;
	  }
	   else {
	   	$scope.styleObject = " ";
	   }

    }
  };
	PlantStorage.getUserPlantList(user).then(function(userPlantList){
		filterfunction(userPlantList);
		$scope.userPlants = userPlantList;
	});
  	$scope.goToPlantView = (plantId)=>{
		$window.location.href= "#!/plantStuff/plantView/plantId";
	};
	$scope.setThisPlant = function(plantpotato){
		PlantGetter.setCurrentPlant(plantpotato);		
		$window.location.href = "#!/plantStuff/plantView";
	};
	$scope.killTheWabbit = function(plantId){
		PlantStorage.deleteUserPlant(plantId).then(function(comeback){
			$route.reload();
		});
	};
	$scope.goBackToTheYard = function(){
		$window.location.href = "#!/yardView";
	};
});
