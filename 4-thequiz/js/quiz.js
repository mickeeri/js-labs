"use strict";

window.onload = function(){

	var object = {};
	var div = document.getElementById("content");
	var url = "http://vhost3.lnu.se:20080/question/1";
	var pQuestion = document.getElementById("question");
	var pFeedback = document.getElementById("feedback");
	var inputAnswer = document.getElementById("answer");
	var sendButton = document.getElementById("send");
	var H3questionNumber = document.getElementById("questionnumber");
	var numberOfWrongAnswers2 = 0;
	var guessArray = [];
	var questionNumber = 1;
	var resultObject;
	var counter = 0;

	getQuestion();

	function getQuestion(){

		// Reset counter.
		counter = 0;

		inputAnswer.focus();
		H3questionNumber.innerHTML = "Fråga " + questionNumber;

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){

			if (xhr.readyState === 4 && xhr.status === 200) {

				object = JSON.parse(xhr.responseText); 
				pQuestion.innerHTML = object.question;
			}
		};

		xhr.open("get", url, true);
		xhr.send(null);

		sendButton.addEventListener("click", handler);
		inputAnswer.addEventListener("keypress", handler);

		function handler(e){
			if(e.button === 0 || e.keyCode === 13){
		   		// Counter prevents event from launching more than once.
		   		counter += 1;
		   		if (counter === 1){
		   			sendAnswer();
		   		} 
			}
		}
	}

	function sendAnswer(){

		var xhrAnswer = new XMLHttpRequest();

		// JSON object that gets sendt containing users input.
		var answerObject = {"answer": document.getElementById("answer").value};

		xhrAnswer.onreadystatechange = function(){

			if (xhrAnswer.readyState === 4) {

				object = JSON.parse(xhrAnswer.responseText);

				if(object.message === "Correct answer!" && xhrAnswer.status === 200){

					inputAnswer.value = "";
					pFeedback.setAttribute("style", "color: black;");
					resultObject = {"questionnr": questionNumber, "numberofwronganswers": numberOfWrongAnswers2};
					questionNumber += 1;
					guessArray.push(resultObject);
					numberOfWrongAnswers2 = 0;
					pFeedback.innerHTML = "Rätt svar";

					url = object.nextURL;

					if(url !== undefined){
						getQuestion();
					}
					// Return contains no URL = no more questions.
					else{
						pQuestion.innerHTML = "";
						pFeedback.innerHTML = "Grattis! Slut på frågor.";
						sendButton.disabled = true;
						inputAnswer.disabled = true;
						H3questionNumber.innerHTML="";

						var resultH = document.createElement("h2");
						div.appendChild(resultH);
						resultH.innerHTML = "Resultat";
						var resultList = document.createElement("ul");
						div.appendChild(resultList);

						// Renders list for tries per question.
						guessArray.forEach(function(guess, index){

							var questionResult = document.createElement("li");
							resultList.appendChild(questionResult);

							if(guess.numberofwronganswers === 0){
								questionResult.innerHTML = "Fråga " + guess.questionnr + ": " + "Du klarade frågan på första försöket.";
							}
							else{
								questionResult.innerHTML = "Fråga " + guess.questionnr + ": Du behövde " + (guess.numberofwronganswers + 1) + " försök.";
							}
						});
					}
				}
				else if(object.message == "Wrong answer! :(" && xhrAnswer.status === 400){
					
					numberOfWrongAnswers2 += 1; 
					pFeedback.innerHTML = "Fel svar! Försök igen. Felaktiga svar på frågan: " + numberOfWrongAnswers2;
					pFeedback.setAttribute("style", "color: red;");
					// Clears input-field.
					inputAnswer.value = "";
					getQuestion();
				}
			}
		};

		xhrAnswer.open("post", object.nextURL, true);
		xhrAnswer.setRequestHeader("Content-Type", "application/json");
		xhrAnswer.send(JSON.stringify(answerObject));
	}
};