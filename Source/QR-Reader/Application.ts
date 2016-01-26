declare var qrcode: any;

class Application extends ioc.ApplicationContext {
    public pauseCapture: boolean = false;

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
        container.register<ActionManager>(ActionManager)
            .setLifetimeScope(ioc.LifetimeScope.SingleInstance);
        container.register<ImageProcessorFacade>(ImageProcessorFacade)
            .setLifetimeScope(ioc.LifetimeScope.SingleInstance)
            .setResolveFunc((instance: ImageProcessorFacade) => instance
                .addImageProcessor(new Html5ImageProcessor())
                .addImageProcessor(new FlashImageProcessor())
                .setDefaultImageProcessor(new UploadImageProcessor()));
        container.register<DataProcessorFacade>(DataProcessorFacade)
            .setLifetimeScope(ioc.LifetimeScope.SingleInstance)
            .setResolveFunc((instance: DataProcessorFacade) => instance
                .addDataProcessor(new TextDataProcessor())
                .addDataProcessor(new IllustrationDataProcessor())
                .addDataProcessor(new PDFDataProcessor())
                .addDataProcessor(new RawFileDataProcessor())
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
        this.imageProcessorFacade = container.resolve<ImageProcessorFacade>(ImageProcessorFacade);
        this.dataProcessorFacade = container.resolve<DataProcessorFacade>(DataProcessorFacade);
        // Check consent
        UserMediaHelper.checkPermissions();
        // Let agree to terms
        let popupManager = <PopupManager>container.resolve(PopupManager);
        let tabManager = <TabManager>container.resolve(TabManager);
        let popupContent = <HTMLDivElement>document.querySelector('.popupContent');
        let hasAgreed = (CookieHelper.getCookie(Constants.agreedToTOA) || String()) === 'true';
        if (!hasAgreed) {
            this.setTOAPopup(popupManager, tabManager, popupContent);
        } else {
            popupManager.setButtonState(true);
            this.startApp(tabManager, popupManager);
        }
    }

    public qrCallback(data: string, errorFunc: (error: string) => void): void {
        let application = <Application>Application.applicationContext;
        if (application.pauseCapture) return;
        try {
            this.dataProcessorFacade.calculate(data);
        } catch (e) {
            errorFunc(e.message);
        }
        return;
    }

    private setTOAPopup(popupManager: PopupManager, tabManager: TabManager, popupContent: HTMLDivElement): void {
        let checkButtonState = () => {
            if (popupContent.scrollHeight <= popupContent.clientHeight
                || popupContent.scrollTop >= (popupContent.scrollHeight - popupContent.offsetHeight) - (popupContent.scrollHeight / 100)) {
                popupManager.setButtonState(true);
                window.onresize = null;
                popupContent.onscroll = null;
            }
        };
        window.onresize = checkButtonState;
        popupContent.onscroll = checkButtonState;
        tabManager.setActive('toa');
        popupManager.show(false, false, () => {
            let today = new Date();
            today.setFullYear(today.getFullYear() + 128);
            CookieHelper.setCookie(Constants.agreedToTOA, true, today);
            this.startApp(tabManager, popupManager);
            popupManager.hide();
        });
        checkButtonState();
    }

    private startApp(tabManager: TabManager, popupManager: PopupManager): void {
        let helpButton = <any>document.querySelector('.help');
        // Initiate application
        this.imageProcessorFacade.initiate();
        helpButton.onclick = () => {
            tabManager.setActive('about');
            popupManager.show();
        };
    }

}

window.onload = () => {
    if (window.location.protocol !== 'https:')
        UrlHelper.redirect(window.location.href.replace(/^(http(s)?:\/\/)(\s)?/i, 'https://'));
    return new Application();
};