'use strict';
class Application {
    constructor() {
        Application.current = this;
        // Start by reading query
        let loadQuery = this.getParameterByName('qr');
        if (!!loadQuery)
            this.parseUrl(loadQuery);
        // Start processors
        new ImageProcessorFactory(new UploadImageProcessor())
            .addImageProcessor(new FlashImageProcessor())
            .initiate();
        this.initialize();
    }
    initialize() {
        this.reset();
    }
    setTitle(title) {
        document.title = `QR-Redirect - ${title}`;
    }
    reset() {
        this.setTitle('Select QR-Code');
    }
    qrCallback(data, errorFunc) {
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
        }
        else {
            alert(url);
        }
        return;
    }
    parseUrl(jsonString) {
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
    getParameterByName(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)'), results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
}
Application.settings = {
    siteUrl: 'https://github.com/Marvin-Brouwer/QR-Redirect'
};
window.onload = () => new Application();
//# sourceMappingURL=Application.js.map