"use strict";

window.onload = function(){
	
	var birthday = function(date){

		// Omvandlar date till ett datumobjekt. 
		var answer = new Date(date); 
		
		if(answer == "Invalid Date" || date === ""){
			throw new Error("Fel! Du måste ange ett datum i formatet YYYY-MM-DD"); 
		}

		console.log(answer + " answer."); 

		// Den aktuella tiden. 
		var now = new Date();

		// Skapar ett nytt datumobjekt med exakt samma tid som now, förutom månad och dag, 
		// vilket fås från användarens svar.
		var nextBirthday = new Date(now.getFullYear(), answer.getMonth(), answer.getDate(), 
			now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds()); 

		console.log(nextBirthday + " nextBirthday."); 

		// Om födelsedagen redan har varit: öka året med 1.  
		if (nextBirthday.getTime() < now.getTime()){
			nextBirthday.setFullYear(nextBirthday.getFullYear() + 1); 
		}

		// Kod för att räkna ut tidsskillnaden mellan nuet och födelsedagen i dagar.	
		var daysUntilBirthday = (nextBirthday.getTime() - now.getTime())/(1000*3600)/24;

		console.log(daysUntilBirthday); 
		return Math.ceil(daysUntilBirthday);
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
			var answer = birthday(input.value); // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar.";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	});
};