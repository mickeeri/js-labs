"use strict";

var ME222WM = ME222WM || {};
ME222WM.util = ME222WM.util || {};

ME222WM.util.launch = {
    marginX: 15, // Check if x and y is the right names.
    imgViewerStartingY: 15,
    zIndex: 1,
    rssMarginY: 600,
    rssMarginX: 15,
    memoryMarginX: 15,
    memoryMarginY: 1000,

    // Launch Image Viewer
    createImageViewer: function () {

        var startTime = new Date();

        ME222WM.util.launch.marginX += 30;
        ME222WM.util.launch.imgViewerStartingY += 30;
        if(ME222WM.util.launch.marginX > 400){
            this.marginX = 15; 
            this.imgViewerStartingY -= 200; 
        }
        ME222WM.util.launch.zIndex += 1;

        new ME222WM.util.ImageViewer(ME222WM.util.launch.marginX, ME222WM.util.launch.imgViewerStartingY, startTime);
    },

    // Launch Image Viewer
    createRssReader: function(){

        var rssMarginX = ME222WM.util.launch.rssMarginX += 30;
        var rssMarginY = ME222WM.util.launch.rssMarginY += 30;

        new ME222WM.util.RssReader(rssMarginX, rssMarginY);
    }

    // createMemoryApp: function(){
    //     var memoryMarginX = ME222WM.util.launch.memoryMarginX +=30; 
    //     var memoryMarginY = ME222WM.util.launch.memoryMarginY +=30; 

    //     console.log(memoryMarginX); 

    //     new ME222WM.util.MemoryApp(4, 4, memoryMarginX, memoryMarginY); 
    // }
};

//WINDOW.ONLOAD------------------------------------------------------------ Lägga denna i annat dokument?
window.onload = function(){
    var imgViewerIcon = document.getElementById("imageviewer");
    var rssIcon = document.getElementById("rssfeed");
    var memoryIcon = document.getElementById("memory");

    imgViewerIcon.addEventListener("click", function(e){
    	ME222WM.util.launch.createImageViewer();
    	e.preventDefault();
    });

    rssIcon.addEventListener("click", function(e){

        ME222WM.util.launch.createRssReader();
    	e.preventDefault();
    });

    memoryIcon.addEventListener("click", function(e){

        var memoryMarginX = ME222WM.util.launch.memoryMarginX +=30; 
        var memoryMarginY = ME222WM.util.launch.memoryMarginY +=30;

        // Behöver egentligen inte marginx och y som parametrar? 
        ME222WM.util.createWindow("memory", memoryMarginX, memoryMarginY); 
        e.preventDefault(); 
    });
};