var ME222WM = ME222WM || {}; 
ME222WM.util = ME222WM.util || {}; 

ME222WM.util.launch = function(){
	
	var imgViewerIcon = document.getElementById("imageviewer"); 
	var icons = document.getElementsByClassName("iconlink"); 


	imgViewerIcon.onclick = function(e){
		if(e.currentTarget.id === "imageviewer"){
			new ME222WM.util.ImageViewer; 
			return false; 
		}
	};


};


window.onload = ME222WM.util.launch();