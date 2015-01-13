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
	this.headerDiv = document.createElement("div"); 
	this.headerP = document.createElement("h2");
	var closeWindowA = document.createElement("a"); 
	var closeButton = document.createElement("img"); 
	this.footerDiv = document.createElement("div");
	this.statusP = document.createElement("p");

	this.newWindow.style.zIndex = ME222WM.positions.z_index; 

	windowA.href = "#"; 
	windowA.className = "windowA"; 
	this.newWindow.className = "newWindow"; 
	this.headerDiv.className = "windowHeader"; 
	this.footerDiv.className = "windowFooter"; 
	this.headerP.className = "headerP";
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
	this.newWindow.appendChild(this.headerDiv); 
	this.headerDiv.appendChild(this.headerP);
	this.headerDiv.appendChild(closeWindowA); 
	closeWindowA.appendChild(closeButton);
	this.newWindow.appendChild(this.footerDiv); 

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

	var headerIcon = document.createElement("img"); 
	headerIcon.className = "headerIcon"; 

	this.statusP.className = "footerP"; 
	this.statusP.innerHTML = "Laddar"; 

	this.ajaxLoader = document.createElement("img"); 
	this.ajaxLoader.src = "pics/icons/ajax-loader.gif"; 
	this.ajaxLoader.alt ="Sidan laddas."; 
	this.ajaxLoader.className = "loader"; 

	this.footerDiv.appendChild(this.ajaxLoader); 
	this.footerDiv.appendChild(this.statusP);  
	this.headerDiv.insertBefore(headerIcon, this.headerDiv.firstChild); 

	if(this.getWndType() === "imgViewer") {
		headerIcon.src = "pics/icons/1420313406_Toolbar_Images.png"; 
		this.headerP.innerHTML = "Image Viewer"; 

		var myImgViewer = new ME222WM.apps.ImageViewer(this, new Date()); 

		this.appendNewWindow(myImgViewer); 
	};

	if(this.getWndType() === "rssReader") {
		
		headerIcon.src = "pics/icons/1420314949_rss_circle_color-128.png"; 
		this.headerP.innerHTML = "RSS Reader"; 

		var myRSS = new ME222WM.apps.RssReader(this, "http://www.dn.se/nyheter/m/rss/");

		this.appendNewWindow(myRSS); 
	}

	if(this.getWndType() === "rssReader2"){
		new ME222WM.apps.RssReader(this.newWindow, "http://feeds.idg.se/idg/vzzs"); 
	}

	if(this.getWndType() === "memory") {
		var rows = 4; 
		var columns = 4; 

		headerIcon.src = "pics/icons/1420585292_Game_Center.png";
		this.headerP.innerHTML = "Memory"; 


		var myMemory = ME222WM.apps.MemoryApp(this, rows, columns); 

		this.appendNewWindow(myMemory); 
	}; 	

	if(this.getWndType() === "largeImg" || this.getWndType() === "veryLargeImg"){
		ME222WM.apps.ImageViewer.prototype.openLargeImage(this.newWindow, this.imgObject); 
	}
}; 

ME222WM.util.Window.prototype.appendNewWindow = function(contentDiv) {
	
	// Här kontrollerar jag senare att den inte är för bred/hög. 

	this.newWindow.insertBefore(contentDiv, this.newWindow.firstChild.nextSibling);  




}; 