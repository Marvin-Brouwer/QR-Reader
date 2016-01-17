class PopupManager {
    private popupElement: HTMLDivElement;
    private popupHeader: HTMLDivElement;
    private popupContent: HTMLDivElement;
    private okButton: HTMLInputElement;

    constructor() {
        this.popupElement = <HTMLDivElement>document.body.querySelector('#popupCanvas');
        this.popupHeader = <HTMLDivElement>this.popupElement.querySelector('.popupHeader');
        this.popupContent = <HTMLDivElement>this.popupElement.querySelector('.popupContent');
        this.okButton = <HTMLInputElement>this.popupElement.querySelector('.popupOK');
    }

    public show(showMenu = true, activateButton = true, onOkClick: () => void = null) {
        let application = <Application>Application.applicationContext;
        application.pauseCapture = true;
        this.popupHeader.className = (showMenu) ? 'popupHeader show' : 'popupHeader hide';
        this.popupContent.className = (showMenu) ? 'popupContent' : 'popupContent large';
        this.okButton.disabled = (!activateButton);
        this.okButton.onclick = () => {
            if (!!onOkClick) onOkClick();
            this.hide.apply(this);
        };
        this.popupElement.className = 'opened';
        this.popupContent.scrollTop = 0;
    }
    public setButtonState(activateButton = true) {
        this.okButton.disabled = (!activateButton);
    }
    public hide() {
        this.okButton.onclick = () => false;
        this.okButton.disabled = true;
        this.popupElement.className = 'closed';
        this.popupHeader.className = 'popupHeader show';
        this.popupContent.className = 'popupContent';
        let application = <Application>Application.applicationContext;
        application.pauseCapture = false;
    }

}