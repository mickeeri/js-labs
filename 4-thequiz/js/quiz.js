// "use strict"; 

window.onload = function(){
	
	var object = {}; 
	var div = document.getElementById("content");
	var url = "http://vhost3.lnu.se:20080/question/1"; 
	var pQuestion = document.getElementById("question"); 
	var pFeedback = document.createElement("p");
	var inputAnswer = document.getElementById("answer"); 
	var sendButton = document.getElementById("send"); 

	getQuestion(); 

	function getQuestion(){

		var xhr = new XMLHttpRequest(); 

		xhr.onreadystatechange = function(){
		
			if (xhr.readyState === 4 && xhr.status === 200) { 

				object = JSON.parse(xhr.responseText); // Nu får jag objekt istället. 

				pQuestion.innerHTML = object.question; 
			}
		}; 

		xhr.open("get", url, true); 

		xhr.send(null); 

		inputAnswer.focus(); 

		sendButton.addEventListener("click", function(){
			sendAnswer(); 
		}); 

		inputAnswer.addEventListener("keypress", function(e){
			if(e.keyCode === 13){
				sendAnswer(); 
				e.preventDefault(); 
			}
		}); 
	}

	function sendAnswer(){

		var xhr = new XMLHttpRequest(); 
			
		var answerObject = {"answer": document.getElementById("answer").value,};

		xhr.onreadystatechange = function(){

			if (xhr.readyState === 4 && xhr.status === 200) {

				object = JSON.parse(xhr.responseText); 
				
				div.appendChild(pFeedback);

				inputAnswer.value = ""; 

				pFeedback.innerHTML = "Rätt svar";

				url = object.nextURL; 

				if(url !== undefined){
					
					getQuestion(); 
				}
				else{
					pFeedback.innerHTML = "Grattis! Slut på frågor.";
				}				
			}
		};

		xhr.open("post", object.nextURL, true);
		
		xhr.setRequestHeader("Content-Type", "application/json"); 

		xhr.send(JSON.stringify(answerObject)); 

		pFeedback.innerHTML = ""; 
		
	}
};

/* Att göra: 
- Lägg till focus på textrutan. 
- Radera text i texrutan vid ny fråga. 


*/