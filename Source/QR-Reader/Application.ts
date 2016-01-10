'use strict';

declare var qrcode: any;

class Application extends ioc.ApplicationContext {
    private imageProcessorFacade: ImageProcessorFacade;
    private dataProcessorFacade: DataProcessorFacade;

    constructor() {
        super('QR-Reader');
    }

    public register(container: ioc.Container): void {
        // Register Instances
        container.register<ImageProcessorFacade>(ImageProcessorFacade)
            .setLifetimeScope(ioc.LifetimeScope.SingleInstance)
            .setResolveFunc(instance => instance
                .addImageProcessor(new Html5ImageProcessor())
                .addImageProcessor(new FlashImageProcessor())
                .setDefaultImageProcessor(new UploadImageProcessor()));
        container.register<DataProcessorFacade>(DataProcessorFacade)
            .setLifetimeScope(ioc.LifetimeScope.SingleInstance)
            .setResolveFunc(instance => instance
                .addDataProcessor(new TextDataProcessor())
                .addDataProcessor(new UrlDataProcessor())
                .addDataProcessor(new VCardDataProcessor())
                .addDataProcessor(new SMSDataProcessor())
                .addDataProcessor(new PhoneCallDataProcessor())
                .addDataProcessor(new GeoLocationDataProcessor())
                .addDataProcessor(new VEventDataProcessor())
                .addDataProcessor(new MATMsgDataProcessor())
                .addDataProcessor(new EmailDataProcessor())
                .addDataProcessor(new NetworkDataProcessor()));

        this.initiate(container);
    }

    public initiate(container: ioc.Container): void {
        this.imageProcessorFacade = container.resolve(ImageProcessorFacade);
        this.dataProcessorFacade = container.resolve(DataProcessorFacade);

        // Initiate
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

window.onload = () => {
    if (window.location.protocol !== 'https:')
        UrlHelper.redirect(window.location.href.replace(/^(http(s)?:\/\/)(\s)?/i, 'https://'));
    return new Application();
};