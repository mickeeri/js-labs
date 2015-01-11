"use strict"; 

ME222WM.util.Window = function(wndType, imgObject){

	this.getWndType = function(){
		return wndType; 
	};

	this.imgObject = imgObject; 

	this.renderWindow(); 
}

ME222WM.util.Window.prototype.renderWindow = function(){
	
	var containerDiv = document.getElementById("container"); 
	
	// Göra om denna till en a-tagg istället? 
	this.newWindow = document.createElement("div"); 

	var windowA = document.createElement("a"); 
	var headerDiv = document.createElement("div"); 
	var headerP = document.createElement("p");
	var closeWindowA = document.createElement("a"); 
	var closeButton = document.createElement("img"); 
	var footerDiv = document.createElement("div");

	this.newWindow.style.zIndex = ME222WM.positions.z_index; 

	this.newWindow.className = "newWindow"; 
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
	windowA.appendChild(this.newWindow); 

	this.newWindow.appendChild(headerDiv); 
	headerDiv.appendChild(headerP);
	headerDiv.appendChild(closeWindowA); 
	closeWindowA.appendChild(closeButton);
	this.newWindow.appendChild(footerDiv); 

	var that = this;

	setPosition(); 

	function setPosition(){
		
		// Node-list with new windows/newWindows. 
		var newWindows = document.getElementsByClassName("newWindow");

		// If there is only one window set default position.  
		if(newWindows.length === 1){
			that.newWindow.style.top = "20px"; 
			that.newWindow.style.left = "20px"; 
		}
		else{
			
			// Sets new windows top and left positon previous windows value plus 60 and 40 px. 
			// This way the new window always is ontop. 
			var previousTopPosition = parseInt(newWindows[newWindows.length - 2].style.top); 
			var previousLeftPosition = parseInt(newWindows[newWindows.length - 2].style.left); 

			var newTopPosition; 
			var newLeftPosition; 
	
			newTopPosition = previousTopPosition + 70 + "px"; 
			newLeftPosition = previousLeftPosition + 30 + "px";
			
			that.newWindow.style.top = newTopPosition; 
			that.newWindow.style.left = newLeftPosition; 

			var contentHeight = newWindows[newWindows.length - 2].firstChild.nextSibling.offsetHeight; 
			var headerHeight = newWindows[newWindows.length - 2].firstChild.offsetHeight; 
			var footerHeight = newWindows[newWindows.length - 2].lastChild.offsetHeight;

			if(that.getWndType() === "veryLargeImg"){
				contentHeight = 750; 
			}

			var prevDivHeight = contentHeight + headerHeight + footerHeight + previousTopPosition; 

			if(prevDivHeight > document.body.offsetHeight - 100){
				that.newWindow.style.top = "30px"; 
			}
		}
	}

	closeWindowA.addEventListener("click", function(){
		containerDiv.removeChild(windowA); 

		ME222WM.positions.z_index -= 1; 
	}); 

	windowA.addEventListener("mousedown", function(e){
		
		ME222WM.positions.z_index += 1; 

		this.focus(); 
		
		that.newWindow.style.zIndex = ME222WM.positions.z_index; 
	});  	

	var height = this.newWindow.offsetHeight + headerDiv.offsetHeight + footerDiv.offsetHeight; 
	this.startApp(); 
};

ME222WM.util.Window.prototype.startApp = function(){

	if(this.getWndType() === "imgViewer") {
		new ME222WM.apps.ImageViewer(this.newWindow, new Date()); 
	};

	if(this.getWndType() === "memory") {
		var rows = 2; 
		var columns = 4; 

		new ME222WM.apps.MemoryApp(this.newWindow, rows, columns); 
	}; 	

	if(this.getWndType() === "largeImg" || this.getWndType() === "veryLargeImg"){
		ME222WM.apps.ImageViewer.prototype.openLargeImage(this.newWindow, this.imgObject); 
	}
}; 

// ME222WM.util.Window.prototype.openLargeImageWindow = function(imgObject){
	

// 	new this.Window("largeImg"); 


// 	var largeImgA = document.createElement("a"); 
// 	largeImgA.href = "#";
// 	// this.newWindow.insertBefore(largeImgA, this.newWindow.firstChild.nextSibling);

// 	this.newWindow.appendChild(largeImgA); 
	
// 	var largeImg = document.createElement("img"); 
// 	largeImg.src = imgObject.src; 
// 	largeImg.width = imgObject.width; 
// 	largeImg.height = imgObject.height; 

// 	largeImgA.appendChild(largeImg); 

// }; 


// ME222WM.apps.ImageViewer.prototype.openLargeImage = function(imgObject){
    
//     var largeImgDiv = document.createElement("div"); 
//     largeImgDiv.className = "largeImgDiv"; 
//     this.containerDiv.appendChild(largeImgDiv); 
//     ME222WM.positions.z_index += 1; 

//     largeImgDiv.setAttribute("style", "z-index: " + ME222WM.util.launch.zIndex + ";" + "margin: " + this.y + "px " + this.x + "px;");

//     var largeImg = document.createElement("img"); 
//     largeImg.src = imgObject.URL; 
//     largeImg.width = imgObject.width; 
//     largeImg.height = imgObject.height; 

//     largeImgDiv.appendChild(largeImg); 
// };