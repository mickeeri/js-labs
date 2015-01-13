"use strict";

var ME222WM = ME222WM || {};
ME222WM.util = ME222WM.util || {};
ME222WM.apps = ME222WM.apps || {}; 

ME222WM.positions = {
    z_index: 1
}; 

ME222WM.util.init = function(){
    ME222WM.util.launchApps(); 
 };

// Creates window and application based on which icon is clicked. 
ME222WM.util.launchApps = function() {
    // Links to open windows/apps. 
    var imgViewerIcon = document.getElementById("imageviewer");
    var rssIcon = document.getElementById("rssfeed"); 
    var rssIcon2 = document.getElementById("rssfeed2"); 
    var memoryIcon = document.getElementById("memory"); 

    imgViewerIcon.addEventListener("click", function(e){

        new ME222WM.util.Window("imgViewer"); 

        e.preventDefault(); 
    }); 

    rssIcon.addEventListener("click", function(e){
        
        new ME222WM.util.Window("rssReader"); 

        e.preventDefault(); 
    }); 

    rssIcon2.addEventListener("click", function(e){
        new ME222WM.util.Window("rssReader2"); 

        e.preventDefault();
    }); 

    memoryIcon.addEventListener("click", function(e){

        new ME222WM.util.Window("memory"); 

        e.preventDefault(); 
    });


};

window.onload = ME222WM.util.init();  
