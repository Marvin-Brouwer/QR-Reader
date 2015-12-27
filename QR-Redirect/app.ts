declare var qrcode: any;

class Application {
    private form: HTMLFormElement;
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
        this.cameraInput = <HTMLInputElement>(document.querySelector('form#mainForm input[name=file]'));
        this.errorField = <HTMLInputElement>(document.querySelector('form#mainForm label div.error'));

        // Initialize
        this.initialize();

        // todo: create functionality for live webcam using: http://www.webqr.com/ like functionality that actualy works
    }

    private initialize() {
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
    private setError(text:string) {
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
        this.setTitle('');
        var jsonData = JSON.parse(jsonString.replace(new RegExp('\'', 'g'), '"'));
        if (!jsonData || !jsonData.url) {
            this.setError('Invalid data');
            return;
        }
        var url = `http${!!jsonData.secure ? 's' : ''}://${jsonData.url}`;
        console.log(url);
        // todo: ajax preload
        //window.location.href = url;
        return;
    }

    private getParameterByName(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
            results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
}

window.onload = () => new Application();