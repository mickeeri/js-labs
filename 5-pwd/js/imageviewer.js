ME222WM.util.ImageViewer = function(){
	this.windowDiv = document.createElement("div"); 
	this.windowDiv.className = "imgWindow"; 

	this.containerDiv = document.getElementById("container"); 

	this.containerDiv.appendChild(this.windowDiv); 
    
	this.closeButton = document.createElement("input"); 
	this.closeButton.type = "button"; 
	this.closeButton.value = "Stäng fönster"; 
	this.windowDiv.appendChild(this.closeButton); 
    
    this.getImages(); 

	this.closeButton.onclick = closeWindow; 

	var that = this; 
	
	function closeWindow(){
		that.containerDiv.removeChild(that.windowDiv); 
	}
}

ME222WM.util.ImageViewer.prototype.getImages = function(){
    var url = "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/"; 
    
    var that = this; 
    
    var xhr = new XMLHttpRequest(); 
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            var imageArray = JSON.parse(xhr.responseText); 
            that.renderImages(imageArray); 
            console.log(imageArray); 
        } 
        else{
            console.log("Kunde inte motta bilderna."); 
        }
    };
    
    xhr.open("get", url, true); 
    xhr.send(null); 
}

ME222WM.util.ImageViewer.prototype.renderImages = function(images){
    
}