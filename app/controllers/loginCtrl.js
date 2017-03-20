"use strict";

app.controller("UserCtrl", function($scope, $window, AuthFactory, $location, PlantStorage){
	// console.log("userctrl wants to run");
	$scope.account = {
		email: "",
		password: ""
	};

	let logout = () => {
		console.log("logout clicked");
		AuthFactory.logoutUser()
		.then(function(data){
			// console.log("logged out?", data);
			$window.location.url = "/login";
		}, function(error){
			console.log("error occured on logout");
		});
	};

 //when first loaded, make sure no one is logged in
	if(AuthFactory.isAuthenticated()){
		logout();
	}
	

	//setup functions to be available to the app for register, login email/password, and google
	$scope.register = () => {
    	console.log("you clicked register");
	    AuthFactory.createUser({
	      email: $scope.account.email,
	      password: $scope.account.password
	    })
	    .then((userData) => {
	      console.log("UserCtrl newUser:", userData );
	      $scope.login();
	    }, (error) => {
	        console.log("Error creating user:", error);
	    });
  	};

  	$scope.login = () => {
		 console.log("you clicked login");
    	AuthFactory.loginUser($scope.account)
    	.then(function(potato){
    	PlantStorage.getUserGardens(potato.uid)
		.then((gardensObject)=>{
		 console.log("gardensobject", gardensObject);
			if (gardensObject.length === 0){
 				 console.log("THERE IS NOTHING IN YOUR LIFE");
 				$scope.isLoggedIn = true;
 				$window.location.href = "#!/plantStuff/gardenBuilder";
 			}else {
 				$scope.gardenExists = true;
 				$scope.isLoggedIn = true;
 				// console.log("YOU DID HAVE SOMETHING IN YOUR LIFE");
 				console.log("gardensObject", gardensObject);
 				$window.location.href = "#!/yardView";
			}
		}, (error) =>{
				//we could run something here-a custom error page-->stretch goals
				console.log("it messed up your promise is not happy");
		});
		
		});
	};
});
