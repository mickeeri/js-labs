"use strict";

var MemoryApp = function(rows, columns, gameId) {

    var doc = {
        div: document.getElementById("memory"),
        game: document.createElement("div"),
        randomPictureArray: new RandomGenerator.getPictureArray(rows, columns),
        idCount: 0,
        pictures: [],
        numberOfTries: 0,
        numberOfPairs: (rows * columns) / 2,
        counter: document.createElement("p")
    };

	doc.div.appendChild(doc.game);
	doc.game.id = gameId;
	doc.game.setAttribute("class", "games"); 
	doc.counter.innerHTML = "Antal försök: " + doc.numberOfTries; 
	doc.game.appendChild(doc.counter); 
	
	CreateTable();  

	function CreateTable() {

	    var table = document.createElement("table");
		doc.game.appendChild(table); 		

		for(var i = 0; i < rows; i++) {
			var tr = document.createElement("tr");
			table.appendChild(tr); 

			for(var j = 0; j < columns; j++) {
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

            // The card can only flip if the length of the array is smaller or equals two. 
			if (doc.pictures.length <= 2) {

			    // Assign image id by array index and a-tag id.  
				picture.src = "pics/" + doc.randomPictureArray[card.getAttribute("id")] + ".png";
			
				doc.pictures.push(picture);
			
				if (doc.pictures.length === 2) {

				    doc.numberOfTries += 1;

				    doc.counter.innerHTML = "Antal försök: " + doc.numberOfTries;

				    EvaluatePair();
				}
			}
		});		
	}
	function EvaluatePair() {
        // If the pictures match. 
	    if (doc.pictures[0].src !== doc.pictures[1].src) {

	        setTimeout(function () {
	            doc.pictures[0].src = "pics/0.png";
	            doc.pictures[1].src = "pics/0.png";
	            doc.pictures.splice(0, 2);
	        }, 800);

	    }
	    else{
	        
	        doc.numberOfPairs -= 1;
	        doc.pictures.splice(0, 2);

	        if (doc.numberOfPairs === 0) {
	            PresentResult();
	        }
	    }
	}

	function PresentResult(){
		var result = document.createElement("p");
		result.innerHTML = "Grattis! Spelet är slut. Du behövde " + doc.numberOfTries + " försök för att lyckas.";

		doc.game.appendChild(result); 

		//var playAgain = document.createElement("input"); 
		//playAgain.type = "button"; 
		//playAgain.value = "Spela igen"; 
		//doc.game.appendChild(playAgain); 

		//playAgain.onclick = function(){

		//    doc.div.removeChild(doc.game); 
		//    // doc.game.innerHTML = "";
		//	new MemoryApp(rows, columns, doc.game.id);
		//}; 
		
	}
};

window.onload = function(){

	MemoryApp(2, 3, "game1"); 
	MemoryApp(4, 4, "game2");
	MemoryApp(2, 3, "game3");
	MemoryApp(1, 4, "game4");
	MemoryApp(2, 2, "game5"); 

};