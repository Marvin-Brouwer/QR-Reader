var Html5ImageProcessor = (function () {
    function Html5ImageProcessor() {
        navigator.getUserMedia =
            navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;
    }
    Html5ImageProcessor.prototype.nextFallback = function () { };
    Html5ImageProcessor.prototype.declinedFallback = function () { };
    Html5ImageProcessor.prototype.hasGetUserMedia = function () {
        return !!navigator.getUserMedia;
    };
    Html5ImageProcessor.prototype.initiate = function () {
        if (!this.hasGetUserMedia()) {
            this.nextFallback();
            return;
        }
        this.buildHtml();
        this.initializeVideo();
        qrcode.callback = this.qrCallback.bind(this);
    };
    Html5ImageProcessor.prototype.buildHtml = function () {
        this.video = document.createElement('video');
        this.video.id = 'mainVideo';
        this.video.muted = true;
        this.video.autoplay = false;
        this.video.loop = true;
        document.body.appendChild(this.video);
    };
    Html5ImageProcessor.prototype.initializeVideo = function () {
        var _this = this;
        var animationFrame = null;
        var doVideoParse = false;
        var thecanvas = document.createElement('canvas');
        var parseVideo = function () {
            if (!doVideoParse) {
                window.clearInterval(animationFrame);
                animationFrame = null;
                _this.declinedFallback(); // It's either broke or declined
                return;
            }
            console.log('video parse');
            var context = thecanvas.getContext('2d');
            // draw the video contents into the canvas x, y, width, height
            context.drawImage(_this.video, 0, 0, thecanvas.width, thecanvas.height);
            // get the image data from the canvas object
            var dataUrl = thecanvas.toDataURL();
            qrcode.decode(dataUrl);
        };
        navigator.getUserMedia({ audio: false, video: true }, function (stream) {
            doVideoParse = true;
            _this.video.src = window.URL.createObjectURL(stream);
            _this.video.play();
            animationFrame = window.setInterval(parseVideo, 200);
        }, function (e) {
            _this.video.style.display = 'none';
            doVideoParse = false;
            if (animationFrame != null) {
                window.clearInterval(animationFrame);
                animationFrame = null;
            }
            _this.declinedFallback(); // It's either broke or declined
        });
        this.video.style.display = 'block';
    };
    Html5ImageProcessor.prototype.qrCallback = function (data) {
        Application.current.qrCallback(data, function (error) { });
    };
    return Html5ImageProcessor;
})();
//# sourceMappingURL=Html5ImageProcessor.js.map