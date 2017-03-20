"use strict";
//this allows the user to add plants to an exisiting 
//garden

app.controller("NewPlantCtrl", function($scope, $window, AuthFactory, PlantStorage, PlantGetter, $routeParams){
//run when use clicks on submit button
let intialG = () => {
 		$scope.currentGarden = PlantGetter.getCurrentGarden();
 		console.log("this is the garden", $scope.currentGarden);
 		
 	};

 	intialG();
    
	let user = AuthFactory.getUser();

	 let gardenId = $scope.currentGarden.id;
	console.log("gardenId", gardenId);
	

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
// grab the time our plantobject was created
	let getDate = ()=> {
		
		var userTime = new Date();
		let miliDate = userTime.getTime();
		let cleanedDate = ((((miliDate / 1000 ) / 60) / 60) / 24);
		let wholeDate = cleanedDate.toFixed(0);
		// userTime.year = userTime.getYear();
		// userTime.month = userTime.getMonth();
		// userTime.day = userTime.getDate();
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
		console.log("you're about to add a plant!", $scope.newPlant);
		
		

		PlantStorage.postNewPlant($scope.newPlant).then(function(comeback){
			// console.log("you added a plant");
			$window.location.href = "#!/plantStuff/gardenView";
		});
	};
});
