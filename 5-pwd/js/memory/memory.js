"use strict";

ME222WM.apps.MemoryApp = function(newWindow, rows, columns) {

    var doc = {
        game: document.createElement("div"),
        randomPictureArray: new RandomGenerator.getPictureArray(rows, columns),
        idCount: 0,
        pictures: [],
        numberOfTries: 0,
        numberOfPairs: (rows * columns) / 2,
        counter: document.createElement("p"),
        aArray: []
    };

	// Insert the div containing actual memory in between header and footer. 
	// memoryDiv.insertBefore(doc.game, memoryDiv.firstChild.nextSibling);

	doc.game.setAttribute("class", "games");
	doc.counter.innerHTML = "Antal försök: " + doc.numberOfTries;
	doc.game.appendChild(doc.counter);

	var gameOn = document.createElement("h1"); 
	gameOn.innerHTML = "Game On";  
	doc.game.insertBefore(gameOn, doc.game.firstChild); 

	// var header = memoryDiv.firstChild; 
	// header.firstChild.innerHTML = "Memory";  

	// var headerIcon = document.createElement("img"); 
	// headerIcon.src = "pics/icons/1420585292_Game_Center.png"; 
	// headerIcon.className = "headerIcon"; 

	// header.insertBefore(headerIcon, header.firstChild); 

	// Remove loader and status. 
	// memoryDiv.lastChild.innerHTML = ""; 

	//newWindow.lastChild.innerHTML = ""; 

	newWindow.footerDiv.innerHTML = ""; 

	console.log(newWindow); 

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
		defaultPic.src = "../3-gameon/memory/pics/0.png";

		td.appendChild(a);
		a.appendChild(defaultPic);

		flipCard(defaultPic, a);
	}

	function flipCard(picture, card){

		card.addEventListener("click", function(e){

			// cardIndex is the index the card has in aArray. 
			var cardIndex = doc.aArray.indexOf(card); 

			// Prevents the user from clicking already flipped card.
			if(card.firstChild.getAttribute("src") !== "../3-gameon/memory/pics/0.png"){
				return false;
			}

            // The card can only flip if the length of the array is smaller or equals two.
			if (doc.pictures.length <= 2) {

			    // Assign picture src with cardIndex.
				picture.src = "../3-gameon/memory/pics/" + doc.randomPictureArray[+cardIndex] + ".png";

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
	            doc.pictures[0].src = "../3-gameon/memory/pics/0.png";
	            doc.pictures[1].src = "../3-gameon/memory/pics/0.png";
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

	function presentResult() {
		var result = document.createElement("p");
		result.innerHTML = "Grattis! Spelet är slut. Du behövde " + doc.numberOfTries + " försök för att lyckas.";

		doc.game.appendChild(result);

		console.log(doc.game); 

		
	}

	return doc.game; 
};