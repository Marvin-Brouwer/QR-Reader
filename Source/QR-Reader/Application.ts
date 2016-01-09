'use strict';

declare var qrcode: any;

class Application {
    public static current: Application;

    private imageProcessorFacade: ImageProcessorFacade;
    private dataProcessorFacade: DataProcessorFacade;

    constructor() {
        this.forceHttps();
        Application.current = this;

        // Start processors 
        this.imageProcessorFacade = new ImageProcessorFacade(new UploadImageProcessor())
            .addImageProcessor(new Html5ImageProcessor())
            .addImageProcessor(new FlashImageProcessor());
        this.dataProcessorFacade = new DataProcessorFacade()
            .addDataProcessor(new TextDataProcessor())
            .addDataProcessor(new UrlDataProcessor())
            .addDataProcessor(new VCardDataProcessor())
            .addDataProcessor(new SMSDataProcessor())
            .addDataProcessor(new PhoneCallDataProcessor())
            .addDataProcessor(new GeoLocationDataProcessor())
            .addDataProcessor(new VEventDataProcessor());
        
        this.initialize();
    }

    private initialize() {
        this.imageProcessorFacade.initiate();
    }

    public qrCallback(data: string, errorFunc: (error: string) => void) {
        try {
            this.dataProcessorFacade.calculate(data);
        } catch (e) {
            errorFunc(e.message);
        }
        return;
    }

    private forceHttps() {
        if (window.location.protocol !== 'https:')
            UrlHelper.redirect(window.location.href.replace(/^(http(s)?:\/\/)(\s)?/i,'https://'));
    }
}

window.onload = () => new Application();