"use strict";

app.factory("PlantStorage", (FBCreds, $window, $q, $http, AuthFactory) =>{
    
    let getUserPlantList = (user)=> {
		let plants = [];
    
        return $q((resolve, reject) => {
	        $http.get(`${FBCreds.databaseURL}/plantItems.json?orderBy="uid"&equalTo="${user}"`)
	        .then((plantObject) => {
		     // console.log("plantObject", plantObject.data);
		     let plantCollection = plantObject.data;
		     Object.keys(plantCollection).forEach((key)=>{
			    plantCollection[key].id = key;
			    plants.push(plantCollection[key]);
		     });
	           resolve(plants);
	        })
	        .catch((error) =>{
		       reject(error);
	        });

        });
    };

    let getUserGardens = (user) => {
	   let gardens = [];
	   return $q((resolve, reject) => {
	       $http.get(`${FBCreds.databaseURL}/gardens.json?orderBy="uid"&equalTo="${user}"`)
		   .then((gardenObject) =>{
             // console.log("THIS IS WHAT YOU WANT", Object.keys(gardenObject.data));
            // console.log("gardenObject", gardenObject.data);
	        let gardenCollection = gardenObject.data;
            Object.keys(gardenCollection).forEach((key) =>{
                gardenCollection[key].id = key;
                gardens.push(gardenCollection[key]);
                // console.log("gardens-right before your resolve", gardens);
            });
             // console.log("gardens--this is your firefactory return", gardens);
                resolve(gardens);
            })
           .catch((error) =>{
                console.log("error", error);
                console.log("something went wrong with your firebase call");
		        reject(error);
	       });
        });
    };

 
    let postNewPlant = (newPlant) => {
        // console.log(newPlant);
	    return $q((resolve, reject) => {
		    $http.post(`${FBCreds.databaseURL}/plantItems.json`, 
			JSON.stringify(newPlant))
		    .then((ObjectFromFirebase) => {
			     resolve(ObjectFromFirebase);
            })
		    .catch((error) => {
			    reject(error);
            });
	    });
    };

    let updatePlant = (plantId, updatedPlant) => {
        // console.log("updated plant", updatedPlant);
        return $q((resolve, reject) => {
            $http.patch(`${FBCreds.databaseURL}/plantItems/${plantId}.json`,
                JSON.stringify(updatedPlant))
            .then(function(ObjectFromFirebase){
                resolve(ObjectFromFirebase);
            })
            .catch(function(error){
                reject(error);
            });
        });
    };

    let addNewGarden = (newGarden) => {
        return $q((resolve, reject)=>{
            $http.post(`${FBCreds.databaseURL}/gardens.json`,
            JSON.stringify(newGarden))
            .then((ObjectFromFirebase) => {
                resolve(ObjectFromFirebase);
            })
            .catch((error)=>{
                reject(error);
            });
        });
    };

    let getSinglePlant = (plantId) => {
	   return $q(function(resolve, reject){
            $http.get(`${FBCreds.databaseURL}/plantItems/${plantId}.json`)
            .then(function(plantObject){
               resolve(plantObject.data);
            })
            .catch(function(error){
                reject(error);
            });
        });
    };
  
    let deleteUserPlant = (plantId) => {
	   return $q((resolve, reject) => {
            $http.delete(`${FBCreds.databaseURL}/plantItems/${plantId}.json`)
            .then((ObjectFromFirebase) => {
                resolve(ObjectFromFirebase);
            });
        });
    };
    
    let getSingleGarden = (gardenId) => {
	   return $q(function(resolve, reject){
            $http.get(`${FBCreds.databaseURL}/gardens/${gardenId}.json`)
            .then(function(gardenObject){
                resolve(gardenObject.data);
            })
            .catch(function(error){
                reject(error);
            });
        });
    };

    
    return {getUserPlantList, getUserGardens, getSingleGarden, getSinglePlant, postNewPlant, addNewGarden, updatePlant, deleteUserPlant};

});