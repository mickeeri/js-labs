"use strict";

ME222WM.apps.RssReader = function(newWindow, url){

	this.rssDiv = document.createElement("div");
	this.rssDiv.className = "rssDiv";
	newWindow.insertBefore(this.rssDiv, newWindow.firstChild.nextSibling);

	var header = newWindow.firstChild; 
    header.firstChild.innerHTML = "Rss Reader"; 

    this.footer = newWindow.lastChild; 

    this.ajaxLoader = this.footer.firstChild; 
    this.statusP = this.footer.lastChild; 

    var headerIcon = document.createElement("img"); 
    headerIcon.src = "pics/icons/1420314949_rss_circle_color-128.png"; 
    headerIcon.className = "headerIcon"; 
    header.insertBefore(headerIcon, header.firstChild); 

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

           var lastUpdate = new Date().getHours() + ":" +  new Date().getMinutes(); 

            that.footer.removeChild(that.ajaxLoader); 
            that.statusP.innerHTML = ""; 
            that.statusP.innerHTML = "Senast uppdaterad " + lastUpdate; 
        }
    }

    xhr.send(null);
}