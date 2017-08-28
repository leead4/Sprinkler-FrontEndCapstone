"use strict";

app.controller("UserCtrl", function($scope, $document, $window, AuthFactory, $location, PlantStorage, PlantGetter, WeatherStorage){
	

	$scope.account = {
		email: "",
		password: ""
	};


	let logout = () => {
		console.log("logout clicked");
		AuthFactory.logoutUser()
		.then(function(data){
			$window.location.url = "/login";
		}, function(error){
			console.log("error occured on logout");
		});
	};

	if(AuthFactory.isAuthenticated()){
		logout();
	}
	
	$scope.register = () => {
	    AuthFactory.createUser({
	      email: $scope.account.email,
	      password: $scope.account.password
	    })
	    .then((userData) => {
	      $scope.login();
	    }, (error) => {
	        console.log("Error creating user:", error);
	    });
  	};

  	$scope.login = () => {
    	AuthFactory.loginUser($scope.account)
    	.then(function(potato){
    	PlantStorage.getUserGardens(potato.uid)
		.then((gardensObject)=>{
			if (gardensObject.length === 0){
 				$scope.isLoggedIn = true;
 				WeatherStorage.getWeather().then(function(weatherInfo){
 					PlantGetter.setCurrentForecast(weatherInfo);
 				});
 				$window.location.href = "#!/plantStuff/gardenBuilder";
 			}else {
 				$scope.gardenExists = true;
 				$scope.isLoggedIn = true;
 				WeatherStorage.getWeather().then(function(weatherInfo){
 					PlantGetter.setCurrentForecast(weatherInfo);
 				});
 				$window.location.href = "#!/yardView";
			}
		}, (error) =>{
				console.log("it messed up your promise is not happy");
		});
		
		});
	};

});
