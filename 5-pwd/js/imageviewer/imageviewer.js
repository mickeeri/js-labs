"use strict";

ME222WM.apps.ImageViewer = function(imgViewerDiv, startTime){

    this.getStartTime = function(){
        return startTime; 
    };

    this.imgContainer = document.createElement("div");
    this.imgContainer.className = "imgContainer";
    imgViewerDiv.insertBefore(this.imgContainer, imgViewerDiv.firstChild.nextSibling); 

    var header = imgViewerDiv.firstChild;
    var headerIcon = document.createElement("img"); 
    headerIcon.src = "pics/icons/1420313406_Toolbar_Images.png"; 
    headerIcon.className = "headerIcon"; 

    this.footer = imgViewerDiv.lastChild; 
    header.firstChild.innerHTML = "Image Viewer"; 

    header.insertBefore(headerIcon, header.firstChild);

    this.ajaxLoader = this.footer.firstChild; 
    this.statusP = this.footer.lastChild; 

    this.getImages();
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
            that.footer.removeChild(that.ajaxLoader);
            that.statusP.innerHTML = ""; 


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
        
        var imgType; 

        if(image.height > 400){
            imgType = "veryLargeImg"; 
        }
        else{
            imgType = "largeImg"; 
        }

        // Clicking thumbnail opens method openImage that takes img object as parameter. 
        new ME222WM.util.Window(imgType, image);  
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

    var loadTime = endTime.getTime() - this.getStartTime().getTime() + " ms";

    this.statusP.innerHTML = images.length + " bilder laddades på " + loadTime;
    this.footer.appendChild(this.statusP); 
}; 


ME222WM.apps.ImageViewer.prototype.openLargeImage = function(largeImgDiv, imgObject){


    var largeImgA = document.createElement("a"); 
    largeImgA.href = "#";
    largeImgA.className = "largeImgA"; 

    largeImgA.style.height = imgObject.height + "px"; 
    largeImgA.style.width = imgObject.width + "px"; 
     
    var largeImg = document.createElement("img"); 
    largeImg.src = imgObject.URL; 
    largeImg.className = "largeImg"; 

    largeImgA.appendChild(largeImg); 

    largeImgDiv.insertBefore(largeImgA, largeImgDiv.firstChild.nextSibling); 

    function changeBackground(){
        var infoP = document.createElement("p"); 
        infoP.innerHTML = "Klicka på bilden för att göra den till bakgrundsbild. För original ";
        infoP.className = "footerP";  
        var defaultBackgroundA = document.createElement("a");
        defaultBackgroundA.innerHTML = "klicka här"; 
        defaultBackgroundA.href = "#"; 

        infoP.appendChild(defaultBackgroundA);
        largeImgDiv.lastChild.appendChild(infoP); 

        largeImgA.addEventListener("click", function(){
            document.body.style.backgroundImage = "url('" + imgObject.URL + "')"; 
            // document.body.style.backgroundRepeat = "no-repeat"; 
            if(imgObject.height > 400){       
                document.body.id = "bodyJsRepeat"; 
            }
            else {
                document.body.id = "bodyJsNoRepeat"; 
            }
        }); 

        defaultBackgroundA.addEventListener("click", function(e){        
            document.body.id = "defaultBody"; 
            document.body.style.backgroundImage = ""; 
        }); 
    }
}; 




