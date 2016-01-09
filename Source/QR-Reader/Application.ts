﻿'use strict';

declare var qrcode: any;

class Application {
    public static current: Application;

    private imageProcessorFacade: ImageProcessorFacade;
    private dataProcessorFacade: DataProcessorFacade;

    constructor() {
        Application.current = this;

        // Start processors 
        this.imageProcessorFacade = new ImageProcessorFacade(new UploadImageProcessor())
            .addImageProcessor(new Html5ImageProcessor())
            .addImageProcessor(new FlashImageProcessor())
        this.dataProcessorFacade = new DataProcessorFacade()
            .addDataProcessor(new TextDataProcessor())
            .addDataProcessor(new UrlDataProcessor())
            .addDataProcessor(new VCardDataProcessor())
            .addDataProcessor(new SMSDataProcessor())
            .addDataProcessor(new PhoneCallDataProcessor());
        
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
}

window.onload = () => new Application();