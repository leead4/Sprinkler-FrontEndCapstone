"use strict";

app.controller("NewPlantCtrl", function($scope, $window, AuthFactory, PlantStorage, PlantGetter, $routeParams){
let intialG = () => {
 		$scope.currentGarden = PlantGetter.getCurrentGarden(); 		
 	};

 	intialG();
    
	let user = AuthFactory.getUser();

	 let gardenId = $scope.currentGarden.id;	

   $scope.waterObject = {};
   	$scope.waterObject.highWater = '';
   	$scope.waterObject.normalWater = '';
   	$scope.waterObject.drought = '';

   	$scope.intervalOb = {};
   		$scope.intervalOb.intervalOb3 = '';
   		$scope.intervalOb.intervalOb5 = '';
   		$scope.intervalOb.intervalOb7 = '';
   		$scope.intervalOb.intervalObHF = '';

	$scope.newPlant = {
		plantName: '',
		imageURL: '',
		waterType: 0,
		waterObjectRainFall: 0,
		waterObjectUser: 0,
		waterTimeline:'',
		waterInterval:'', 
		uid: user,
		gardenId: gardenId
	};
	
	let getDate = ()=> {
		
		var userTime = new Date();
		let miliDate = userTime.getTime();
		let cleanedDate = ((((miliDate / 1000 ) / 60) / 60) / 24);
		let wholeDate = cleanedDate.toFixed(0);
		$scope.newPlant.waterTimeline = wholeDate;

	};

	$scope.setWaterType = ()=> {
		if ($scope.waterObject.highWater === true){
			$scope.newPlant.waterType = 3;
		}
		if ($scope.waterObject.drought === true){
			$scope.newPlant.waterType = 1;
		}
		if ($scope.waterObject.normalWater === true){
			$scope.newPlant.waterType = 2;
		}
	};

	$scope.setWaterInterval = ()=>{
		if ($scope.intervalOb.intervalOb3 === true){
			$scope.newPlant.waterInterval = 3;
		}
		if ($scope.intervalOb.intervalOb5 === true){
			$scope.newPlant.waterInterval = 5;
		}
		if ($scope.intervalOb.intervalOb7 === true){
			$scope.newPlant.waterInterval = 7;

		}
		if ($scope.intervalOb.intervalObHF === true){
			$scope.newPlant.waterInterval = 0.00005;

		}

	};

	$scope.addYourPlant = (user)=>{
		getDate();
		$scope.setWaterType();
		$scope.setWaterInterval();
		PlantStorage.postNewPlant($scope.newPlant).then(function(comeback){
			$window.location.href = "#!/plantStuff/gardenView";
		});
	};
});
