ME222WM.util.createWindow = function(wndType, marginX, marginY){

	var containerDiv = document.getElementById("container"); 
	
	var appContainer = document.createElement("div"); 
	appContainer.style.margin = marginX + "px " + marginY+"px"; 
	appContainer.style.zIndex = ME222WM.util.launch.zIndex; 
	containerDiv.appendChild(appContainer); 

	var headerDiv = document.createElement("div"); 
	headerDiv.className = "windowHeader"; 
	appContainer.appendChild(headerDiv); 

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

	closeWindowA.addEventListener("click", function(e){
		console.log(e.currentTarget); 

		if(wndType === "memory"){
			console.log(this); 
			containerDiv.removeChild(appContainer); 

			ME222WM.util.launch.memoryMarginX -= 30; 
			ME222WM.util.launch.memoryMarginY -= 30; 
		}; 
	}); 

	appContainer.onclick = function(){
		// ME222WM.util.launch.zIndex += 1;

		this.style.zIndex += 1; 

		marginX += 30; 
		marginY += 30; 

		// if(wndType === "memory"){
		// 	this.style.margin = (ME222WM.util.launch.memoryMarginX + 30) + " px" + (ME222WM.util.launch.memoryMarginY + 30) + " px"; 
		// }
		
		// Måste hitta bättre sätt att hantera fönstrens postitioner. 
		
	}; 

	var footerDiv = document.createElement("div");
	footerDiv.className = "windowFooter"; 
	appContainer.appendChild(footerDiv); 

	if(wndType === "memory"){
		new ME222WM.util.MemoryApp(appContainer, 4, 4); 
	}
}