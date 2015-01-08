"use strict"; 

ME222WM.util.Window = function(wndType, topPosition, leftPosition){

	this.getTopPosition = function(){
		return topPosition; 
	}; 

	this.getLeftPosition = function(){
		return leftPosition; 
	}; 

	this.getWndType = function(){
		return wndType; 
	};

	this.renderWindow(); 
}

ME222WM.util.Window.prototype.renderWindow = function(){
	
	var containerDiv = document.getElementById("container"); 
	this.appContainer = document.createElement("div"); 
	var headerDiv = document.createElement("div"); 
	var headerP = document.createElement("p");
	// var closeWindowA = document.createElement("a"); 
	var closeButton = document.createElement("img"); 
	var footerDiv = document.createElement("div");

	// this.appContainer.style.zIndex = 10; // Ändra detta.
	this.appContainer.style.zIndex = ME222WM.z_index; 
	this.appContainer.style.top = this.getTopPosition() + "px"; 
	this.appContainer.style.left = this.getLeftPosition() + "px"; 

	this.appContainer.className = "newWindow"; 
	headerDiv.className = "windowHeader"; 
	footerDiv.className = "windowFooter"; 
	headerP.className = "headerP";
	// closeWindowA.href = "#"; 
	// closeWindowA.className = "closeA"; 

	closeButton.className = "closeButton"; 
	closeButton.alt = "Stäng fönstret"; 
	closeButton.src = "pics/icons/ic_close_grey600_36dp.png";		
	closeButton.onmouseout = function(){
	    this.src = "pics/icons/ic_close_grey600_36dp.png"; 
	};
	closeButton.onmouseover = function(){
	    this.src = "pics/icons/ic_close_white_18dp.png"; 
	}; 

	containerDiv.appendChild(this.appContainer);
	this.appContainer.appendChild(headerDiv); 
	headerDiv.appendChild(headerP);
	headerDiv.appendChild(closeWindowA); 
	closeWindowA.appendChild(closeButton);
	this.appContainer.appendChild(footerDiv); 

	var that = this; 

	closeWindowA.addEventListener("click", function(e){
		containerDiv.removeChild(that.appContainer); 
	}); 

	this.appContainer.onclick = function(){		
		ME222WM.z_index += 1; 

		console.log(ME222WM.z_index); 
		
		that.appContainer.style.zIndex = ME222WM.z_index; 
	}; 

	this.startApp(); 
};

ME222WM.util.Window.prototype.startApp = function(){

	if(this.getWndType() === "imgViewer") {
		new ME222WM.apps.ImageViewer(this.appContainer, new Date()); 
	};

	if(this.getWndType() === "memory") {
		var rows = 2; 
		var columns = 4; 

		new ME222WM.apps.MemoryApp(this.appContainer, rows, columns); 
	}; 	
}; 