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
			MessageBoard.countMessage(); 
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
		MessageBoard.countMessage(); 
	},

	renderMessage: function(messageID){
		
		var div = document.querySelector("#messagearea");

		// Container for all messages. 
		var messageDiv = document.createElement("div"); 
		
		// Container for single message. 
		messageDiv.setAttribute("class", "message"); 

		// The message itself. 
		var text = document.createElement("p");
		text.setAttribute("class", "text");
		text.innerHTML = MessageBoard.messages[messageID].getHTMLText();
		div.appendChild(messageDiv);
		messageDiv.appendChild(text); 

		// Add button that displays time. 
		var timeButton = document.createElement("img");
		timeButton.setAttribute("src", "icons/timebutton.png");
		timeButton.setAttribute("alt", "Visa meddelandets tidpunkt");

		var aTime = document.createElement("a");
		aTime.setAttribute("href", "#"); 
		messageDiv.appendChild(aTime);
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
		messageDiv.appendChild(aRemove);
		aRemove.appendChild(removeButton); 

		aRemove.addEventListener("click", function(){
			if(window.confirm("Vill du verkligen radera meddelandet?")){
				MessageBoard.removeMessage(messageID); 
			}
		});

		// Time stamp
		var timeStamp = document.createElement("p"); 
		timeStamp.setAttribute("class", "timestamp"); 
		timeStamp.innerHTML = MessageBoard.messages[messageID].getDate().toLocaleTimeString(); 
		messageDiv.appendChild(timeStamp); 
	},

	countMessage: function(){
		var pCounter = document.getElementById("counter"); 

		pCounter.innerHTML = "Antal meddelanden: " + MessageBoard.messages.length;


		// var numberOfMessages = document.createElement("p"); 

		// numberOfMessages.innerHTML = "<p>Antal meddelanden: </p>" + MessageBoard.messages.length; 

		// divCounter.appendChild(numberOfMessages);
	}
}; 

	
window.onload = MessageBoard.init; 







		// p.classList.remove("error");



		// var mess = new Message("Testmeddelande", new Date()); 
		// alert(mess); 
		// alert(mess.getText()); 
		// mess.setText("En annan text"); 
		// alert(mess); 



