var Application = (function () {
    function Application() {
        this.settings = {
            shortUrl: 'http://tiny.cc/QRR'
        };
        // Start by reading query
        var loadQuery = this.getParameterByName('qr');
        if (!!loadQuery)
            this.parseUrl(loadQuery);
        // Define elements
        this.form = (document.querySelector('form#mainForm'));
        this.cameraInput = (document.querySelector('form#mainForm input[name=file]'));
        this.errorField = (document.querySelector('form#mainForm label div.error'));
        // Initialize
        this.initialize();
        // todo: create functionality for live webcam using: http://www.webqr.com/ like functionality that actualy works
    }
    Application.prototype.initialize = function () {
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
            if (data.indexOf(_this.settings.shortUrl) !== 0) {
                _this.setError('Invalid QR image');
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
        this.setTitle('');
        var jsonData = JSON.parse(jsonString.replace(new RegExp('\'', 'g'), '"'));
        if (!jsonData || !jsonData.url) {
            this.setError('Invalid data');
            return;
        }
        var url = "http" + (!!jsonData.secure ? 's' : '') + "://" + jsonData.url;
        console.log(url);
        // todo: ajax preload
        window.location.href = url;
        return;
    };
    Application.prototype.getParameterByName = function (name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'), results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    return Application;
})();
window.onload = function () { return new Application(); };
//# sourceMappingURL=app.js.map