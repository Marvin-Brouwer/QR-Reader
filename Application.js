'use strict';
var Application = (function () {
    function Application() {
        Application.current = this;
        // Start by reading query
        var loadQuery = this.getParameterByName('qr');
        if (!!loadQuery)
            this.parseUrl(loadQuery);
        // Start processors
        new ImageProcessorFactory(new UploadImageProcessor())
            .addImageProcessor(new Html5ImageProcessor())
            .addImageProcessor(new FlashImageProcessor())
            .initiate();
        this.initialize();
    }
    Application.prototype.initialize = function () {
        this.reset();
    };
    Application.prototype.setTitle = function (title) {
        document.title = "QR-Redirect - " + title;
    };
    Application.prototype.reset = function () {
        this.setTitle('Select QR-Code');
    };
    Application.prototype.qrCallback = function (data, errorFunc) {
        var _this = this;
        console.log("Raw QR-Data: " + data);
        if (data.indexOf(Application.settings.siteUrl) !== 0) {
            errorFunc('Invalid image');
            window.requestAnimationFrame(function () { return _this.reset.apply(_this); });
            return;
        }
        var jsonString = data.split('?qr=')[1];
        var url = this.parseUrl(jsonString);
        if (url == null) {
            errorFunc('Invalid Data');
            this.reset();
        }
        else {
            alert(url);
        }
        return;
    };
    Application.prototype.parseUrl = function (jsonString) {
        try {
            this.setTitle('');
            var jsonData = JSON.parse(jsonString.replace(new RegExp('\'', 'g'), '"'));
            if (!jsonData || !jsonData.url)
                return null;
            var url = "http" + (!!jsonData.secure ? 's' : '') + "://" + jsonData.url;
            console.log(url);
            return url;
        }
        catch (e) {
            return null;
        }
    };
    Application.prototype.getParameterByName = function (name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'), results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    Application.settings = {
        siteUrl: 'https://github.com/Marvin-Brouwer/QR-Redirect'
    };
    return Application;
})();
window.onload = function () { return new Application(); };
//# sourceMappingURL=Application.js.map