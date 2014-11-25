"use strict"; 

function Message(message, date){
	
	this.getText = function(){
		return message; 
	};

	this.setText = function(_text){
		message = _text; 
	};

	this.getDate = function(){
		return date; 
	};

	this.setDate = function(_date){
		_date = date; 
	};
}

Message.prototype.toString = function(){
	return this.getText()+" ("+this.getDate()+")";
};

Message.prototype.getHTMLText = function(){
	return this.getText().replace(/[\n\r]/g, "<br>");
};

Message.prototype.getDateText = function(){
	var time = this.getDate(); 
	var monthNumber = time.getMonth(); 

	var months = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];

	return "Inlägget skapades den " + time.getDate() + " " + months[monthNumber] + " klockan " + time.toLocaleTimeString() + "."; 
};