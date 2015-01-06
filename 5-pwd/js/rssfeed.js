"use strict";

ME222WM.util.RssReader = function(marginX, marginY){


    var containerDiv = document.getElementById("container");

    this.rssDiv = document.createElement("div");
    this.rssDiv.className = "imgWindow"; // Change this classname.
    this.rssDiv.style.margin = marginX + "px " + marginY+"px";
    this.rssDiv.style.height = "200px";


  //  this.rssDiv.setAttribute("style", "margin: " + this.y + "px " + this.x + "px;");
    this.rssDiv.style.zIndex = ME222WM.util.launch.zIndex;

    containerDiv.appendChild(this.rssDiv);
}