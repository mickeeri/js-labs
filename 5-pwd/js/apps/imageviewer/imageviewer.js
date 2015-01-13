"use strict";

ME222WM.apps.ImageViewer = function(newWindow, startTime){

    this.getStartTime = function(){
        return startTime; 
    };

    this.newWindow = newWindow; 

    this.imgContainer = document.createElement("div");
    this.imgContainer.className = "imgContainer";

    this.getImages();

    return this.imgContainer; 
};

ME222WM.apps.ImageViewer.prototype.getImages = function(){

    var url = "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/";

    var that = this;

    var xhr = new XMLHttpRequest();

    xhr.open("get", url, true);
    xhr.onreadystatechange = function(){

        if(xhr.readyState === 4 && xhr.status === 200){

            var imageArray = JSON.parse(xhr.responseText);

            that.renderImages(imageArray);

            var endTime = new Date();

            // Remove loader and status when pictures are loaded.
            
            that.newWindow.statusP.innerHTML = ""; 

            that.newWindow.footerDiv.removeChild(that.newWindow.ajaxLoader);
            that.timeAjaxLoad(imageArray, endTime);
        }
    };

    xhr.send(null);
};

ME222WM.apps.ImageViewer.prototype.renderImages = function(images){

    this.calculateSize(images);

    var that = this;

    images.forEach(function(image, index){
       that.renderImage(image, index);
    });
};

ME222WM.apps.ImageViewer.prototype.renderImage = function(image, index){

    this.imgAtag = document.createElement("a");
    this.imgAtag.className = "imgA";
    this.imgAtag.href = "#";

    var thumbnail = document.createElement("img");
    thumbnail.className = "thumbnails";
    thumbnail.src = image.thumbURL;
    thumbnail.width = image.thumbWidth;
    thumbnail.height = image.thumbHeight;

    this.imgContainer.appendChild(this.imgAtag);
    this.imgAtag.appendChild(thumbnail);

    this.imgAtag.setAttribute("style", "width: " + this.maxWidth + "px;" + " height: " + this.maxHeight + "px;");

    var that = this; 

    this.imgAtag.addEventListener("mouseup", function(e){
        if(e.button === 0){
            new ME222WM.util.Window("largeImg", image);  
        }
        // Ability to change background image on right mouse button click. 
        if(e.button === 2){
            document.body.style.backgroundImage = "url('" + image.URL + "')";
            document.body.id = "bodyJsRepeat"; 
        }
        
    }); 
};

ME222WM.apps.ImageViewer.prototype.calculateSize = function(images){

    // Making copy of array.
    var sortedArray = images.slice();

    // Height
    sortedArray.sort(function(a, b) {
        if(a.thumbHeight > b.thumbHeight){
            return 1;
        }
        if(a.thumbHeight < b.thumbHeight){
            return -1;
        }
        // a is equal to b.
        return 0;
    });

    this.maxHeight = sortedArray[sortedArray.length - 1].thumbHeight;

    // Calculating largest width
    sortedArray.sort(function(a, b) {
        if(a.thumbWidth > b.thumbWidth){
            return 1;
        }
        if(a.thumbWidth < b.thumbWidth){
            return -1;
        }
        // a is equal to b
        return 0;
    });
    
    this.maxWidth = sortedArray[sortedArray.length - 1].thumbWidth;
};

ME222WM.apps.ImageViewer.prototype.timeAjaxLoad = function(images, endTime){

    var loadTime = endTime.getTime() - this.getStartTime().getTime() + " ms";

    this.newWindow.statusP.innerHTML = images.length + " bilder laddades på " + loadTime;
}; 







