"use strict";

ME222WM.apps.ImageViewer = function(imgViewerDiv, startTime){

    this.getStartTime = function(){
        console.log(startTime); 
        return startTime; 
    };

    this.imgContainer = document.createElement("div");
    this.imgContainer.className = "imgContainer";
    imgViewerDiv.insertBefore(this.imgContainer, imgViewerDiv.firstChild.nextSibling); 

    this.ajaxLoader = document.createElement("img");
    this.ajaxLoader.src = "pics/icons/ajax-loader.gif";
    this.ajaxLoader.alt = "Sidan laddas.";
    this.ajaxLoader.className = "loader";
    this.imgContainer.appendChild(this.ajaxLoader);

    var header = imgViewerDiv.firstChild; 
    this.footer = imgViewerDiv.lastChild; 
    header.firstChild.innerHTML = "Image Viewer"; 

    this.getImages();
};

ME222WM.apps.ImageViewer.prototype.getImages = function(){

    this.counter = 0;

    var url = "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/";

    var that = this;

    var xhr = new XMLHttpRequest();

    xhr.open("get", url, true);
    xhr.onreadystatechange = function(){

        if(xhr.readyState === 4 && xhr.status === 200){

            // Remove loader when pictures are loaded.
            that.imgContainer.removeChild(that.ajaxLoader);

            var imageArray = JSON.parse(xhr.responseText);

            that.renderImages(imageArray);

            var endTime = new Date();

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

    this.imgAtag.addEventListener("click", function(e){
        // Clicking thumbnail opens method openImage that takes img object as parameter. 
        that.openLargeImage(image); 
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

    this.maxHeight = sortedArray[0].thumbHeight;

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
    var statusP = document.createElement("p"); 
    statusP.className = "footerP"; 

    console.log(this.getStartTime()); 

    var loadTime = endTime.getTime() - this.getStartTime().getTime() + " ms";

    statusP.innerHTML = images.length + " bilder laddades på " + loadTime;
    this.footer.appendChild(statusP); 
}; 

ME222WM.apps.ImageViewer.prototype.openLargeImage = function(imgObject){
    
    var largeImgDiv = document.createElement("div"); 
    largeImgDiv.className = "largeImgDiv"; 
    this.containerDiv.appendChild(largeImgDiv); 
    ME222WM.util.launch.zIndex += 1; 

    // largeImgDiv.style.zIndex = ME222WM.util.launch.zIndex;
    largeImgDiv.setAttribute("style", "z-index: " + ME222WM.util.launch.zIndex + ";" + "margin: " + this.y + "px " + this.x + "px;");

    console.log(imgObject); 

    var largeImg = document.createElement("img"); 
    largeImg.src = imgObject.URL; 
    largeImg.width = imgObject.width; 
    largeImg.height = imgObject.height; 

    largeImgDiv.appendChild(largeImg); 


};


