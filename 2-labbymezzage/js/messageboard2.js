"use strict"; 

window.onload = function(){
	new MessageBoard("board1");  
	new MessageBoard("board2"); 

};

function MessageBoard(boardId){
	
	// Array containing messages. 
	this.messages = []; 

	this.mainDiv = document.getElementById("main"); 

	this.messageArea = document.createElement("div"); 
	this.messageArea.setAttribute("class", "messagearea")
	
	// Creates container for messages. 
	this.formDiv = document.createElement("div"); 
	this.formDiv.setAttribute("id", boardId); 
	this.formDiv.setAttribute("class", "formdiv"); 

	this.mainDiv.appendChild(this.formDiv);

	// Creates submit button and textarea
	var form = document.createElement("form");
	var textArea = document.createElement("textarea"); 
	textArea.placeholder = "Skriv ditt meddelande här"; 
	var submitButton = document.createElement("input"); 
	submitButton.type = "submit";
	submitButton.value = "Skicka"; 

	this.formDiv.appendChild(form); 
	form.appendChild(textArea);
	form.appendChild(submitButton); 

	var that = this;

	// Event tied to the submit-button. 
	submitButton.addEventListener("click", function(e){
		
		if(textArea.value !== ""){
			e.preventDefault(); // Prevent from sending. 
			that.submitMessage(textArea.value); 
			textArea.value = ""; 
		}
		else if(textArea.value === ""){
			return false; 
			//e.preventDefault();
		}
	});
	// If the user presses Enter. 
	textArea.addEventListener("keypress", function(e){

		if(e.keyCode === 13 && e.shiftKey === false && textArea.value !== ""){
			that.submitMessage(textArea.value); 
			e.preventDefault(); 
			textArea.value = ""; 
		}
		else if(e.keyCode === 13 && e.shiftKey === false && textArea.value === ""){
			return false;  
		}
		
	});
}

MessageBoard.prototype.submitMessage = function(text){
	// Create a new object with the input and the current time. 
	var newMessage = new Message(text, new Date()); 

	this.messages.push(newMessage); 

	// Call function that renders messages.
	this.renderMessages(); 

	// Call function that counts length of array. 
	// this.countMessage();
};

MessageBoard.prototype.renderMessages = function(){

		this.messageArea.innerHTML = "";  

		var that = this; 

		this.messages.forEach(function(message, index){
			that.renderMessage(index); 
		}); 
};

MessageBoard.prototype.renderMessage = function(index){

	console.log(index); 

	// Container for single message.
	var messageDiv = document.createElement("div");
	messageDiv.setAttribute("class", "message");   
	
	this.formDiv.appendChild(this.messageArea);  

	// The message itself. 
	var text = document.createElement("p");
	text.setAttribute("class", "text");
	text.innerHTML = this.messages[index].getHTMLText();
	this.messageArea.appendChild(messageDiv);
	messageDiv.appendChild(text); 
}; 

