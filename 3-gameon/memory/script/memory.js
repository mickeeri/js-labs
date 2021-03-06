"use strict";

ME222WM.util.MemoryApp = function(rows, columns, marginX, marginY) {

    var doc = {
        div: document.getElementById("memory"),
        game: document.createElement("div"),
        randomPictureArray: new RandomGenerator.getPictureArray(rows, columns),
        idCount: 0,
        pictures: [],
        numberOfTries: 0,
        numberOfPairs: (rows * columns) / 2,
        counter: document.createElement("p"),
        aArray: []
    };

	containerDiv.appendChild(memoryDiv); 

	doc.div.appendChild(doc.game);
	doc.game.setAttribute("class", "games");
	doc.counter.innerHTML = "Antal försök: " + doc.numberOfTries;
	doc.game.appendChild(doc.counter);

	createTable();

	function createTable() {

	    var table = document.createElement("table");
		doc.game.appendChild(table);

		for(var i = 0; i < rows; i++) {
			var tr = document.createElement("tr");
			table.appendChild(tr);

			for(var j = 0; j < columns; j++) {
				var td = document.createElement("td");
				tr.appendChild(td);
				createPictureLinks(td);
			}
		}
	}

	function createPictureLinks(td, index){

		var a = document.createElement("a");
		a.href = "#";
		// Adds a-tag to array. Later used for assigning pic src to memory card. 
		doc.aArray.push(a); 
		var defaultPic = document.createElement("img");
		defaultPic.src = "pics/0.png";

		td.appendChild(a);
		a.appendChild(defaultPic);

		flipCard(defaultPic, a);
	}

	function flipCard(picture, card){

		card.addEventListener("click", function(e){

			// cardIndex is the index the card has in aArray. 
			var cardIndex = doc.aArray.indexOf(card); 

			// Prevents the user from clicking already flipped card.
			if(card.firstChild.getAttribute("src") !== "pics/0.png"){
				return false;
			}

            // The card can only flip if the length of the array is smaller or equals two.
			if (doc.pictures.length <= 2) {

			    // Assign picture src with cardIndex.
				picture.src = "pics/" + doc.randomPictureArray[+cardIndex] + ".png";

				doc.pictures.push(picture);

				if (doc.pictures.length === 2) {

				    doc.numberOfTries += 1;

				    doc.counter.innerHTML = "Antal försök: " + doc.numberOfTries;

				    evaluatePair();
				}
			}
		});
	}
	function evaluatePair() {
        // If the pictures does not match.
	    if (doc.pictures[0].src !== doc.pictures[1].src) {

	        // Switch back to default pic and empty array.
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
	            presentResult();
	        }
	    }
	}

	function presentResult(){
		var result = document.createElement("p");
		result.innerHTML = "Grattis! Spelet är slut. Du behövde " + doc.numberOfTries + " försök för att lyckas.";

		doc.game.appendChild(result);


		// var playAgain = document.createElement("input");
		// playAgain.type = "button";
		// playAgain.value = "Spela igen";
		// doc.game.appendChild(playAgain);

		// playAgain.onclick = function(){

		//    doc.div.removeChild(doc.game);
		//    // doc.game.innerHTML = "";
		// 	new MemoryApp(rows, columns);
		// };
	}
};