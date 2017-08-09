"use strict";

app.factory("WeatherStorage", function(FBCreds, $window, $q, $http, AuthFactory){
	let getWeather = () => {
        return $q(function(resolve, reject){
        	$http.get(`${FBCreds.weatherDataBaseURL}/api/${FBCreds.weatherKey}/forecast/q/TN/Nashville.json`)
           .then(function(weatherData){
                resolve(weatherData);
            })
            .catch(function(error){
                reject(error);
            });
        });
    };

return {getWeather};
});