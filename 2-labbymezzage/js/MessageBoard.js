"use strict"; 

var MessageBoard = {

	// Array containing message-objects. 
	messages: [], 
	
	init: function(){

		// Text-area and submit-button. 
		var submit = document.querySelector("#send");
		var input = document.querySelector("#text"); 
		
		// If the user presses Enter. 
		input.addEventListener("keypress", function(e){

			if(e.keyCode === 13 && event.shiftKey === false){
				MessageBoard.submitMessage(); 
				e.preventDefault(); 
				input.value = ""; 
			}
		});

		// Event tied to the submit-button. 
		submit.addEventListener("click", function(e){
			e.preventDefault(); // Prevent from sending. 
			MessageBoard.submitMessage(); 
			input.value = ""; 
		});
	},

	submitMessage: function(){
		var input = document.querySelector("#text"); 

		// Create a new object with the input and the current time. 
		var newMessage = new Message(input.value, new Date()); 

		// Add newMessage to array. 
		MessageBoard.messages.push(newMessage);
		
		// Call function that renders messages.
		MessageBoard.renderMessages(); 

		// Call function that counts length of array. 
		MessageBoard.countMessage();
	},
	
	renderMessages: function(){
		document.getElementById("messagearea").innerHTML = ""; 

		// Renders all messages. 	
		MessageBoard.messages.forEach(function(message, i){
			MessageBoard.renderMessage(i); 
		}); 

		// for(var i = 0; i < MessageBoard.messages.length; ++i){
		// 	MessageBoard.renderMessage(i); 
		// }
	},

	removeMessage: function(messageID){
		// Removes message from array. 
		MessageBoard.messages.splice(messageID, 1);  

		// Then calls the render messages function to write the values that are left. 
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

		// Change image on mouseover. 
		timeButton.addEventListener("mouseover", function(e){
			e.target.setAttribute("src", "icons/timebutton_grey.png"); 
		});

		timeButton.addEventListener("mouseout", function(e){
		e.target.setAttribute("src", "icons/timebutton.png"); 
		});

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

		// Change image on mousover. 
		removeButton.addEventListener("mouseover", function(e){
			e.target.setAttribute("src", "icons/delete_grey.png"); 
		});

		removeButton.addEventListener("mouseout", function(e){
			e.target.setAttribute("src", "icons/remove.png"); 
		});

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

	// Function that displays "Antal meddelanden".
	countMessage: function(){
		var pCounter = document.getElementById("counter"); 

		pCounter.innerHTML = "Antal meddelanden: " + MessageBoard.messages.length;
	}
}; 

	
window.onload = MessageBoard.init; 



// mess.setText("En annan text"); 



