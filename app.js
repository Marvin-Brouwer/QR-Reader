'use strict';
class Application {
    constructor() {
        this.settings = {
            siteUrl: 'https://github.com/Marvin-Brouwer/QR-Redirect'
        };
        // Start by reading query
        var loadQuery = this.getParameterByName('qr');
        if (!!loadQuery)
            this.parseUrl(loadQuery);
        // Define elements
        this.form = (document.querySelector('form#mainForm'));
        this.video = (document.querySelector('video#mainVideo'));
        this.cameraInput = (document.querySelector('form#mainForm input[name=file]'));
        this.errorField = (document.querySelector('form#mainForm label div.error'));
        // Initialize
        if (this.hasGetUserMedia())
            this.initializeVideo();
        this.initializeUpload();
        // todo: create functionality for live webcam using: http://www.webqr.com/ like functionality that actualy works
    }
    initializeUpload() {
        this.cameraInput.onfocus = (ev) => document.body.focus();
        this.form.onsubmit = (ev) => {
            ev.cancelBubble = true;
            ev.preventDefault();
            return ev;
        };
        this.cameraInput.onclick = (ev) => this.clearErrors();
        this.cameraInput.onchange = (ev) => {
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
        qrcode.callback = (data) => {
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
        };
        this.reset();
    }
    clearErrors() {
        this.errorField.innerText = '';
    }
    setError(text) {
        this.errorField.innerText = text;
    }
    setTitle(title) {
        document.title = `QR-Redirect - ${title}`;
    }
    reset() {
        this.cameraInput.value = null;
        this.setTitle('Select QR-Code');
        document.body.focus();
    }
    readQR() {
        var file = this.cameraInput.files[0];
        if (!file)
            return;
        var reader = new FileReader();
        reader.onloadend = () => {
            this.setTitle('Parsing...');
            console.log(`Created DataUrl: ${reader.result}`);
            qrcode.decode(reader.result);
        };
        reader.readAsDataURL(file);
    }
    parseUrl(jsonString) {
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
        return;
    }
    getParameterByName(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'), results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    hasGetUserMedia() {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
    }
    initializeVideo() {
        var animationFrame = null;
        var doVideoParse = false;
        var thecanvas = document.createElement('canvas');
        var parseVideo = () => {
            if (!doVideoParse) {
                window.cancelAnimationFrame(animationFrame);
                animationFrame = null;
                return;
            }
            var context = thecanvas.getContext('2d');
            // draw the video contents into the canvas x, y, width, height
            context.drawImage(this.video, 0, 0, thecanvas.width, thecanvas.height);
            // get the image data from the canvas object
            var dataUrl = thecanvas.toDataURL();
            qrcode.decode(dataUrl);
            window.requestAnimationFrame(parseVideo);
        };
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({ audio: false, video: true }, stream => {
                doVideoParse = true;
                this.video.src = window.URL.createObjectURL(stream);
            }, e => {
                this.form.style.display = 'block';
                this.video.style.display = 'none';
                doVideoParse = false;
                if (animationFrame != null) {
                    window.cancelAnimationFrame(animationFrame);
                    animationFrame = null;
                }
            });
            this.form.style.display = 'none';
            this.video.style.display = 'block';
        }
        else {
            //video.src = 'fallback.webm'; // fallback.
            this.form.style.display = 'block';
            this.video.style.display = 'none';
        }
        if (doVideoParse)
            animationFrame = window.requestAnimationFrame(parseVideo);
    }
}
window.onload = () => new Application();
//# sourceMappingURL=app.js.map