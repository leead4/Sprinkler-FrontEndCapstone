"use strict";

app.controller("UpdatePlantCtrl", function(PlantGetter, $scope, $window, AuthFactory, PlantStorage){
	$scope.currentPlant = {};

 	let intial = () => {
 		$scope.currentPlant = PlantGetter.getCurrentPlant();
 	};

 	intial();

	let plantId = $scope.currentPlant.id;
	let plantName = $scope.currentPlant.plantName;
	let imageURL = $scope.currentPlant.imageURL;
	let waterObjectRainFall = $scope.currentPlant.waterObjectRainFall;
	let waterObjectUser = $scope.currentPlant.waterObjectUser;
	let uid = $scope.currentPlant.uid;
	let gardenId = $scope.currentPlant.gardenId;
	let waterTimeline = $scope.currentPlant.waterTimeline;
   	
   	$scope.waterObject = {};
   	$scope.waterObject.highWater = '';
   	$scope.waterObject.normalWater = '';
   	$scope.waterObject.drought = '';
   	
   	$scope.intervalOb = {};
   		$scope.intervalOb.intervalOb3 = '';
   		$scope.intervalOb.intervalOb5 = '';
   		$scope.intervalOb.intervalOb7 = '';
   		$scope.intervalOb.intervalObHF = '';
		
		$scope.updatedPlant = {
			plantName: plantName,
			id: plantId,
			imageURL: imageURL,
			waterType: 0,
			waterObjectRainFall: waterObjectRainFall,
			waterObjectUser: waterObjectUser,
			waterTimeline: waterTimeline,
			waterInterval: 0, 
			uid: uid,
			gardenId: gardenId

		};

	$scope.setWaterType = ()=> {
		if ($scope.waterObject.highWater === true){
			$scope.updatedPlant.waterType = 3;
		}
		if ($scope.waterObject.drought === true){
			$scope.updatedPlant.waterType = 1;
		}
		if ($scope.waterObject.normalWater === true){
			$scope.updatedPlant.waterType = 2;
		}
	};

	$scope.setWaterInterval = ()=>{
		if ($scope.intervalOb.intervalOb3 === true){
			$scope.updatedPlant.waterInterval = 3;
		}
		if ($scope.intervalOb.intervalOb5 === true){
			$scope.updatedPlant.waterInterval = 5;
		}
		if ($scope.intervalOb.intervalOb7 === true){
			$scope.updatedPlant.waterInterval = 7;

		}
		if ($scope.intervalOb.intervalObHF === true){
			$scope.updatedPlant.waterInterval = 0.00005;

		}

	};

		
		$scope.updateThisPlant = ()=>{

		$scope.setWaterType();
		$scope.setWaterInterval();
		PlantStorage.updatePlant($scope.updatedPlant.id, $scope.updatedPlant)
		.then(function(stuff){
			$window.location.href = "#!/plantStuff/gardenView";
		 });
	};




	$scope.goBack = () => {
		$window.location.href = "#!/plantStuff/gardenView";
	};


});
