class UploadImageProcessor implements IImageProcessor {
    private form: HTMLFormElement;
    private cameraInput: HTMLInputElement;
    private errorField: HTMLDivElement;

    public nextFallback(): void { }
    public declinedFallback(): void { }

    public initiate(): void {
        this.buildHtml();
        this.initializeUpload();
        qrcode.callback = this.qrCallback.bind(this);
    }

    public qrCallback(data: string): void {
        (<Application>ioc.ApplicationContext.applicationContext).qrCallback(data, (error: string) => this.setError(error));
    }

    private buildHtml(): void {
        this.form = document.createElement('form');
        this.form.id = 'mainForm';
        this.form.action = String();
        this.form.method = 'POST';
        this.form.enctype = 'multipart/form-data';
        let label = document.createElement('label');
        let innerLabel = document.createElement('div');
        innerLabel.setAttribute('class', 'label');
        innerLabel.innerHTML = TextDefinitions.uploadImageProcessorTitle;
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
        document.body.querySelector('#appBody').appendChild(this.form);
    }

    private initializeUpload(): void {
        this.cameraInput.onfocus = (ev: Event) => document.body.focus();

        this.form.onsubmit = (ev: Event) => {
            ev.cancelBubble = true;
            ev.preventDefault();
            return ev;
        };
        this.cameraInput.onclick = (ev: Event) => this.clearErrors();
        this.cameraInput.onchange = (ev: Event) => {
            this.clearErrors();
            ev.cancelBubble = true;
            ev.preventDefault();
            if (!this.cameraInput.value) {
                this.reset();
                return ev;
            }
            this.readQR();
            this.reset();
            return ev;
        };
    }

    private readQR(): void {
        let file = this.cameraInput.files[0];
        if (!file) return;

        let reader = new FileReader();
        reader.onloadend = () => {
            console.log(`Created DataUrl: ${reader.result}`);
            qrcode.decode(reader.result);
        };
        reader.readAsDataURL(file);
    }

    private reset(): void {
        this.cameraInput.value = null;
    }

    private clearErrors(): void {
        this.errorField.innerText = String();
    }

    private setError(text: string): void {
        this.errorField.innerText = text;
    }
}