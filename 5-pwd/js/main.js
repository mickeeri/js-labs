"use strict";

var ME222WM = ME222WM || {};
ME222WM.util = ME222WM.util || {};
ME222WM.apps = ME222WM.apps || {}; 
ME222WM.z_index = ME222WM.z_index || {}; 

ME222WM.positions = {
    topPosition: document.getElementById("container").offsetTop,
    leftPosition: document.getElementById("container").offsetLeft,
    z_index: 1
}

ME222WM.util.init = function(){
    ME222WM.util.launchApps(); 
 };

ME222WM.util.launchApps = function() {
    
    // Links to open windows/apps. 
    var imgViewerIcon = document.getElementById("imageviewer");
    var rssIcon = document.getElementById("rssfeed"); 
    var memoryIcon = document.getElementById("memory"); 
    
    var containerDiv = document.getElementById("container"); 

    // Top and left positions of windows. 
    // this.topPosition = containerDiv.offsetTop; 
    // this.leftPosition = containerDiv.offsetLeft + 20; 

    // var imgViewerLeft = containerDiv.offsetLeft + 20;
    // var imgViewerTop = containerDiv.offsetTop; 

    // var rssLeft = containerDiv.offsetLeft + 20; 
    // var rssTop = containerDiv.offsetTop; 

    // var memoryLeft = containerDiv.offsetLeft + 20; 
    // var memoryTop = containerDiv.offsetTop; 

    console.log("Closetag" + document.getElementsByClassName("closeA")); 

    var that = this; 

    imgViewerIcon.addEventListener("click", function(e){
        
        var topPosition = ME222WM.positions.topPosition; 
        var leftPosition = ME222WM.positions.leftPosition; 


        ME222WM.z_index += 1; 
        that.topPosition += 40; 
        that.leftPosition += 40; 

        new ME222WM.util.Window("imgViewer", that.topPosition, that.leftPosition); 

        e.preventDefault(); 
    }); 

    memoryIcon.addEventListener("click", function(e){
        ME222WM.z_index += 1; 
        that.topPosition += 40; 
        that.leftPosition += 40; 

        new ME222WM.util.Window("memory", that.topPosition, that.leftPosition); 

        e.preventDefault(); 
    });


};

window.onload = ME222WM.util.init();  
