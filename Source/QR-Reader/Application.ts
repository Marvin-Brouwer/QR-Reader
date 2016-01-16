declare var qrcode: any;

class Application extends ioc.ApplicationContext {
    private imageProcessorFacade: ImageProcessorFacade;
    private dataProcessorFacade: DataProcessorFacade;

    constructor() {
        super('QR-Reader');
    }

    public register(container: ioc.Container): void {
        // Register Instances
        container.register<PopupManager>(PopupManager)
            .setLifetimeScope(ioc.LifetimeScope.SingleInstance);
        container.register<TabManager>(TabManager)
            .setLifetimeScope(ioc.LifetimeScope.SingleInstance);
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

        // Check consent
        UserMediaHelper.getUserMedia({ video: true, audio: false });
        
        // Let agree to terms
        let popupManager = <PopupManager>container.resolve(PopupManager);
        let tabManager = <TabManager>container.resolve(TabManager);
        let popupContent = <any>document.querySelector('.popupContent');
        let helpButton = <any>document.querySelector('.help');
        let checkButtonState = () => {
            if (popupContent.scrollHeight <= popupContent.clientHeight
                || popupContent.scrollTop === (popupContent.scrollHeight - popupContent.offsetHeight)) {
                popupManager.setButtonState(true);
                window.onresize = null;
                popupContent.onscroll = null;
            }
        };
        window.onresize = checkButtonState;
        popupContent.onscroll = checkButtonState;
        tabManager.setActive('toa');
        popupManager.show(false, false, () => {
            // Initiate application
            this.imageProcessorFacade.initiate();
            helpButton.onclick = () => {
                tabManager.setActive('about');
                popupManager.show();
            };
            popupManager.hide();
        });
        checkButtonState();
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