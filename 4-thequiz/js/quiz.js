//"use strict"; 

window.onload = function(){
	
	var object = {}; 
	var div = document.getElementById("content");
	var url = "http://vhost3.lnu.se:20080/question/1"; 
	var pQuestion = document.getElementById("question"); 
	var pFeedback = document.createElement("p");
	var inputAnswer = document.getElementById("answer"); 
	var sendButton = document.getElementById("send"); 
	var numberOfWrongAnswers = 0; 


	div.appendChild(pFeedback);

	getQuestion(); 

	function getQuestion(){

		inputAnswer.focus(); 

		var xhr = new XMLHttpRequest(); 

		xhr.onreadystatechange = function(){
		
			if (xhr.readyState === 4 && xhr.status === 200) { 

				object = JSON.parse(xhr.responseText); // Nu får jag objekt istället. 

				pQuestion.innerHTML = object.question; 
			}
		}; 

		xhr.open("get", url, true); 

		xhr.send(null); 

		// inputAnswer.focus(); 

		sendButton.addEventListener("click", function(){
			sendAnswer(); 
			// http://www.sitepoint.com/create-one-time-events-javascript/
			e.target.removeEventListener(e.type, arguments.callee);
		}); 

		inputAnswer.addEventListener("keypress", function(e){
			if(e.keyCode === 13){
				sendAnswer(); 
				e.target.removeEventListener(e.type, arguments.callee);
			}
		}); 
	}

	function sendAnswer(){
		
		var xhrAnswer = new XMLHttpRequest(); 
			
		var answerObject = {"answer": document.getElementById("answer").value};

		xhrAnswer.onreadystatechange = function(){

			if (xhrAnswer.readyState === 4) {

				
				console.log(answerObject);  


				object = JSON.parse(xhrAnswer.responseText); 


				console.log(object.message); 

				if(object.message === "Correct answer!" && xhrAnswer.status === 200){
					inputAnswer.value = ""; 
					pFeedback.setAttribute("style", "color: black;"); 
					numberOfWrongAnswers = 0; 
					pFeedback.innerHTML = "Rätt svar";

					url = object.nextURL; 
					
					if(url !== undefined){		
						getQuestion(); 
					}
					else{

						pFeedback.innerHTML = "Grattis! Slut på frågor.";
						sendButton.disabled = true; 
						inputAnswer.disabled = true; 
					}


				}
				else if(object.message == "Wrong answer! :(" && xhrAnswer.status === 400 && xhrAnswer.readyState === 4){
					numberOfWrongAnswers += 1; 
					pFeedback.innerHTML = "Fel svar! Försök igen. Felaktiga svar: " + numberOfWrongAnswers; 
					pFeedback.setAttribute("style", "color: red;");
					inputAnswer.value = "";
					getQuestion(); 
				}
			}
			// // If bad request. 
			// else if(xhr.readyState === 4 && xhr.status === 400){
			// 	numberOfWrongAnswers += 1; 
			// 	pFeedback.innerHTML = "Fel svar! Försök igen. Felaktiga svar: " + numberOfWrongAnswers; 
			// 	pFeedback.setAttribute("style", "color: red;");
			// 	inputAnswer.value = ""; 
			// 	getQuestion();
			// }
		};

		xhrAnswer.open("post", object.nextURL, true);
		
		xhrAnswer.setRequestHeader("Content-Type", "application/json"); 

		xhrAnswer.send(JSON.stringify(answerObject)); 

		pFeedback.innerHTML = ""; 
	}
};