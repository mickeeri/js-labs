"use strict";
 
var rows = 4; 
var columns = 4; 
var idCount = 0; 



var pictureTable = function(){

	 var randomArray = RandomGenerator.getPictureArray(rows, columns); 

	// var newArray = []; 
	// newArray.push(randomArray); 
	// console.log(randomArray); 

	// console.log(newArray); 

	// console.log(randomArray); 

	var table = document.getElementById("memorytable"); 

	// Rows
	for(var i = 0; i < rows; i++){
		createTableColumns(); 
	}

	// Columns
	function createTableColumns(){
	 	var tr = document.createElement("tr");
		table.appendChild(tr); 
		
		for(var j = 0; j < columns; j++){
			
			var td = document.createElement("td"); 
			// td.setAttribute("id", randomArray[idCount]); 
		 
			tr.appendChild(td); 

			createImageLink(td); 

			// idCount++; 
		}
	}

	function createImageLink(td){


		var a = document.createElement("a"); 
		a.href = "#"; 
		var defaultImg = document.createElement("img"); 
		defaultImg.src = "pics/0.png"; 
		a.id = idCount; 

		++idCount;


		td.appendChild(a); 
		a.appendChild(defaultImg); 

		a.onclick = function(){
			flipCard(a, defaultImg); 
		};
	} 

	function flipCard(a, image){
		
		image.src = "pics/" + randomArray[a.getAttribute("id")] + ".png"; 
		console.log(a); 

	}

}; 

// var rows = 3; 
// var columns = 4; 

window.onload = function(){

	pictureTable(); 

};