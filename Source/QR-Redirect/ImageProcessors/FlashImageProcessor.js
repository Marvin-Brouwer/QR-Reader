'use strict';
var FlashImageProcessor = (function () {
    function FlashImageProcessor() {
    }
    FlashImageProcessor.prototype.nextFallback = function () { };
    FlashImageProcessor.prototype.declinedFallback = function () { };
    FlashImageProcessor.flashDeclined = function () {
        this.currentFlashImageProcessor.declinedFallback();
    };
    FlashImageProcessor.cameraNotSupported = function () {
        this.currentFlashImageProcessor.nextFallback();
    };
    FlashImageProcessor.renderVideo = function (data) {
        //console.log(data);
        qrcode.decode(data);
    };
    FlashImageProcessor.prototype.initiate = function () {
        FlashImageProcessor.currentFlashImageProcessor = this;
        this.buildHtml();
        this.initializeFlash();
        qrcode.callback = this.qrCallback.bind(this);
    };
    FlashImageProcessor.prototype.buildHtml = function () {
        var flashvars = {
            deniedMethod: 'FlashImageProcessor.flashDeclined',
            exportDataMethod: 'FlashImageProcessor.renderVideo',
            notSupportedMethod: 'FlashImageProcessor.cameraNotSupported'
        };
        var params = {
            //menu: 'false',
            scale: 'noScale',
            allowFullscreen: 'true',
            allowScriptAccess: 'always',
            bgcolor: '#000',
            movie: 'HaxeCam.swf',
            quality: 'high'
        };
        var attributes = {
            id: 'flashVideo',
            wmode: 'transparent'
        };
        swfobject.embedSWF('HaxeCam.swf', document.querySelector('#appBody'), '100%', '100%', 20, null, flashvars, params, attributes);
        this.flashVideo = document.querySelector('object');
    };
    FlashImageProcessor.prototype.initializeFlash = function () {
        var _this = this;
        this.flashVideo.onload = function () {
            _this.flashVideo.focus();
            _this.flashVideo.click();
        };
        window.onfocus = document.onfocus = document.querySelector('body').onfocus = function () {
            _this.flashVideo.focus();
            _this.flashVideo.click();
        };
        this.flashVideo.style.visibility = 'visible';
    };
    FlashImageProcessor.prototype.qrCallback = function (data) {
        Application.current.qrCallback(data, function (error) { });
    };
    return FlashImageProcessor;
})();
//# sourceMappingURL=FlashImageProcessor.js.map