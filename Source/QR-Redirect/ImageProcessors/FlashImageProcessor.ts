'use strict';

declare var swfobject :any;

class FlashImageProcessor implements IImageProcessor {
    public nextFallback(): void { }
    public declinedFallback(): void { }
    private flashVideo: HTMLObjectElement;
    private flashVideoEmbed: HTMLEmbedElement;

    // This is necessary for the ExternalModule flash implementation
    private static currentFlashImageProcessor: FlashImageProcessor;
    public static flashDeclined() {
        this.currentFlashImageProcessor.declinedFallback();
    }
    public static cameraNotSupported() {
        this.currentFlashImageProcessor.nextFallback();
    }
    public static renderVideo(data:string) {
        //console.log(data);
        qrcode.decode(data);
    }

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

    private buildHtml() {
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
        swfobject.embedSWF('HaxeCam.swf', document.querySelector('#appBody'), '100%', '100%', 20,null,flashvars,params,attributes);
        this.flashVideo = <HTMLObjectElement>document.querySelector('object');
    }

    private initializeFlash() {
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

    public qrCallback(data: string): void {
        Application.current.qrCallback(data, (error) => { });
    }
}