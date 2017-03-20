"use strict";

app.factory("RainStorage", function(FBCreds, $window, $q, $http, AuthFactory){
	console.log("plant factory wants to run");
	//this is where we do math on our plants!

let getRainData = (startDate, endDate) => {
        // let rainTotal = [];
        return $q(function(resolve, reject){
            
            $http.get(`${FBCreds.databaseURL}/users.json?orderBy="$key"&startAt="${startDate}"&endAt="${endDate}"&print=pretty`)
            .then(function(rainDateNumbers){
                // let rainCollection = 
                resolve(rainDateNumbers.data);
            })
            .catch(function(error){
                reject(error);
            });
        });
    };


return {getRainData};
});