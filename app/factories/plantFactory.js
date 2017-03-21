"use strict";

app.factory("PlantGetter", function(){
	
	let currentPlant = {};
	let currentGarden = {};
	let currentPlantList = {};
	let currentForecast = {};

	let getCurrentForecast = () => {
		return currentForecast;
	};

	let setCurrentForecast = (something)=> {
		currentForecast = something;

	};

	let getCurrentPlant = ()=> {
		return currentPlant;

	};

	let setCurrentPlant = (something) =>{
		currentPlant = something;


	};

	let getCurrentGarden = ()=> {
		return currentGarden;
	};

	let setCurrentGarden = (something)=> {
		currentGarden = something;
	};

	let setCurrentPlantList = (something) =>{
		currentPlantList = something;
	};

	let getCurrentPlantList = () =>{
		return currentPlantList;
	};

	return {getCurrentPlant, setCurrentPlant, getCurrentGarden, setCurrentGarden, setCurrentPlantList, getCurrentPlantList, getCurrentForecast, setCurrentForecast};

});