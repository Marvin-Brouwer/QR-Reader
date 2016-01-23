declare var swfobject: any;

class FlashImageProcessor implements IImageProcessor {
    // This is necessary for the ExternalModule flash implementation
    private static currentFlashImageProcessor: FlashImageProcessor;

    private flashVideo: HTMLObjectElement;

    public static flashDeclined(): void {
        this.currentFlashImageProcessor.declinedFallback();
    }
    public static cameraNotSupported(): void {
        this.currentFlashImageProcessor.nextFallback();
    }
    public static renderVideo(data: string): void {
        qrcode.decode(data);
    }

    public nextFallback(): void { }
    public declinedFallback(): void { }

    public initiate(): void {
        if (swfobject.getFlashPlayerVersion().major === 0) {
            this.nextFallback();
            return;
        }
        FlashImageProcessor.currentFlashImageProcessor = this;
        this.buildHtml();
        this.initializeFlash();
        qrcode.callback = this.qrCallback.bind(this);
    }

    public qrCallback(data: string): void {
        (<Application>ioc.ApplicationContext.applicationContext).qrCallback(data, (error: string) => { });
    }

    private buildHtml(): void {
        let attributes = {
            id: 'flashVideo',
            wmode: 'transparent'
        };
        let flashvars = {
            deniedMethod: 'FlashImageProcessor.flashDeclined',
            exportDataMethod: 'FlashImageProcessor.renderVideo',
            notSupportedMethod: 'FlashImageProcessor.cameraNotSupported'
        };
        let params = {
            allowScriptAccess: 'always',
            allowFullscreen: 'true',
            bgcolor: '#000',
            menu: 'false',
            scale: 'noScale',
            movie: 'Content/HaxeCam.swf',
            quality: 'high'
        };
        swfobject.embedSWF(params.movie, document.querySelector('#appBody'), '100%', '100%', 20, null, flashvars, params, attributes);
        this.flashVideo = <HTMLObjectElement>document.querySelector('object');
    }

    private initializeFlash(): void {
        (<any>this.flashVideo).onload = () => {
            this.flashVideo.focus();
            this.flashVideo.click();
        };
        window.onfocus = document.onfocus = (<HTMLBodyElement>document.querySelector('body')).onfocus = () => {
            this.flashVideo.focus();
            this.flashVideo.click();
        };
        this.flashVideo.style.visibility = 'visible';

    }
}