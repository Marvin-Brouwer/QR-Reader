'use strict';

declare var qrcode: any;

class Application {
    public static current:Application;

    public static settings = {
        siteUrl: 'https://github.com/Marvin-Brouwer/QR-Redirect'
    }

    constructor() {
        Application.current = this;
        // Start by reading query
        let loadQuery = this.getParameterByName('qr');
        if (!!loadQuery) this.parseUrl(loadQuery);

        // Start processors
        new ImageProcessorFactory(new UploadImageProcessor())
            //.addImageProcessor(new Html5ImageProcessor())
            .addImageProcessor(new FlashImageProcessor())
            .initiate();
        
        this.initialize();
    }

    private initialize() {
       
        this.reset();
    }
    public setTitle(title: string) {
        document.title = `QR-Redirect - ${title}`;
    }

    public reset() {
        this.setTitle('Select QR-Code');
    }

    public qrCallback(data: string, errorFunc: (error:string) => void) {
        console.log(`Raw QR-Data: ${data}`);
        if (data.indexOf(Application.settings.siteUrl) !== 0) {
            errorFunc('Invalid image');
            window.requestAnimationFrame(() => this.reset.apply(this));
            return;
        }
        let jsonString = data.split('?qr=')[1];
        let url = this.parseUrl(jsonString);
        if (url == null) {
            errorFunc('Invalid Data');
            this.reset();
        } else {
            alert(url);
            //window.location.href = url;
        }
        return;
    }

    public parseUrl(jsonString: string): string {
        try {
            this.setTitle('');
            let jsonData = JSON.parse(jsonString.replace(new RegExp('\'', 'g'), '"'));
            if (!jsonData || !jsonData.url)
                return null;
            let url = `http${!!jsonData.secure ? 's' : ''}://${jsonData.url}`;
            console.log(url);
            return url;
        }
        catch (e) {
            return null;
        }
    }

    private getParameterByName(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
            results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
}

window.onload = () => new Application();