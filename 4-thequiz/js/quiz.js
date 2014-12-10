// "use strict"; 

window.onload = function(){
	
	var object = {}; 
	var div = document.getElementById("content");
	var url = "http://vhost3.lnu.se:20080/question/1"; 
	var pQuestion = document.getElementById("question"); 
	var pFeedback = document.createElement("p");

	getQuestion(); 


	function getQuestion(){

		var xhr = new XMLHttpRequest(); 

		xhr.onreadystatechange = function(){
		
			if (xhr.readyState === 4 && xhr.status === 200) { // Om det är 4 är det bra. Vi har fått ett svar. 

				object = JSON.parse(xhr.responseText); // Nu får jag objekt istället. 

				console.log(object); 

				pQuestion.innerHTML = object.question; 
			}
		}; 

		xhr.open("get", url, true); 

		xhr.send(null); 

		sendAnswer();
	}


	function sendAnswer(){

		

		var xhr = new XMLHttpRequest(); 

		document.getElementById("send").addEventListener("click", function(){

			// var answer = document.getElementById("answer").value; 

			if(object.nextURL !== undefined){
				var answerObject = {
					"answer": document.getElementById("answer").value,
				};

				xhr.onreadystatechange = function(){

					if (xhr.readyState === 4 && xhr.status === 200) {

						object = JSON.parse(xhr.responseText); 
						
						div.appendChild(pFeedback);

						pFeedback.innerHTML = "Rätt svar";

						url = object.nextURL; 

						getQuestion(); 
					}
				};

				xhr.open("post", object.nextURL, true);
				
				xhr.setRequestHeader("Content-Type", "application/json"); 

				xhr.send(JSON.stringify(answerObject)); 

				pFeedback.innerHTML = ""; 

				// http://vhost3.lnu.se:20080/question/321		
			}

			console.log("Utanför while-loopen"); 
		});
	}
};
