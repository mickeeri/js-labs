"use strict";
 
var pictureTable = function(rows, columns){

	var randomArray = RandomGenerator.getPictureArray(rows, columns); 

	var table = document.getElementById("memorytable"); 
	var idCount = 0; 
	var numberOfFlips = 2;
	var numberOfTries = 0; 
	var imagePair = [];  
	var aPair = []; 
	

	createTable(); 

	// function createTableRows{}
	// for(var i = 0; i < rows; i++){
	// 	createTable(); 
	// }

	// Columns
	function createTable(){
	 	
		// Rows 
		for(var i = 0; i < rows; i++){
		 	
		 	var tr = document.createElement("tr");
			table.appendChild(tr); 
			
			// Columns
			for(var j = 0; j < columns; j++){
				
				var td = document.createElement("td"); 
			 
				tr.appendChild(td); 

				createImageLink(td); 
			}
		}
	}

	function createImageLink(td){

		var a = document.createElement("a"); 
		a.href = "#"; 
		var defaultImg = document.createElement("img"); 
		defaultImg.src = "pics/0.png"; 
		
		// Adds a diffrent id-number for each a-tag, that later represents index of random array. 
		a.id = idCount; 
		++idCount;

		td.appendChild(a); 
		a.appendChild(defaultImg); 

		FlipCard(a, defaultImg); 
				
	} 

	function FlipCard(a, image){

		a.onclick = function(){
			image.src = "pics/" + randomArray[a.getAttribute("id")] + ".png";
			
			// To seperate and be able to compare two pictures I use an array. The array will never contain more than two pictures.    
			imagePair.push(image);
			// aPair.push(a); 

			
			console.log(imagePair);

			// Ska inte gå att klicka på dessa bilder och fylla på arrayen ännu mer. Därför kanske skicka till annan funktion. Funktion i samma funktion?
			if(imagePair.length == 2){
				EvaluatePictures(imagePair); 
				imagePair = []; 
			}	
		}

		function EvaluatePictures(images2){
			console.log("Lalalala")

			console.log(images2); 
		}
	}
}; 

// var rows = 3; 
// var columns = 4; 

window.onload = function(){

	var rows = 4; 
	var columns = 4; 

	pictureTable(rows, columns); 


	// pictureTable(); 

};

				// if(imagePair[0].src !== imagePair[1].src){

				// 	setTimeout(function(){
				// 		imagePair[0].src = "pics/0.png"; 
				// 		imagePair[1].src = "pics/0.png"; 
				// 	}, 1000); 