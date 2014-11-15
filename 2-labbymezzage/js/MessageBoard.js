"use strict"; 

window.onload = function(){

	// var MessageBoard = {}; 

	var mess = new Message("Testmeddelande", new Date()); 
	alert(mess); 
	alert(mess.getText()); 
	mess.setText("En annan text"); 
	alert(mess); 

};





