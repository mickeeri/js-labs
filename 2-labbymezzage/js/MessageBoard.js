"use strict"; 

var MessageBoard = {

	messages: [], 
	
	init: function(){
		// Array containing message-objects. 

		// The users input into the textarea. 
		var input = document.querySelector("#text"); 

		// Submit-button. 
		var submit = document.querySelector("#send");

		// Event tied to the submit-button. 
		submit.addEventListener("click", function(e){
			e.preventDefault(); // Prevent from sending. 

			// Create a new object with the input and the current time. 
			var newMessage = new Message(input.value, new Date()); 

			// Add newMessage to array. 
			MessageBoard.messages.push(newMessage); 
			
			MessageBoard.renderMessages(); 
		});
	},
	
	renderMessages: function(){
		document.getElementById("messagearea").innerHTML = ""; 

		// Renders all messages. 
		for(var i = 0; i < MessageBoard.messages.length; ++i){
			MessageBoard.renderMessage(i); 
		}
	},

	removeMessage: function(messageID){
		// Radera aktuellt meddelande från arrayen. Rendera alla meddelanden igen. 
		MessageBoard.messages.splice(messageID, 1);  

		MessageBoard.renderMessages(); 
	},

	renderMessage: function(messageID){
		var div = document.querySelector("#messagearea");

		var text = document.createElement("p");
		text.innerHTML = MessageBoard.messages[messageID].getHTMLText();
		div.appendChild(text);

		// Add button that displays time. 
		var timeButton = document.createElement("img");
		timeButton.setAttribute("src", "icons/timebutton.png")
		timeButton.setAttribute("alt", "Visa meddelandets tidpunkt")

		var aTime = document.createElement("a");
		aTime.setAttribute("href", "#"); 
		text.appendChild(aTime);
		aTime.appendChild(timeButton);

		aTime.addEventListener("click", function(){
			alert(MessageBoard.messages[messageID].getDateText()); 
		});

		// Add button that removes message. 
		var removeButton = document.createElement("img"); 
		removeButton.setAttribute("src", "icons/remove.png");
		removeButton.setAttribute("alt", "Ta bort meddelande");

		var aRemove = document.createElement("a");
		aRemove.setAttribute("href", "#"); 
		text.appendChild(aRemove);
		aRemove.appendChild(removeButton); 

		aRemove.addEventListener("click", function(){
			if(window.confirm("Vill du verkligen radera meddelandet?")){
				MessageBoard.removeMessage(messageID); 
			}
		});
	}
}; 

	
window.onload = MessageBoard.init; 







		// p.classList.remove("error");



		// var mess = new Message("Testmeddelande", new Date()); 
		// alert(mess); 
		// alert(mess.getText()); 
		// mess.setText("En annan text"); 
		// alert(mess); 



