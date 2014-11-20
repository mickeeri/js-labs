"use strict"; 

var MessageBoard = {
	init:function(e){
		// Array containing message-objects. 
		var messages = []; 

		// The users input into the textarea. 
		var input = document.querySelector("#text"); 

		// Submit-button. 
		var submit = document.querySelector("#send");

		// Event tied to the submit-button. 
		submit.addEventListener("click", function(e){
			e.preventDefault(); 

			// Create a new object with the input and the current time. 
			var newMessage = new Message(input.value, new Date()); 

			console.log(newMessage.toString());
			console.log(newMessage.getText()); 
			console.log(newMessage.getDate()); 

			// Add newMessage to array. 
			messages.push(newMessage); 

			console.log(messages); 

		});




		// p.classList.remove("error");



		// var mess = new Message("Testmeddelande", new Date()); 
		// alert(mess); 
		// alert(mess.getText()); 
		// mess.setText("En annan text"); 
		// alert(mess); 
	}

}; 

	
window.onload = MessageBoard.init; 






