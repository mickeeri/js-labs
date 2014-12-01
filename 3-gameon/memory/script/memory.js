"use strict";
 
var pictureTable = function(rows, columns){

	var randomArray = new RandomGenerator.getPictureArray(rows, columns); 	
	var table = document.getElementById("memorytable"); 
	var idCount = 0; 
	var numberOfTries = 0; 
	var pictures = [];  
	var numberOfPairs = (rows * columns)/2; 

	createTable(); 

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
		var defaultPic = document.createElement("img"); 
		defaultPic.src = "pics/0.png"; 
		
		// Adds a diffrent id-number for each a-tag, that later represents index of random array. 
		a.id = idCount; 
		++idCount;

		td.appendChild(a); 
		a.appendChild(defaultPic); 

		new FlipCard(a, defaultPic); 
				
	} 

	function FlipCard(a, picture){

		a.addEventListener("click", function(e){

			if(pictures.length < 2){
				// Assign image id by array index and a-tag id.  
				picture.src = "pics/" + randomArray[a.getAttribute("id")] + ".png";
			
				// To seperate and be able to compare two pictures I use an array. The array will never contain more than two pictures. 
				if(pictures.length === 0){
					pictures[0] = picture; 
				}
				// Checks if the user clicks the same link by comparing a-tag id. 
				else if(e.currentTarget !== pictures[0].parentNode){
					pictures[1] = picture; 
				}

			}
			if(pictures.length == 2){

				numberOfTries += 1; 
				document.getElementById("tries").innerHTML = "Antal försök: " + numberOfTries; 

				if(pictures[0].src !== pictures[1].src){
					setTimeout(function(){
						// Resets pics to default img. 
						pictures[0].src = "pics/0.png"; 
						pictures[1].src = "pics/0.png"; 
						pictures = []; 
					}, 1000); 
				}
				else{
					pictures = []; 
					numberOfPairs -= 1; 

					if(numberOfPairs === 0)
					{
						new PresentResult(); 
					}
				}
			}	
		});
	}

	function PresentResult(){
		document.getElementById("result").innerHTML = "Grattis! Spelet är slut. Du behövde " + numberOfTries + " försök för att lyckas.";

		var inputDiv = document.getElementById("play");
		var playAgain = document.createElement("input"); 
		playAgain.type = "button"; 
		playAgain.value = "Spela igen"; 
		inputDiv.appendChild(playAgain); 

		playAgain.onclick = function(){
			location.reload(true); 
		}; 


	}
}; 

window.onload = function(){

	var rows = 2; 
	var columns = 5; 

	pictureTable(rows, columns); 

};



