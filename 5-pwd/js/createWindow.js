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
	this.newWindow = document.createElement("div"); 
	// Container for whole window is an a-tag. 
	var windowA = document.createElement("a"); 
	var headerDiv = document.createElement("div"); 
	var headerP = document.createElement("p");
	var closeWindowA = document.createElement("a"); 
	var closeButton = document.createElement("img"); 
	var footerDiv = document.createElement("div");

	this.newWindow.style.zIndex = ME222WM.positions.z_index; 

	windowA.href = "#"; 
	windowA.className = "windowA"; 
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
			
		 	/*Sets new windows top and left position to previous windows value plus chosen value*/
			var previousTopPosition = parseInt(newWindows[newWindows.length - 2].style.top); 
			var previousLeftPosition = parseInt(newWindows[newWindows.length - 2].style.left); 

			var newTopPosition; 
			var newLeftPosition; 
	
			newTopPosition = previousTopPosition + 70 + "px"; 
			newLeftPosition = previousLeftPosition + 30 + "px";
			
			that.newWindow.style.top = newTopPosition; 
			that.newWindow.style.left = newLeftPosition; 

			setBorder(newWindows, previousTopPosition, previousLeftPosition); 
		}
	}
	function setBorder(newWindows, previousTopPosition, previousLeftPosition){
		
		// The size of the actual content of the window. 
		var contentHeight; 
		var contentWidth; 

		var headerHeight = newWindows[newWindows.length - 2].firstChild.offsetHeight; 
		var footerHeight = newWindows[newWindows.length - 2].lastChild.offsetHeight;
		var headerWidth = newWindows[newWindows.length - 2].firstChild.offsetWidth; 
		var footerWidth = newWindows[newWindows.length - 2].firstChild.offsetWidth
	
		if(that.getWndType() === "imgViewer"){
			contentHeight = 432; 
			contentWidth = 412; 
		}
		if(that.getWndType() === "rssReader" || that.getWndType() === "rssReader2"){
			contentHeight = 410; 
			contentWidth = 352; 
		}
		if(that.getWndType() === "memory"){
			contentHeight = 412; 
			contentWidth = 342; 
		}
		if(that.getWndType() === "largeImg"){
			contentHeight = 335; 
			contentWidth = 335; 
		}
		if(that.getWndType() === "veryLargeImg"){
			contentHeight = 750; 
			contentWidth = 500; 
		}

		var maxDivHeight = contentHeight + headerHeight + footerHeight + previousTopPosition; 
		var maxDivWidth = contentWidth + previousLeftPosition; 

		if(maxDivHeight > document.body.offsetHeight - 60){
			that.newWindow.style.top = "20px"; 
		}

		console.log("Maxdivwidth: " + maxDivWidth); 
		console.log("Body width: " + document.body.offsetWidth); 


		if(maxDivWidth > document.body.offsetWidth - 50){
			that.newWindow.style.left = "20px"; 
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

	this.startApp(); 
};

ME222WM.util.Window.prototype.startApp = function(){

	var statusP = document.createElement("p"); 
	statusP.className = "footerP"; 
	statusP.innerHTML = "Laddar"; 

	var ajaxLoader = document.createElement("img"); 
	ajaxLoader.src = "pics/icons/ajax-loader.gif"; 
	ajaxLoader.alt ="Sidan laddas."; 
	ajaxLoader.className = "loader"; 

	this.newWindow.lastChild.appendChild(ajaxLoader); 
	this.newWindow.lastChild.appendChild(statusP); 
	

	if(this.getWndType() === "imgViewer") {
		new ME222WM.apps.ImageViewer(this.newWindow, new Date()); 
	};

	if(this.getWndType() === "rssReader") {
		var myRSS = new ME222WM.apps.RssReader(this.newWindow, "http://www.dn.se/nyheter/m/rss/"); 
		console.log(myRSS.offsetWidth); 
	}

	if(this.getWndType() === "rssReader2"){
		new ME222WM.apps.RssReader(this.newWindow, "http://feeds.idg.se/idg/vzzs"); 
	}

	if(this.getWndType() === "memory") {
		var rows = 4; 
		var columns = 4; 

		new ME222WM.apps.MemoryApp(this.newWindow, rows, columns); 
	}; 	

	if(this.getWndType() === "largeImg" || this.getWndType() === "veryLargeImg"){
		ME222WM.apps.ImageViewer.prototype.openLargeImage(this.newWindow, this.imgObject); 
	}
}; 

ME222WM.util.Window.prototype.appendNewWindow = function(contentDiv) {

	


}; 