"use strict";
 
 var rows = 4; 
 var columns = 5; 


var pictureTable = function(){

// console.log(randomArray); 

	var table = document.getElementById("memorytable"); 

	// Rows
	for(var i = 0; i < rows; i++){
		createTable(); 
		console.log(table); 
	}

	// Columns
	function createTable(){
	 	var tr = document.createElement("tr");
		table.appendChild(tr); 
		
		for(var j = 0; j < columns; j++){
			var td = document.createElement("td"); 
		 	
		 	var a = document.createElement("a"); 
				a.href = "#"; 
				a.innerHTML = "BILD"; 

			tr.appendChild(td); 
			td.appendChild(a); 
		}
	} 
} 

// var rows = 3; 
// var columns = 4; 

window.onload = function(){

	pictureTable(); 

};