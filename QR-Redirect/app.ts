'use strict';

declare var qrcode: any;

class Application {
    private form: HTMLFormElement;
    private video: HTMLVideoElement;
    private flashVideoEmbed: HTMLEmbedElement;
    private cameraInput: HTMLInputElement;
    private errorField: HTMLElement;

    private settings = {
        siteUrl: 'https://github.com/Marvin-Brouwer/QR-Redirect'
    }

    constructor() {
        // Start by reading query
        var loadQuery = this.getParameterByName('qr');
        if (!!loadQuery) this.parseUrl(loadQuery);

        // Define elements
        this.form = <HTMLFormElement>(document.querySelector('form#mainForm'));
        this.video = <HTMLVideoElement>(document.querySelector('video#mainVideo'));
        this.flashVideoEmbed = <HTMLEmbedElement>(document.querySelector('embed#flashVideoEmbed'));
        this.cameraInput = <HTMLInputElement>(document.querySelector('form#mainForm input[name=file]'));
        this.errorField = <HTMLInputElement>(document.querySelector('form#mainForm label div.error'));

        // Initialize
        //if (this.hasGetUserMedia()) 
        //    this.initializeVideo();
        //else 
        if (true)
            this.initializeFlash();
        else
            this.initializeUpload();

        // todo: create functionality for live webcam using: http://www.webqr.com/ like functionality that actualy works
    }

    private initializeUpload() {
        this.cameraInput.onfocus = (ev: Event) => document.body.focus();

        this.form.onsubmit = (ev: Event) => {
            ev.cancelBubble = true;
            ev.preventDefault();
            return ev;
        };
        this.cameraInput.onclick = (ev: Event) => this.clearErrors();
        this.cameraInput.onchange = (ev: Event) => {
            this.clearErrors();
            this.setTitle('Reading...');
            ev.cancelBubble = true;
            ev.preventDefault();
            if (!this.cameraInput.value) {
                this.reset();
                return ev;
            }
            this.readQR();
            return ev;
        };
        qrcode.callback = (data: string) => {
            console.log(`Raw QR-Data: ${data}`);
            if (data.indexOf(this.settings.siteUrl) !== 0) {
                this.setError('Invalid QR image');
                window.requestAnimationFrame(() => this.reset.apply(this));
                return;
            }
            var jsonString = data.split('?qr=')[1];
            this.parseUrl(jsonString);
            this.reset();
            return;
        }
        this.reset();
    }

    private clearErrors() {
        this.errorField.innerText = '';
    }
    private setError(text: string) {
        this.errorField.innerText = text;
    }

    private setTitle(title: string) {
        document.title = `QR-Redirect - ${title}`;
    }

    private reset() {
        this.cameraInput.value = null;
        this.setTitle('Select QR-Code');
        document.body.focus();
    }

    private readQR() {
        var file = this.cameraInput.files[0];
        if (!file) return;

        var reader = new FileReader();
        reader.onloadend = () => {
            this.setTitle('Parsing...');
            console.log(`Created DataUrl: ${reader.result}`);
            qrcode.decode(reader.result);
        }
        reader.readAsDataURL(file);
    }

    public parseUrl(jsonString: string) {
        try {
            this.setTitle('');
            var jsonData = JSON.parse(jsonString.replace(new RegExp('\'', 'g'), '"'));
            if (!jsonData || !jsonData.url) {
                this.setError('Invalid data');
                return;
            }
            var url = `http${!!jsonData.secure ? 's' : ''}://${jsonData.url}`;
            console.log(url);
            alert(url);
            // todo: ajax preload
            //window.location.href = url;
        }
        finally {
            return;
        }
    }

    private getParameterByName(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
            results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    private hasGetUserMedia() {
        return !!((<any>navigator).getUserMedia || (<any>navigator).webkitGetUserMedia ||
            (<any>navigator).mozGetUserMedia || (<any>navigator).msGetUserMedia);
    }

    private initializeVideo() {
        var animationFrame = null;
        var doVideoParse = false;
        var thecanvas = document.createElement('canvas');
        var parseVideo = () => {
            if (!doVideoParse) {
                window.cancelAnimationFrame(animationFrame);
                animationFrame = null;
                return;
            }
            console.log('video parse');
            var context = thecanvas.getContext('2d');
            // draw the video contents into the canvas x, y, width, height
            context.drawImage(this.video, 0, 0, thecanvas.width, thecanvas.height);

            // get the image data from the canvas object
            var dataUrl = thecanvas.toDataURL();
            qrcode.decode(dataUrl);
            window.requestAnimationFrame(parseVideo);
        };
        (<any>navigator).getUserMedia = (<any>navigator).getUserMedia ||
            (<any>navigator).webkitGetUserMedia ||
            (<any>navigator).mozGetUserMedia ||
            (<any>navigator).msGetUserMedia;
        if ((<any>navigator).getUserMedia) {
            (<any>navigator).getUserMedia({ audio: false, video: true }, stream => {
                doVideoParse = true;
                console.log('video parse true');
                this.video.src = window.URL.createObjectURL(stream);
                if (doVideoParse) animationFrame = window.requestAnimationFrame(parseVideo);
            }, e => {
                this.form.style.display = 'block';
                this.video.style.display = 'none';
                doVideoParse = false;
                console.log('video parse false');
                if (animationFrame != null) {
                    window.cancelAnimationFrame(animationFrame);
                    animationFrame = null;
                }
            });

            this.form.style.display = 'none';
            this.video.style.display = 'block';
        } else {
            //video.src = 'fallback.webm'; // fallback.
            this.form.style.display = 'block';
            this.video.style.display = 'none';
        }

        if (doVideoParse) animationFrame = window.requestAnimationFrame(parseVideo);

    }

    private initializeFlash() {
        var takePicture = () => {

            try {
                (<any>this.flashVideoEmbed).ccCapture();
            } catch (e) {
                console.log(e);
            }
            window.requestAnimationFrame(takePicture);
        };
        (<any>this.flashVideoEmbed).onactivate = () => {
            try {
                // why doesn't the flash movie load?
                (<any>this.flashVideoEmbed).ccInit();
                //qrcode.decode();
                // todo: http://help.adobe.com/en_US/as3/dev/WSfffb011ac560372f3fa68e8912e3ab6b8cb-8000.html#WS5b3ccc516d4fbf351e63e3d118a9b90204-7d37
                // https://github.com/taboca/CamCanvas-API-/tree/300da2f250c76361a81a27dd35f503185bf338fe
                // Create custom implementation of the swf that detects wether or not the camera is blocked and polish up the external calls a bit.
            } catch (e) {
                console.log(e);
            }
        }
        window.requestAnimationFrame(takePicture);
    }
}

window.onload = () => new Application();

// Test for ccCapture
// ReSharper disable once TsNotResolved
window.passLine = function (stringPixels) { 
    //a = (intVal >> 24) & 0xff;

    var coll = stringPixels.split("-");

    console.log(coll[0]);
} 