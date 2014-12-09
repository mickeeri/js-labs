// "use strict"; 

window.onload = function(){

	document.getElementById("knapp").addEventListener("click", function(){

		var xhr = new XMLHttpRequest(); 

		xhr.onreadystatechange = function(){
			if (xhr.readyState === 4 && xhr.status === 200) { // Om det är 4 är det bra. Vi har fått ett svar. 

				var obj = JSON.parse(xhr.responseText); // Nu får jag objekt istället. 

				console.log(obj); 

				var p = document.getElementById("question"); 

				p.innerHTML = obj.question; 

			}
		}; 

		xhr.open("get", "http://vhost3.lnu.se:20080/question/1", true); 

		xhr.send(null); 



	});
};