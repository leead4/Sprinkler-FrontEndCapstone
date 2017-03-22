"use strict";

var app = angular.module('GardenCalc', ['ngRoute']);

let isAuth = (AuthFactory) => new Promise ( (resolve, reject) => {
  // console.log("running isAuth");
    AuthFactory.isAuthenticated()
    .then ( (userExists) => {
    console.log("userExists", userExists);
        if (userExists){
      console.log("Authenticated, go ahead.");
            resolve();
        }else {
      console.log("Authentication rejected, go away.");
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
    // var userTime = new Date();
    // let miliDate = userTime.getTime();
    // let cleanedDate = ((((miliDate / 1000 ) / 60) / 60) / 24);
    // let wholeDate = cleanedDate.toFixed(0);
    
    // angular.forEach(userPlants, function(plant){
    //   let dirtyPlant = plant.waterTimeLine;
    //   let cleanPlant = parseInt(cleanPlant);
    //   let dateDiff = wholeDate - cleanPlant;
      
    //   if (dateDiff < plant.waterInterval){
    //     $scope.objectStyle = {
    //       "opacity": ".5",
    //       "background-color": "orange"
    //     };
        
    //   }
     
    // });
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
     // otherwise('/');


	
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


