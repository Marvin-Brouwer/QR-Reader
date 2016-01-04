'use strict';
class Application {
    constructor() {
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
    initialize() {
        this.reset();
    }
    setTitle(title) {
        document.title = `QR-Reader - ${title}`;
    }
    reset() {
        this.setTitle('Select QR-Code');
    }
    qrCallback(data, errorFunc) {
        try {
            this.dataProcessorFactory.calculate(data);
        }
        catch (e) {
            errorFunc(e.message);
        }
        return;
    }
}
window.onload = () => new Application();
//# sourceMappingURL=Application.js.map