"use strict";

window.onload = function(){
	new MessageBoard("board1");  
	new MessageBoard("board2"); 
	new MessageBoard("board3");
};

function MessageBoard(boardId){
	
	// Array containing messages. 
	this.messages = []; 

	this.mainDiv = document.getElementById("main"); 

	this.messageArea = document.createElement("div"); 
	this.messageArea.setAttribute("class", "messagearea");
	
	// Creates container for messages. 
	this.formDiv = document.createElement("div"); 
	this.formDiv.setAttribute("id", boardId); 
	this.formDiv.setAttribute("class", "formdiv"); 

	this.mainDiv.appendChild(this.formDiv);

	// Counter 
	this.pCounter = document.createElement("p"); 
	this.pCounter.setAttribute("class", "counter"); 
	this.pCounter.innerHTML = "Antal meddelanden: " + this.messages.length; 

	// Creates submit button and textarea
	var form = document.createElement("form");
	this.textArea = document.createElement("textarea"); 
	this.textArea.placeholder = "Skriv ditt meddelande här"; 
	var submitButton = document.createElement("input"); 
	submitButton.type = "submit";
	submitButton.value = "Skicka"; 

	this.formDiv.appendChild(this.pCounter); 
	this.formDiv.appendChild(form); 
	form.appendChild(this.textArea);
	form.appendChild(submitButton); 

	var that = this;

	// Event tied to the submit-button. 
	submitButton.addEventListener("click", function(e){		
		if(that.textArea.value !== ""){
			e.preventDefault(); // Prevent from sending. 
			that.submitMessage(that.textArea.value); 
			that.textArea.value = ""; 
		}
		else if(that.textArea.value === ""){
			return false; 
			//e.preventDefault();
		}
	});
	// If the user presses Enter. 
	this.textArea.addEventListener("keypress", function(e){
		if(e.keyCode === 13 && e.shiftKey === false && that.textArea.value !== ""){
			that.submitMessage(that.textArea.value); 
			e.preventDefault(); 
			that.textArea.value = ""; 
		}
		else if(e.keyCode === 13 && e.shiftKey === false && that.textArea.value === ""){
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
};

MessageBoard.prototype.renderMessages = function(){

		this.messageArea.innerHTML = "";  

		var that = this; 

		// Updates counter.
		this.pCounter.innerHTML = "Antal meddelanden: " + this.messages.length;

		// Writes out messages in array. Index works as message id. 
		this.messages.forEach(function(message, index){
			that.renderMessage(index); 
		}); 
};

MessageBoard.prototype.removeMessage = function(index){
	// Removes message from array. 
	this.messages.splice(index, 1);  

	// Then calls the render messages function to write the values that are left. 
	this.renderMessages(); 
}; 

MessageBoard.prototype.renderMessage = function(index){

	// Container for single message.
	var messageDiv = document.createElement("div");
	messageDiv.setAttribute("class", "message");   
	 
	// Insert the messages before the textarea and submit button. 
	this.formDiv.insertBefore(this.messageArea, this.formDiv.firstChild); 

	// The message itself. 
	var text = document.createElement("p");
	text.setAttribute("class", "text");
	text.innerHTML = this.messages[index].getHTMLText();
	this.messageArea.appendChild(messageDiv);
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

	// Button that displays time and date.
	var aTime = document.createElement("a");
	aTime.setAttribute("href", "#"); 
	messageDiv.appendChild(aTime);
	aTime.appendChild(timeButton);

	var that = this; 

	aTime.addEventListener("click", function(){
		alert(that.messages[index].getDateText()); 
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

	// a-tag that removes message. 
	var aRemove = document.createElement("a");
	aRemove.setAttribute("href", "#"); 
	messageDiv.appendChild(aRemove);
	aRemove.appendChild(removeButton);

	aRemove.addEventListener("click", function(){
		if(window.confirm("Vill du verkligen radera meddelandet?")){
			that.removeMessage(index); 
		}
	});

	// Time stamp
	var timeStamp = document.createElement("p"); 
	timeStamp.setAttribute("class", "timestamp"); 
	timeStamp.innerHTML = this.messages[index].getDate().toLocaleTimeString(); 
	messageDiv.appendChild(timeStamp); 
}; 







