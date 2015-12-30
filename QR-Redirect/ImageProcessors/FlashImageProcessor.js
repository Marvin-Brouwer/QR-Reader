var FlashImageProcessor = (function () {
    function FlashImageProcessor() {
    }
    FlashImageProcessor.prototype.nextFallback = function () { };
    FlashImageProcessor.prototype.declinedFallback = function () { };
    FlashImageProcessor.flashAccepted = function () {
        //this.currentFlashImageProcessor.declinedFallback();
    };
    FlashImageProcessor.flashDeclined = function () {
        this.currentFlashImageProcessor.declinedFallback();
    };
    FlashImageProcessor.prototype.initiate = function () {
        FlashImageProcessor.currentFlashImageProcessor = this;
        this.buildHtml();
        this.initializeFlash();
        qrcode.callback = this.qrCallback.bind(this);
    };
    FlashImageProcessor.prototype.buildHtml = function () {
        swfobject.embedSWF('lib/camcanvas.swf', document.body, '100%', '100%', 10);
        this.flashVideo = document.querySelector('object');
        this.flashVideo.setAttribute('wmode', 'transparent');
        var movieParam = document.createElement('param');
        movieParam.name = 'movie';
        movieParam.value = 'lib/camcanvas.swf';
        var qualityParam = document.createElement('param');
        qualityParam.name = 'quality';
        qualityParam.value = 'high';
        var allowScriptAccessParam = document.createElement('param');
        allowScriptAccessParam.name = 'allowScriptAccess';
        allowScriptAccessParam.value = 'always';
        this.flashVideo.appendChild(movieParam);
        this.flashVideo.appendChild(qualityParam);
        this.flashVideo.appendChild(allowScriptAccessParam);
    };
    FlashImageProcessor.prototype.initializeFlash = function () {
        var _this = this;
        var takePicture = function () {
            try {
                _this.flashVideo.ccCapture();
            }
            catch (e) {
                console.log(e);
            }
        };
        this.flashVideo.onload = function () {
            _this.flashVideo.focus();
            _this.flashVideo.click();
        };
        this.flashVideo.onactivate = function () {
            try {
                // why doesn't the flash movie load?
                _this.flashVideo.ccInit();
                //qrcode.decode();
                // todo: http://help.adobe.com/en_US/as3/dev/WSfffb011ac560372f3fa68e8912e3ab6b8cb-8000.html#WS5b3ccc516d4fbf351e63e3d118a9b90204-7d37
                // https://github.com/taboca/CamCanvas-API-/tree/300da2f250c76361a81a27dd35f503185bf338fe
                // Create custom implementation of the swf that detects wether or not the camera is blocked and polish up the external calls a bit.
                window.setInterval(takePicture, 1000);
            }
            catch (e) {
                console.log(e);
            }
        };
        this.flashVideo.style.visibility = 'visible';
    };
    FlashImageProcessor.prototype.qrCallback = function (data) {
        Application.current.qrCallback(data, function (error) { });
    };
    return FlashImageProcessor;
})();
//# sourceMappingURL=FlashImageProcessor.js.map