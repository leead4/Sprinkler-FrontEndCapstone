"use strict";

app.factory("RainStorage", function(FBCreds, $window, $q, $http, AuthFactory){

let getRainData = (startDate, endDate) => {
        return $q(function(resolve, reject){
            
            $http.get(`${FBCreds.databaseURL}/users.json?orderBy="$key"&startAt="${startDate}"&endAt="${endDate}"&print=pretty`)
            .then(function(rainDateNumbers){
                resolve(rainDateNumbers.data);
            })
            .catch(function(error){
                reject(error);
            });
        });
    };


return {getRainData};
});