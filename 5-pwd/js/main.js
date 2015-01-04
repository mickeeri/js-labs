"use strict";

var ME222WM = ME222WM || {};
ME222WM.util = ME222WM.util || {};

ME222WM.util.launch = {
    x: 15,
    y: 15,
    zIndex: 1,

    createImageViewer: function () {
        var imgViewerIcon = document.getElementById("imageviewer");
        var icons = document.getElementsByClassName("iconlink");

        imgViewerIcon.onclick = function(e){
            if(e.currentTarget.id === "imageviewer"){

                ME222WM.util.launch.x += 25;
                ME222WM.util.launch.y += 25;
                ME222WM.util.launch.zIndex += 1;

                console.log("onlcik");

                new ME222WM.util.ImageViewer(ME222WM.util.launch.x, ME222WM.util.launch.y);

                return false;
            }
	   };
    }
};

window.onload = ME222WM.util.launch.createImageViewer();