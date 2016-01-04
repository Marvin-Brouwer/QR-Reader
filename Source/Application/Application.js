'use strict';
var Application = (function () {
    function Application() {
        this.setTitle('Loading...');
        Application.current = this;
        // Start processors 
        // I realize thei're not Factories but I don't have a better word for this
        this.imageProcessorFactory = new ImageProcessorFactory(new UploadImageProcessor())
            .addImageProcessor(new Html5ImageProcessor())
            .addImageProcessor(new FlashImageProcessor())
            .initiate();
        this.dataProcessorFactory = new DataProcessorFactory()
            .addDataProcessor(new TextDataProcessor())
            .addDataProcessor(new UrlDataProcessor())
            .addDataProcessor(new VCardDataProcessor());
        this.initialize();
    }
    Application.prototype.initialize = function () {
        this.reset();
    };
    Application.prototype.setTitle = function (title) {
        document.title = "QR-Reader - " + title;
    };
    Application.prototype.reset = function () {
        this.setTitle('Select QR-Code');
    };
    Application.prototype.qrCallback = function (data, errorFunc) {
        try {
            this.dataProcessorFactory.calculate(data);
        }
        catch (e) {
            errorFunc(e.message);
        }
        return;
    };
    return Application;
})();
window.onload = function () { return new Application(); };
//# sourceMappingURL=Application.js.map