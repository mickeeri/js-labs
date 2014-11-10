"use strict";

window.onload = function(){

	var convertString = function(str){

		var newStr = ""; 
		
		// Om användaren inte skriver något. 		
		if(str === ""){
			throw new Error("Fel! Du måste mata in en textsträng.");
		}
		
		// Ersätter bokstäverna en och en. 
		for(var i = 0; i < str.length; i+=1){

			if(str[i] === str[i].toLowerCase()){
				newStr += str[i].toUpperCase(); 
			}

			if(str[i] === str[i].toUpperCase()){
				newStr += str[i].toLowerCase(); 
			}
		}

		// Byter ut alla a:n mot # och returnerar den omgjorda strängen.
		return newStr.replace(/a/gi, "#"); 
	};
	// ------------------------------------------------------------------------------

	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = convertString(input.value); // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};