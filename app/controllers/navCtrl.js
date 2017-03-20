"use strict";

app.controller("NavCtrl", function($scope, $location, $window){
	$scope.isLoggedIn = false;
	
	firebase.auth().onAuthStateChanged(function(user){
		if (user) {
			$scope.isLoggedIn = true;
			// console.log("currentUser logged in", $scope.isLoggedIn);
		}else{ 
			$scope.isLoggedIn = false;
			// console.log("currentuser logged in", $scope.isLoggedIn);
			$window.location.href= "#!/login";
		}
	});
});