"use strict"; 

ME222WM.util.Window = function(wndType){

	this.getWndType = function(){
		return wndType; 
	};

	this.renderWindow(); 
}

ME222WM.util.Window.prototype.renderWindow = function(){
	
	var containerDiv = document.getElementById("container"); 
	
	// Göra om denna till en a-tagg istället? 
	this.appContainer = document.createElement("div"); 

	var windowA = document.createElement("a"); 
	var headerDiv = document.createElement("div"); 
	var headerP = document.createElement("p");
	var closeWindowA = document.createElement("a"); 
	var closeButton = document.createElement("img"); 
	var footerDiv = document.createElement("div");

	// // Sets style properties for window. 
	this.appContainer.style.zIndex = ME222WM.positions.z_index; 
	// this.appContainer.style.top = this.getTopPosition() + "px"; 
	// this.appContainer.style.left = this.getLeftPosition() + "px"; 

	this.appContainer.className = "newWindow"; 
	headerDiv.className = "windowHeader"; 
	footerDiv.className = "windowFooter"; 
	headerP.className = "headerP";
	closeWindowA.href = "#"; 
	closeWindowA.className = "closeA"; 

	closeButton.className = "closeButton"; 
	closeButton.alt = "Stäng fönstret"; 
	closeButton.src = "pics/icons/ic_close_grey600_36dp.png";		
	closeButton.onmouseout = function(){
	    this.src = "pics/icons/ic_close_grey600_36dp.png"; 
	};
	closeButton.onmouseover = function(){
	    this.src = "pics/icons/ic_close_white_18dp.png"; 
	}; 

	windowA.href = "#"; 
	windowA.className = "windowA"; 

	containerDiv.appendChild(windowA); 
	windowA.appendChild(this.appContainer); 

	this.appContainer.appendChild(headerDiv); 
	headerDiv.appendChild(headerP);
	headerDiv.appendChild(closeWindowA); 
	closeWindowA.appendChild(closeButton);
	this.appContainer.appendChild(footerDiv); 

	var that = this;

	setPosition(); 

	function setPosition(){
		
		// Node-list with new windows/appContainers. 
		var newWindows = document.getElementsByClassName("newWindow");

		// If there is only one window set default position.  
		if(newWindows.length === 1){
			that.appContainer.style.top = "20px"; 
			that.appContainer.style.left = "20px"; 
		}
		else{
			
			// Sets new windows top and left positon previous windows value plus 60 and 40 px. 
			// This way the new window always is ontop. 
			var previousTopPosition = parseInt(newWindows[newWindows.length - 2].style.top); 
			var previousLeftPosition = parseInt(newWindows[newWindows.length - 2].style.top); 

			var newTopPosition = previousTopPosition + 70 + "px"; 
			var newLeftPosition = previousLeftPosition + 30 + "px"; 

			if(newTopPosition > containerDiv.offsetHeight){
				console.log("Stoppit"); 
			}

			that.appContainer.style.top = newTopPosition; 
			that.appContainer.style.left = newLeftPosition; 
		}
	}

	closeWindowA.addEventListener("click", function(){
		containerDiv.removeChild(windowA); 

		ME222WM.positions.z_index -= 1; 
	}); 

	windowA.addEventListener("click", function(){
		ME222WM.positions.z_index += 1; 

		this.focus(); 
		
		that.appContainer.style.zIndex = ME222WM.positions.z_index; 
	});  	

	var height = this.appContainer.offsetHeight + headerDiv.offsetHeight + footerDiv.offsetHeight; 

	console.log(height); 



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