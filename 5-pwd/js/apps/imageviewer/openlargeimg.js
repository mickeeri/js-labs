"use strict"; 

ME222WM.apps.LargeImgWindow = function(newWindow, imgObject){
	this.newWindow = newWindow; 

	var largeImgDiv = document.createElement("div"); 
	var largeImgA = document.createElement("a"); 
	largeImgA.href = "#"; 
	largeImgA.className = "largeImgA"; 

	largeImgA.style.height = imgObject.height + "px"; 
	largeImgA.style.width = imgObject.width + "px"; 

    var largeImg = document.createElement("img"); 
    largeImg.src = imgObject.URL; 
    largeImg.className = "largeImg"; 

    largeImgA.appendChild(largeImg); 
    largeImgDiv.appendChild(largeImgA); 

    var timesClicked = 0; 

    this.newWindow.statusP.innerHTML = "Klicka på bilden för att göra den till bakgrundsbild. Klicka en gång till för original."; 


    largeImgA.addEventListener("click", function(e){
    	timesClicked += 1; 

    		changeBackground();  	
    }); 

    function changeBackground(){

    	if(timesClicked === 1){
	    	document.body.style.backgroundImage = "url('" + imgObject.URL + "')";
    		document.body.id = "bodyJsRepeat"; 
    	}
    	else {
    		document.body.style.backgroundImage = ""; 
    		document.body.id = "defaultBody"; 
    		timesClicked = 0; 
    	}
    }

    return largeImgDiv; 
}; 