"use strict";

var makePerson = function(persArr){

var persons = {}; 
var nameArray = []; 

// Skapar en ny array för bara namn. 
persArr.forEach(function (array, index){
	nameArray[index] = array.name; 
})

// Sorterar den nya arrayen. 
nameArray.sort(); 

// Adderar dem till en sträng och lägger till i objektet. 
persons.names = nameArray.reduce(function (a, b){
	return a + ", " + b; 
}); 

// Skapar en array med bara nummer. 
persArr.forEach(function (array, index){
	
})


return persons; 

};

var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];

var result = makePerson(data);

console.log(result);


