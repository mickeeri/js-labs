"use strict";

var ME222WM = ME222WM || {};
ME222WM.util = ME222WM.util || {};

ME222WM.util.launch = {
    marginX: 15, // Check if x and y is the right names.
    marginY: 15,
    zIndex: 1,

    createImageViewer: function () {

        var startTime = new Date();

        ME222WM.util.launch.marginX += 25;
        ME222WM.util.launch.marginY += 25;
        ME222WM.util.launch.zIndex += 1;

        new ME222WM.util.ImageViewer(ME222WM.util.launch.marginX, ME222WM.util.launch.marginY, startTime);
    },

    createRssReader: function(){

        var rssMarginX = ME222WM.util.launch.marginX += 120;
        var rssMarginY = ME222WM.util.launch.marginY += 20;

        new ME222WM.util.RssReader(rssMarginX, rssMarginY);
    }
};

//WINDOWONLOAD------------------------------------------------------------
window.onload = function(){
    var imgViewerIcon = document.getElementById("imageviewer");

    imgViewerIcon.addEventListener("click", function(e){
    	ME222WM.util.launch.createImageViewer();
    	e.preventDefault();
    });

    var rssIcon = document.getElementById("rssfeed");

    // rssIcon.onclick = ME222WM.util.launch.createRssReader();

    rssIcon.addEventListener("click", function(e){

        ME222WM.util.launch.createRssReader();

    	e.preventDefault();
    });
};


// Metod som heter createWindow som öppnar alla fönster?