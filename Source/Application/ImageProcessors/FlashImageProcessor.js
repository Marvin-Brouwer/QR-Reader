'use strict';
class FlashImageProcessor {
    nextFallback() { }
    declinedFallback() { }
    static flashDeclined() {
        this.currentFlashImageProcessor.declinedFallback();
    }
    static cameraNotSupported() {
        this.currentFlashImageProcessor.nextFallback();
    }
    static renderVideo(data) {
        //console.log(data);
        qrcode.decode(data);
    }
    initiate() {
        if (swfobject.getFlashPlayerVersion().major === 0) {
            this.nextFallback();
            return;
        }
        FlashImageProcessor.currentFlashImageProcessor = this;
        this.buildHtml();
        this.initializeFlash();
        qrcode.callback = this.qrCallback.bind(this);
    }
    buildHtml() {
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
            movie: 'Content/HaxeCam.swf',
            quality: 'high'
        };
        var attributes = {
            id: 'flashVideo',
            wmode: 'transparent'
        };
        swfobject.embedSWF(params.movie, document.querySelector('#appBody'), '100%', '100%', 20, null, flashvars, params, attributes);
        this.flashVideo = document.querySelector('object');
    }
    initializeFlash() {
        this.flashVideo.onload = () => {
            this.flashVideo.focus();
            this.flashVideo.click();
        };
        window.onfocus = document.onfocus = document.querySelector('body').onfocus = () => {
            this.flashVideo.focus();
            this.flashVideo.click();
        };
        this.flashVideo.style.visibility = 'visible';
    }
    qrCallback(data) {
        Application.current.qrCallback(data, (error) => { });
    }
}
//# sourceMappingURL=FlashImageProcessor.js.map