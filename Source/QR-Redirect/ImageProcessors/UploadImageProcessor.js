'use strict';
class UploadImageProcessor {
    nextFallback() { }
    declinedFallback() { }
    initiate() {
        this.buildHtml();
        this.initializeUpload();
        qrcode.callback = this.qrCallback.bind(this);
    }
    buildHtml() {
        this.form = document.createElement('form');
        this.form.id = 'mainForm';
        this.form.action = '';
        this.form.method = 'POST';
        this.form.enctype = 'multipart/form-data';
        var label = document.createElement('label');
        var innerLabel = document.createElement('div');
        innerLabel.setAttribute('class', 'label');
        innerLabel.innerText = 'Tap to select QR-Code';
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
            Application.current.setTitle('Reading...');
            ev.cancelBubble = true;
            ev.preventDefault();
            if (!this.cameraInput.value) {
                this.reset();
                return ev;
            }
            this.readQR();
            return ev;
        };
    }
    readQR() {
        var file = this.cameraInput.files[0];
        if (!file)
            return;
        var reader = new FileReader();
        reader.onloadend = () => {
            Application.current.setTitle('Parsing...');
            console.log(`Created DataUrl: ${reader.result}`);
            qrcode.decode(reader.result);
        };
        reader.readAsDataURL(file);
    }
    reset() {
        this.cameraInput.value = null;
        Application.current.reset();
    }
    clearErrors() {
        this.errorField.innerText = '';
    }
    setError(text) {
        this.errorField.innerText = text;
    }
    qrCallback(data) {
        Application.current.qrCallback(data, (error) => this.setError(error));
    }
}
//# sourceMappingURL=UploadImageProcessor.js.map