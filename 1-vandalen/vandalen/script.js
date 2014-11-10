"use strict";

var makePerson = function(persArr){

var persons = {}; 
var nameArray = []; 

// Skapar en ny array för bara namn. 
persArr.forEach(function (array, index){
	nameArray[index] = array.name; 
})

nameArray.sort(); 


	// Använd reduce för att lägga till värde från arrayen till nya objektet.

};

var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];

var result = makePerson(data);

console.log(result);


