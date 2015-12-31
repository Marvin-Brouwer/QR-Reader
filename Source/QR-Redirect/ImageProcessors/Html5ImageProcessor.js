'use strict';
class Html5ImageProcessor {
    constructor() {
        navigator.getUserMedia =
            navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;
    }
    nextFallback() { }
    declinedFallback() { }
    hasGetUserMedia() {
        return !!navigator.getUserMedia;
    }
    initiate() {
        if (!this.hasGetUserMedia()) {
            this.nextFallback();
            return;
        }
        this.buildHtml();
        this.initializeVideo();
        qrcode.callback = this.qrCallback.bind(this);
    }
    buildHtml() {
        this.video = document.createElement('video');
        this.video.id = 'mainVideo';
        this.video.muted = true;
        this.video.autoplay = false;
        this.video.loop = true;
        document.body.appendChild(this.video);
    }
    initializeVideo() {
        let animationFrame = null;
        let doVideoParse = false;
        let thecanvas = document.createElement('canvas');
        let parseVideo = () => {
            if (!doVideoParse) {
                window.clearInterval(animationFrame);
                animationFrame = null;
                this.declinedFallback(); // It's either broke or declined
                return;
            }
            console.log('video parse');
            let context = thecanvas.getContext('2d');
            // draw the video contents into the canvas x, y, width, height
            context.drawImage(this.video, 0, 0, thecanvas.width, thecanvas.height);
            // get the image data from the canvas object
            let dataUrl = thecanvas.toDataURL();
            qrcode.decode(dataUrl);
        };
        navigator.getUserMedia({ audio: false, video: true }, stream => {
            doVideoParse = true;
            this.video.src = window.URL.createObjectURL(stream);
            this.video.play();
            animationFrame = window.setInterval(parseVideo, 200);
        }, e => {
            this.video.style.display = 'none';
            doVideoParse = false;
            if (animationFrame != null) {
                window.clearInterval(animationFrame);
                animationFrame = null;
            }
            this.declinedFallback(); // It's either broke or declined
        });
        this.video.style.display = 'block';
    }
    qrCallback(data) {
        Application.current.qrCallback(data, (error) => { });
    }
}
//# sourceMappingURL=Html5ImageProcessor.js.map