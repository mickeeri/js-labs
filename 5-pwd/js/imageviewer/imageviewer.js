//"use strict";

ME222WM.util.ImageViewer = function(y, x, startTime){
	this.counter = 0;

    this.y = y;
    this.x = x;
    this.startTime = startTime; 

    this.containerDiv = document.getElementById("container");

    // Div for imageViewer window.
    this.imgDiv = document.createElement("div");
	this.imgDiv.className = "imgWindow";
    this.imgDiv.setAttribute("style", "margin: " + this.y + "px " + this.x + "px;");
    this.imgDiv.style.zIndex = ME222WM.util.launch.zIndex;
	this.containerDiv.appendChild(this.imgDiv);

    this.headerDiv = document.createElement("div");
    this.headerDiv.className = "windowHeader";
    this.imgDiv.appendChild(this.headerDiv);

    this.imgContainer = document.createElement("div");
    this.imgContainer.className = "imgContainer";
    this.imgDiv.appendChild(this.imgContainer);

    this.footerDiv = document.createElement("div");
    this.footerDiv.className = "windowFooter";
    this.imgDiv.appendChild(this.footerDiv);

    this.topHeader = document.createElement("div");
    this.topHeader.className = "topHeader";
    var headerP = document.createElement("p"); 
    headerP.className = "headerP"; 
    headerP.innerHTML = "Image Viewer"; 
    this.headerDiv.appendChild(this.topHeader);
    this.topHeader.appendChild(headerP); 

    var closeWindowA = document.createElement("a");
    closeWindowA.href = "#";
    closeWindowA.className = "closeA";
    var closeButton = document.createElement("img");

    closeButton.src = "pics/icons/ic_close_grey600_36dp.png";
    
    closeButton.onmouseout = function(){
        this.src = "pics/icons/ic_close_grey600_36dp.png"; 
    };

    closeButton.onmouseover = function(){
        this.src = "pics/icons/ic_close_white_18dp.png"; 
    }; 
    closeButton.className = "closeButton";
    closeButton.alt = "Stäng fönster";

    this.topHeader.appendChild(closeWindowA);
    closeWindowA.appendChild(closeButton);

    this.ajaxLoader = document.createElement("img");
    this.ajaxLoader.src = "pics/icons/ajax-loader.gif";
    this.ajaxLoader.alt = "Sidan laddas.";
    this.ajaxLoader.className = "loader";
    this.imgContainer.appendChild(this.ajaxLoader);

    this.getImages();

    var that = this;

    closeWindowA.onclick = function(){

        that.containerDiv.removeChild(that.imgDiv);

        // Decreses coordinates if window closes.
        ME222WM.util.launch.marginX -= 30;
        ME222WM.util.launch.imgViewerStartingY -= 30;

        return false;
    };

    // If user clicks on image window z-index changes. 
    this.imgDiv.onclick = function(){

        // Increses z-index so that div lands on top of the other divs.
        ME222WM.util.launch.zIndex += 1;

        that.imgDiv.setAttribute("style", "z-index: " + ME222WM.util.launch.zIndex + "; margin: " + that.y + "px " + that.x + "px;");
    };
};

ME222WM.util.ImageViewer.prototype.getImages = function(){

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

ME222WM.util.ImageViewer.prototype.renderImages = function(images){

    this.calculateSize(images);

    var that = this;

    images.forEach(function(image, index){
       that.renderImage(image, index);
    });
};

ME222WM.util.ImageViewer.prototype.renderImage = function(image, index){

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
        // that.openImage(image); 

        that.openLargeImage(image); 

        console.log(that)
    }); 
};

ME222WM.util.ImageViewer.prototype.calculateSize = function(images){

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

ME222WM.util.ImageViewer.prototype.timeAjaxLoad = function(images, endTime){
    var statusP = document.createElement("p"); 
    statusP.className = "footerP"; 

    var loadTime = endTime.getTime() - this.startTime.getTime() + " ms";

    statusP.innerHTML = images.length + " bilder laddades på " + loadTime;
    this.footerDiv.appendChild(statusP); 
}; 

ME222WM.util.ImageViewer.prototype.openLargeImage = function(imgObject){
    
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


