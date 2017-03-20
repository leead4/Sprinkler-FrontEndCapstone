"use strict";

app.controller("PlantViewCtrl", function($scope, $routeParams, $document, RainStorage, PlantStorage, $window, WeatherStorage, PlantGetter){
    //initializing the modalview
    $document.ready(function(){
    	$('#waterCheck').modal();
    });

    $scope.clickIt = ()=>{
		$('#modal1').modal('close');
    };

 	//we need to get our current plant from PlantGetter

 	$scope.currentPlant = {};


 	let intial = () => {
 		$scope.currentPlant = PlantGetter.getCurrentPlant();
 		console.log("this is the plant", $scope.currentPlant);
 	};

 	intial();
    
    //we will probably write these into a factory
    //this is to get the current date for the update
	
	let getDate = ()=> {
		
		var userTime = new Date();
		let miliDate = userTime.getTime();
		let cleanedDate = ((((miliDate / 1000 ) / 60) / 60) / 24);
		let wholeDate = cleanedDate.toFixed(0);
		return wholeDate;
		
	};
	

	$scope.tellUsertoCheck = ()=> {
		console.log("check your plant");
	};

	$scope.tellUsertoWait = ()=> {
		console.log("don't water your plant-you're within your interval");
	};


	$scope.checkWater = ()=>{
		//this checks our user's interval and compares the date they 
		//last checked their plant info 
		
		let nowDate = getDate();
		// console.log("nowdate", nowDate);
		// console.log("plantObject", $scope.currentPlant);

		let oldDate = $scope.currentPlant.waterTimeline;
	    let cleanDate = parseInt(oldDate);
		// console.log("old", cleanDate);

		let interval = $scope.currentPlant.waterInterval;
		
		let dateDiff = nowDate - cleanDate;

		if (dateDiff >= interval){
			$scope.tellUsertoCheck();
		}else{
			$scope.tellUsertoWait();
		}
	};


	$scope.callRainData = () => {

		//we need to get our start date and end date
		//for our raindata api call
		//end date is now minus the interval
		let ourInterval = $scope.currentPlant.waterInterval;
		let rainNow = getDate();
		let rainEarlier = rainNow - ourInterval; 
		// console.log("rainNow", rainNow);
		// console.log("rainEarlier", rainEarlier);

		RainStorage.getRainData(rainEarlier, rainNow).then(function(rainNumbers){
		// console.log("rainNumbers", rainNumbers);
		let rainArray = Object.values(rainNumbers);
		let arraySum = 0;
		for (var i = 0; i < rainArray.length; i++){
			arraySum += rainArray[i];
		}
		// console.log("arraySum", arraySum);
		$scope.rainNumber = arraySum;
		// console.log("rainNumber", $scope.rainNumber);
		return $scope.rainNumber;
		
		});



	};

	$scope.goBack = () =>{
		$window.location.href = "#!/plantStuff/gardenView";
	};

	$scope.getTheForecast = () => {
		WeatherStorage.getWeather().then(function(forecast){
			console.log("forecast", forecast);
			console.log("forecastday 1", forecast.data.forecast.simpleforecast.forecastday[1].high.value);
			console.log("forecast.data.forecast.simpleforecast...dayobject", forecast.data.forecast.simpleforecast.forecastday);
			console.log("forecast.data.forecast.simpleforecast..high", forecast.data.forecast.simpleforecast.forecastday[3].high);
			console.log("forecast.data.forecast.simpleforecast...conditions", forecast.data.forecast.simpleforecast.forecastday[3].conditions);	



			$scope.forecastData = forecast;
		});

	};
	



	///////////////our user want's to update the water in their plant 
	///////////////object



	let plantId = $scope.currentPlant.id;
	let plantName = $scope.currentPlant.plantName;
	let imageURL = $scope.currentPlant.imageURL;
	let waterType = $scope.currentPlant.waterType;
	let waterInterval = $scope.currentPlant.waterInterval;
	let uid = $scope.currentPlant.uid;
	let gardenId = $scope.currentPlant.gardenId;
	let updateDate = getDate();
	
		
		$scope.updatedPlant = {
			plantName: plantName,
			id: plantId,
			imageURL: imageURL,
			waterType: waterType,
			waterObjectRainFall: '',
			waterObjectUser: '',
			waterTimeline: updateDate,
			waterInterval: waterInterval, 
			uid: uid,
			gardenId: gardenId

		};
	/////////////////////////////////////
	///////////we're taking this object and adding to firebase

	$scope.updateThisPlant = ()=>{
		let waterObjectUser = $scope.userInput;
		let cleanUserInput = parseInt(waterObjectUser);
		// console.log("cleanuserinput", cleanUserInput);
		$scope.updatedPlant.waterObjectUser = cleanUserInput;
		let waterObjectRainFall = $scope.rainNumber;
		$scope.updatedPlant.waterObjectRainFall = waterObjectRainFall;

		// console.log("waterObjectrainfall", $scope.updatedPlant.waterObjectRainFall);
		// console.log("$scope.updatedPlant", $scope.updatedPlant);

		PlantStorage.updatePlant($scope.updatedPlant.id, $scope.updatedPlant)
		.then(function(stuff){
			$window.location.href = "#!/plantStuff/gardenView";
		 });


	};


		
		
		
		

});