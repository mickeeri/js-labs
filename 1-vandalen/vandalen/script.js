"use strict";

var makePerson = function(persArr){

var persons = {}; 
var nameArray = []; 
var ageArray = []; 

try{
	// Skapar en ny array för bara namn. 
	persArr.forEach(function (array, index){
		nameArray[index] = array.name; 
		
		if(typeof array.name !== "string"){
			throw new Error("Fel! ("+ array.name + ") är inte en textsträng.");
		}
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
	persArr.forEach(function (array, index){
		ageArray[index] = array.age; 

		// if(typeof array.age !== "number"){
		// 	throw new Error("Fel! (" + array.age + ") är inte ett heltal.");
		// }
	}); 

	// Sorterar. 
	ageArray.sort(); 

	persons.minAge = ageArray[0]; 
	persons.maxAge = ageArray[ageArray.length - 1]; 

	// Räknar ut medelvärdet. 
	var sum = ageArray.reduce(function (a, b){
		return a + b; 
	}); 

	persons.averageAge = Math.round(sum / ageArray.length); 

	return persons; 
}
catch(error){
	alert(error.message); 
}

};

var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];

var result = makePerson(data);

console.log(result);


