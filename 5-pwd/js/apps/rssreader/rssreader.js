"use strict";

ME222WM.apps.RssReader = function(newWindow, url){

	this.newWindow = newWindow; 

    this.rssDiv = document.createElement("div");
	this.rssDiv.className = "rssDiv";
    
	this.getFeed(url);

    return this.rssDiv; 
}

ME222WM.apps.RssReader.prototype.getFeed = function(url){
    var that = this; 

    var xhr = new XMLHttpRequest();

    xhr.open("get", "https://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url="+escape(url), true);

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            that.rssDiv.innerHTML = xhr.responseText; 

           var lastUpdate = new Date().getHours() + ":" +  new Date().getMinutes(); // Måste skrivas med 0 framför. 

            that.newWindow.footerDiv.removeChild(that.newWindow.ajaxLoader); 
            that.newWindow.statusP.innerHTML = ""; 
            that.newWindow.statusP.innerHTML = "Senast uppdaterad " + lastUpdate; 
        }
    }

    xhr.send(null);
}