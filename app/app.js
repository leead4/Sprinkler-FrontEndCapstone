"use strict";

var app = angular.module('GardenCalc', ['ngRoute']);

let isAuth = (AuthFactory) => new Promise ( (resolve, reject) => {
    AuthFactory.isAuthenticated()
    .then ( (userExists) => {
        if (userExists){
            resolve();
        }else {
            reject();
        }
    });
});



app.filter("stalePlant", function($scope){
    return function(userPlants){

    $scope.objectStyle = {};
    angular.forEach(userPlants, function(plant){

      $scope.objectStyle = {
        "opacity" : ".5"
      };
      console.log("userPlantsin Filter", userPlants);
    });
   
return userPlants;
};

});

app.config(function($routeProvider){
	
	$routeProvider. 
	when('/', {
		templateUrl: 'partials/loginView.html',
		controller: "UserCtrl"
	}).
	when('/login', {
		templateUrl: 'partials/loginView.html',
		controller: "UserCtrl"
	}).
    when('/logout', {
        templateUrl: 'partials/loginView.html',
        controller: "UserCtrl"
     }).
    when('/yardView', {
        templateUrl: 'partials/yardView.html',
        controller: "YardViewCtrl",
        resolve: {isAuth}
    }).
    when('/plantStuff/gardenView', {
      templateUrl: 'partials/gardenView.html',
      controller: "GardenViewCtrl"
    }).
    when('/plantStuff/gardenBuilder', {
      templateUrl: 'partials/gardenBuilder.html',
      controller: "NewGardenCtrl",
      resolve: {isAuth}
    }).
    when('/plantStuff/plantBuilder/:gardenId', {
      templateUrl: 'partials/newPlantBuilder.html',
      controller: "NewPlantCtrl",
      resolve: {isAuth}
    }).
    when('/plantStuff/plantView', {
      templateUrl: 'partials/plantView.html',
      controller: "PlantViewCtrl",
      resolve: {isAuth}
    }).
    when('/plantStuff/gardenhose', {
      templateUrl: 'partials/gardenHoseView.html',
      controller: "WaterCtrl",
      resolve: {isAuth}
    }).
    when('/plantStuff/updatePlant', {
      templateUrl: 'partials/updateView.html',
      controller: "UpdatePlantCtrl",
      resolve: {isAuth}
    });
	
});

app.run(($location, FBCreds)=> {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain,
        databaseURL: creds.databaseURL
    };

    firebase.initializeApp(authConfig);
});


