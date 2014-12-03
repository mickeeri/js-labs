"use strict";

var MemoryApp = function(rows, columns, gameId){

	var doc = {
		div: document.getElementById(gameId),
		randomPictureArray: new RandomGenerator.getPictureArray(rows, columns),
		idCount: 0,
		pictures: [],
		numberOfTries: 0,
		numberOfPairs: (rows * columns)/2,
		counter: document.createElement("p")	
	};

	doc.counter.innerHTML = "Antal försök: " + doc.numberOfTries; 
	doc.div.appendChild(doc.counter); 
	
	CreateTable();  

	function CreateTable(){

		var table = document.createElement("table"); 
		doc.div.appendChild(table); 		

		for(var i = 0; i < rows; i++){
			var tr = document.createElement("tr");
			table.appendChild(tr); 

			for(var j = 0; j < columns; j++){
				var td = document.createElement("td");
				tr.appendChild(td); 
				CreatePictureLinks(td);
			}
		}	
	}

	function CreatePictureLinks(td){

		var a = document.createElement("a");
		a.href = "#"; 
		var defaultPic = document.createElement("img"); 
		defaultPic.src = "pics/0.png"; 
		
		// Adds a diffrent id-number for each a-tag, that later represents index of random array. 
		a.id = doc.idCount; 
		doc.idCount++; 

		td.appendChild(a); 
		a.appendChild(defaultPic); 

		FlipCard(defaultPic, a); 
	}

	function FlipCard(picture, card){

		card.addEventListener("click", function(e){

			e.preventDefault(); 

			// Prevents the user from clicking already flipped card. 
			if(e.target.getAttribute("src") !== "pics/0.png"){
				return false; 
			}

			if(doc.pictures.length < 2){
				// Assign image id by array index and a-tag id.  
				picture.src = "pics/" + doc.randomPictureArray[card.getAttribute("id")] + ".png";
			
				// To seperate and be able to compare two pictures I use an array. The array will never contain more than two pictures. 
				if(doc.pictures.length === 0){
					doc.pictures[0] = picture; 
				}
				// Checks if the user clicks the same link by comparing a-tag id. 
				if(e.currentTarget !== doc.pictures[0].parentNode){
					doc.pictures[1] = picture; 
				}
			}
			console.log(doc.pictures);

			// Lägga in detta i egen funktion?
			if(doc.pictures.length === 2){

				doc.numberOfTries += 1; 

				doc.counter.innerHTML = "Antal försök: " + doc.numberOfTries; 

				if(doc.pictures[0].src !== doc.pictures[1].src){
					
					setTimeout(function(){
						// Resets pics to default img.
						doc.pictures[0].src = "pics/0.png"; 
						doc.pictures[1].src = "pics/0.png"; 
						doc.pictures = []; 
					}, 800); 
				}
				else{
					console.log(doc.pictures[1].parentNode); 
					doc.pictures = []; 
					doc.numberOfPairs -= 1; 

					if(doc.numberOfPairs === 0){
						 PresentResult();
					}
				}

			}	

		});		
	}
	function PresentResult(){
		var result = document.createElement("p");
		result.innerHTML = "Grattis! Spelet är slut. Du behövde " + doc.numberOfTries + " försök för att lyckas.";

		doc.div.appendChild(result); 

		var playAgain = document.createElement("input"); 
		playAgain.type = "button"; 
		playAgain.value = "Spela igen"; 
		doc.div.appendChild(playAgain); 

		playAgain.onclick = function(){
			doc.div.innerHTML = "";
			new MemoryApp(rows, columns, doc.div.id);
		}; 
		
	}
};

window.onload = function(){

	new MemoryApp(2, 3, "game1"); 
	new MemoryApp(4, 4, "game2"); 

};