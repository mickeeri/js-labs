"use strict"; 

ME222WM.util.Window = function(wndType, imgObject){

	this.getWndType = function(){
		return wndType; 
	};

	this.imgObject = imgObject; 

	this.renderWindow(); 
};

ME222WM.util.Window.prototype.renderWindow = function(){
	
	var containerDiv = document.getElementById("container"); 
	this.newWindow = document.createElement("div"); 
	// Container for whole window is an a-tag. 
	// var windowA = document.createElement("a"); 
	this.headerDiv = document.createElement("div"); 
	this.headerP = document.createElement("h2");
	var closeWindowA = document.createElement("a"); 
	var closeButton = document.createElement("img"); 
	this.footerDiv = document.createElement("div");
	this.statusP = document.createElement("p");

	this.newWindow.style.zIndex = ME222WM.positions.z_index; 

	// windowA.href = "#"; 
	// windowA.className = "windowA"; 
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

	//containerDiv.appendChild(windowA); 
	containerDiv.appendChild(this.newWindow); 
	this.newWindow.appendChild(this.headerDiv); 
	this.headerDiv.appendChild(this.headerP);
	this.headerDiv.appendChild(closeWindowA); 
	closeWindowA.appendChild(closeButton);
	this.newWindow.appendChild(this.footerDiv); 

	var that = this;

	setPosition(); 

	// Sets top and left position of new window.
	function setPosition(){
		
		// Node-list with new windows/newWindows. 
		var newWindows = document.getElementsByClassName("newWindow");

		// If there is only one window set default position.  
		if(newWindows.length === 1){
			that.newWindow.style.top = "20px"; 
			that.newWindow.style.left = "20px"; 
		}
		else{
			// Compares the new windows top and left margin to previous windows value and increases that. 
			var previousTopPosition = parseInt(newWindows[newWindows.length - 2].style.top); 
			var previousLeftPosition = parseInt(newWindows[newWindows.length - 2].style.left); 

			var newTopPosition; 
			var newLeftPosition; 
	
			newTopPosition = previousTopPosition + 70 + "px"; 
			newLeftPosition = previousLeftPosition + 30 + "px";
			
			that.newWindow.style.top = newTopPosition; 
			that.newWindow.style.left = newLeftPosition; 
		}
	}

	 
	closeWindowA.addEventListener("click", function(){
		containerDiv.removeChild(that.newWindow); 

		ME222WM.positions.z_index -= 1; 
	}); 

	// Increase z-index if user clicks on div.
	this.newWindow.addEventListener("mousedown", function(e){
		
		ME222WM.positions.z_index += 1; 

		this.focus(); 
		
		that.newWindow.style.zIndex = ME222WM.positions.z_index; 
	});  	

	this.startApp(); 
};

// Starts the correct app by comparing the window type parameter.
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
	}

	if(this.getWndType() === "rssReader") {
		
		headerIcon.src = "pics/icons/1420314949_rss_circle_color-128.png"; 
		this.headerP.innerHTML = "RSS Reader"; 

		var myRSS = new ME222WM.apps.RssReader(this, "http://www.dn.se/nyheter/m/rss/");

		this.appendNewWindow(myRSS); 
	}

	if(this.getWndType() === "rssReader2"){
		headerIcon.src = "pics/icons/1420314949_rss_circle_color-128.png";
		this.headerP.innerHTML = "Rss Reader"; 

		var myRSS2 = new ME222WM.apps.RssReader(this, "http://www.svd.se/?service=rss"); 

		this.appendNewWindow(myRSS2); 
	}

	if(this.getWndType() === "memory") {
		var rows = 4; 
		var columns = 4; 

		headerIcon.src = "pics/icons/1420585292_Game_Center.png";
		this.headerP.innerHTML = "Memory"; 

		var myMemory = ME222WM.apps.MemoryApp(this, rows, columns); 

		this.appendNewWindow(myMemory); 
	} 	

	if(this.getWndType() === "largeImg"){	
		headerIcon.src = "pics/icons/1420313406_Toolbar_Images.png";
		this.footerDiv.removeChild(this.ajaxLoader); 

		var largeImgWindow = new ME222WM.apps.LargeImgWindow(this, this.imgObject); 

		this.appendNewWindow(largeImgWindow); 
	}
}; 

// Adds the content of an app to the new window. 
ME222WM.util.Window.prototype.appendNewWindow = function(contentDiv) {

	this.newWindow.insertBefore(contentDiv, this.newWindow.firstChild.nextSibling);  

	var totalHeight = this.newWindow.offsetHeight + parseInt(this.newWindow.style.top); 
	var totalWidth = this.newWindow.offsetWidth + parseInt(this.newWindow.style.left); 

	// Solves overflow problem in IE. 
	this.newWindow.style.width = contentDiv.offsetWidth + "px"; 

	// If height of window and its top-margin is more than body offsetHeight the position is changed to default position. 
	if(totalHeight > document.body.offsetHeight){
		this.newWindow.style.top = "20px"; 
	}
	if(totalWidth > document.body.offsetWidth){
		this.newWindow.style.left = "20px"; 
		this.newWindow.style.top = "20px"; 
	}
}; 