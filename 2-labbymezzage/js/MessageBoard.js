"use strict"; 

var MessageBoard = {

	// var messages: []; 




	init:function(e){
		var newMessage = document.querySelector("#messages p")
		var input = document.querySelector("#text"); 
		var submit = document.querySelector("#send");  
		
		submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra att formuläret skickas till servern. 

		newMessage.classList.remove("error");

		var mess = new Message(input.value, new Date());

		newMessage.innerHTML = mess; 
	}); 


		// var mess = new Message("Testmeddelande", new Date()); 
		// alert(mess); 
		// alert(mess.getText()); 
		// mess.setText("En annan text"); 
		// alert(mess); 
	}

}; 

	
window.onload = MessageBoard.init; 






