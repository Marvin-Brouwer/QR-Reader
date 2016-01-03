'use strict';
var UploadImageProcessor = (function () {
    function UploadImageProcessor() {
    }
    UploadImageProcessor.prototype.nextFallback = function () { };
    UploadImageProcessor.prototype.declinedFallback = function () { };
    UploadImageProcessor.prototype.initiate = function () {
        this.buildHtml();
        this.initializeUpload();
        qrcode.callback = this.qrCallback.bind(this);
    };
    UploadImageProcessor.prototype.buildHtml = function () {
        this.form = document.createElement('form');
        this.form.id = 'mainForm';
        this.form.action = '';
        this.form.method = 'POST';
        this.form.enctype = 'multipart/form-data';
        var label = document.createElement('label');
        var innerLabel = document.createElement('div');
        innerLabel.setAttribute('class', 'label');
        innerLabel.innerHTML = 'Tap to select<wbr/> <span class="no-break">QR-Code</span>';
        this.errorField = document.createElement('div');
        this.errorField.setAttribute('class', 'error');
        this.cameraInput = document.createElement('input');
        this.cameraInput.type = 'file';
        this.cameraInput.name = 'file';
        this.cameraInput.accept = 'image/*;capture=camera';
        this.cameraInput.setAttribute('capture', 'camera');
        label.appendChild(innerLabel);
        label.appendChild(this.errorField);
        label.appendChild(this.cameraInput);
        this.form.appendChild(label);
        document.body.appendChild(this.form);
    };
    UploadImageProcessor.prototype.initializeUpload = function () {
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
            Application.current.setTitle('Reading...');
            ev.cancelBubble = true;
            ev.preventDefault();
            if (!_this.cameraInput.value) {
                _this.reset();
                return ev;
            }
            _this.readQR();
            return ev;
        };
    };
    UploadImageProcessor.prototype.readQR = function () {
        var file = this.cameraInput.files[0];
        if (!file)
            return;
        var reader = new FileReader();
        reader.onloadend = function () {
            Application.current.setTitle('Parsing...');
            console.log("Created DataUrl: " + reader.result);
            qrcode.decode(reader.result);
        };
        reader.readAsDataURL(file);
    };
    UploadImageProcessor.prototype.reset = function () {
        this.cameraInput.value = null;
        Application.current.reset();
    };
    UploadImageProcessor.prototype.clearErrors = function () {
        this.errorField.innerText = '';
    };
    UploadImageProcessor.prototype.setError = function (text) {
        this.errorField.innerText = text;
    };
    UploadImageProcessor.prototype.qrCallback = function (data) {
        var _this = this;
        Application.current.qrCallback(data, function (error) { return _this.setError(error); });
    };
    return UploadImageProcessor;
})();
//# sourceMappingURL=UploadImageProcessor.js.map