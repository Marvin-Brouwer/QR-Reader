'use strict';
var Application = (function () {
    function Application() {
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
        this.flashVideo = (document.querySelector('#flashVideoEmbed'));
        this.cameraInput = (document.querySelector('form#mainForm input[name=file]'));
        this.errorField = (document.querySelector('form#mainForm label div.error'));
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
    Application.prototype.initializeUpload = function () {
        var _this = this;
        this.cameraInput.onfocus = function (ev) { return document.body.focus(); };
        this.form.onsubmit = function (ev) {
            ev.cancelBubble = true;
            ev.preventDefault();
            return ev;
        };
        this.cameraInput.onclick = function (ev) { return _this.clearErrors(); };
        this.cameraInput.onchange = function (ev) {
            _this.clearErrors();
            _this.setTitle('Reading...');
            ev.cancelBubble = true;
            ev.preventDefault();
            if (!_this.cameraInput.value) {
                _this.reset();
                return ev;
            }
            _this.readQR();
            return ev;
        };
        qrcode.callback = function (data) {
            console.log("Raw QR-Data: " + data);
            if (data.indexOf(_this.settings.siteUrl) !== 0) {
                _this.setError('Invalid QR image');
                window.requestAnimationFrame(function () { return _this.reset.apply(_this); });
                return;
            }
            var jsonString = data.split('?qr=')[1];
            _this.parseUrl(jsonString);
            _this.reset();
            return;
        };
        this.reset();
    };
    Application.prototype.clearErrors = function () {
        this.errorField.innerText = '';
    };
    Application.prototype.setError = function (text) {
        this.errorField.innerText = text;
    };
    Application.prototype.setTitle = function (title) {
        document.title = "QR-Redirect - " + title;
    };
    Application.prototype.reset = function () {
        this.cameraInput.value = null;
        this.setTitle('Select QR-Code');
        document.body.focus();
    };
    Application.prototype.readQR = function () {
        var _this = this;
        var file = this.cameraInput.files[0];
        if (!file)
            return;
        var reader = new FileReader();
        reader.onloadend = function () {
            _this.setTitle('Parsing...');
            console.log("Created DataUrl: " + reader.result);
            qrcode.decode(reader.result);
        };
        reader.readAsDataURL(file);
    };
    Application.prototype.parseUrl = function (jsonString) {
        try {
            this.setTitle('');
            var jsonData = JSON.parse(jsonString.replace(new RegExp('\'', 'g'), '"'));
            if (!jsonData || !jsonData.url) {
                this.setError('Invalid data');
                return;
            }
            var url = "http" + (!!jsonData.secure ? 's' : '') + "://" + jsonData.url;
            console.log(url);
            alert(url);
        }
        finally {
            return;
        }
    };
    Application.prototype.getParameterByName = function (name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'), results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    Application.prototype.hasGetUserMedia = function () {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
    };
    Application.prototype.initializeVideo = function () {
        var _this = this;
        var animationFrame = null;
        var doVideoParse = false;
        var thecanvas = document.createElement('canvas');
        var parseVideo = function () {
            if (!doVideoParse) {
                window.cancelAnimationFrame(animationFrame);
                animationFrame = null;
                return;
            }
            console.log('video parse');
            var context = thecanvas.getContext('2d');
            // draw the video contents into the canvas x, y, width, height
            context.drawImage(_this.video, 0, 0, thecanvas.width, thecanvas.height);
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
            navigator.getUserMedia({ audio: false, video: true }, function (stream) {
                doVideoParse = true;
                console.log('video parse true');
                _this.video.src = window.URL.createObjectURL(stream);
                if (doVideoParse)
                    animationFrame = window.requestAnimationFrame(parseVideo);
            }, function (e) {
                _this.form.style.display = 'block';
                _this.video.style.display = 'none';
                doVideoParse = false;
                console.log('video parse false');
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
    };
    Application.prototype.initializeFlash = function () {
        var embed = document.querySelector('embed#flashVideoEmbed');
        embed.addDomLoadEvent(function () {
            try {
                embed.ccInit();
                embed.ccCapture();
                qrcode.decode();
            }
            catch (e) {
                console.log(e);
            }
        });
    };
    return Application;
})();
window.onload = function () { return new Application(); };
// ReSharper disable once TsNotResolved
window.passLine = function (stringPixels) {
    //a = (intVal >> 24) & 0xff;
    var coll = stringPixels.split("-");
    alert(stringPixels);
};
//# sourceMappingURL=app.js.map