"use strict"; 

ME222WM.util.Window = function(wndType, topPosition, leftPosition){

	this.getTopPosition = function(){
		return topPosition; 
	}; 

	this.getLeftPosition = function(){
		return leftPosition; 
	}; 

	this.wndType = wndType; 

	var containerDiv = document.getElementById("container"); 

	this.appContainer = document.createElement("div"); 
	
	// this.appContainer.style.top = this.topPosition + "px"; 
	// this.appContainer.style.left = this.leftPosition + "px"; 

	this.appContainer.style.zIndex = ME222WM.util.launch.zIndex; 
	this.appContainer.className = "appContainers"; 
	containerDiv.appendChild(this.appContainer); 

	var headerDiv = document.createElement("div"); 
	headerDiv.className = "windowHeader"; 
	this.appContainer.appendChild(headerDiv); 

	// Calculate the last divs position. 
	var wndDivs = containerDiv.getElementsByClassName("appContainers");
	var lastDiv = wndDivs[wndDivs.length - 1]; 
	this.lastDivTop = lastDiv.style.top; 
	this.lastDivLeft = lastDiv.style.left; 

	console.log(this.lastDivTop, this.lastDivLeft); 

	//_____________________________________________________________

	var headerP = document.createElement("p");
	headerP.className = "headerP"; 
	headerDiv.appendChild(headerP); 

	// Button that closes window. 
	var closeWindowA = document.createElement("a"); 
	closeWindowA.href = "#"; 
	closeWindowA.className = "closeA"; 


	var closeButton = document.createElement("img"); 
	closeButton.src = "pics/icons/ic_close_grey600_36dp.png";
	
	closeButton.onmouseout = function(){
	    this.src = "pics/icons/ic_close_grey600_36dp.png"; 
	};

	closeButton.onmouseover = function(){
	    this.src = "pics/icons/ic_close_white_18dp.png"; 
	}; 

	closeButton.className = "closeButton"; 
	closeButton.alt = "Stäng fönstret"; 

	headerDiv.appendChild(closeWindowA); 
	closeWindowA.appendChild(closeButton);

	var that = this; 

	closeWindowA.addEventListener("click", function(e){
		console.log(e.currentTarget); 

		if(wndType === "memory"){
			containerDiv.removeChild(that.appContainer); 

			ME222WM.util.launch.zIndex += 1; 
			ME222WM.util.positions.topPosition -=40; 
			ME222WM.util.positions.leftPosition -=40; 
		}; 
	}); 

	this.appContainer.onclick = function(){
		
		ME222WM.util.launch.zIndex += 1;

		this.style.zIndex = ME222WM.util.launch.zIndex; 
	}; 

	var footerDiv = document.createElement("div");
	footerDiv.className = "windowFooter"; 
	this.appContainer.appendChild(footerDiv); 

	this.launchApp(); 


}

ME222WM.util.Window.prototype.launchApp = function(){

	// this.topPosition += 40; 
	// this.leftPosition += 40; 

	console.log(this.getLeftPosition()); 
	
	this.appContainer.style.top = this.getTopPosition() + "px"; 
	this.appContainer.style.left = this.getLeftPosition() + "px"; 


	if(this.wndType === "memory"){
		var memApp = new ME222WM.util.apps.MemoryApp(this.appContainer, 4, 4); 
	}	

	// this.appContainer.style.top = this.topPosition + "px"; 
	// this.appContainer.style.left = this.leftPosition + "px"; 
}; 
