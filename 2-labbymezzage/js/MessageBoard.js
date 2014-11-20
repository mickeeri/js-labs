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
			e.preventDefault(); 

			// Create a new object with the input and the current time. 
			var newMessage = new Message(input.value, new Date()); 

			// Add newMessage to array. 
			MessageBoard.messages.push(newMessage); 
			
			MessageBoard.renderMessages(); 
		});
	},
	
	renderMessages: function(){
		// Remove all messages. 
		document.getElementById("messagearea").innerHTML = ""; 

		// Renders all messages. 
		for(var i = 0; i < MessageBoard.messages.length; ++i){
			MessageBoard.renderMessage(i); 
		}
	},

	renderMessage: function(messageID){
		var div = document.querySelector("#messagearea");

		var text = document.createElement("p");
		text.innerHTML = MessageBoard.messages[messageID].getHTMLText();
		div.appendChild(text);
	}
}; 

	
window.onload = MessageBoard.init; 







		// p.classList.remove("error");



		// var mess = new Message("Testmeddelande", new Date()); 
		// alert(mess); 
		// alert(mess.getText()); 
		// mess.setText("En annan text"); 
		// alert(mess); 



