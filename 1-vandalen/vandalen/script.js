"use strict";
try{
	var makePerson = function(persArr){
		var persons = {}; 
		var nameArray = []; 
		var ageArray = []; 

		// Skapar en ny array för bara namn. 
		persArr.forEach(function (person, index){
			nameArray[index] = person.name; 
		}); 

		// Sorterar den nya arrayen. Använder String.localeCompare för att även inkludera svenska tecken. 
		nameArray = nameArray.sort(function (a, b){
			return a.localeCompare(b); 
		}); 

		// Adderar dem till en sträng och lägger till i objektet. 
		persons.names = nameArray.reduce(function (a, b){
			return a + ", " + b; 
		}); 

		// Skapar en array med bara nummer. 
		persArr.forEach(function (person, index){
			ageArray[index] = person.age; 
		}); 

		ageArray.sort(); 

		persons.minAge = ageArray[0]; 
		persons.maxAge = ageArray[ageArray.length - 1]; 

		// Räknar ut summan och sedan medelvärdet. 
		var sum = ageArray.reduce(function (a, b){
			return a + b; 
		}); 

		persons.averageAge = Math.round(sum / ageArray.length); 

		// Kontrollerar om objektet innehåller rätt egenskaper. 
		if(persons.hasOwnProperty("names") && persons.hasOwnProperty("minAge") && persons.hasOwnProperty("maxAge") && persons.hasOwnProperty("averageAge")){
			return persons; 
		}
		else{
			throw new Error("OBS! Objektet innehåller inte rätt egenskaper."); 
		}
	}; 

	var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];

		data.forEach(function(item){
			if(typeof item.name !== "string" || typeof item.name === "undefined"){
				throw new Error("FEL! Namnet måste anges som en textsträng."); 
			}

			if(typeof item.age !== "number" || typeof item.age === "undefined"){
				throw new Error("FEL! Ålder måste anges som ett heltal."); 
			}
		}); 

	var result = makePerson(data);
	console.log(result);
}
catch(error){
	alert(error.message);
}







