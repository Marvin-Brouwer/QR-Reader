class PopupManager {
    private popupElement: HTMLDivElement;
    private popupCanvas: HTMLDivElement;
    private popupLoadingIcon: HTMLDivElement;
    private popupHeader: HTMLDivElement;
    private popupContent: HTMLDivElement;
    private okButton: HTMLInputElement;

    constructor() {
        this.popupElement = <HTMLDivElement>document.body.querySelector('#popupCanvas');
        this.popupCanvas = <HTMLDivElement>document.body.querySelector('.popup');
        this.popupLoadingIcon = <HTMLDivElement>document.body.querySelector('.spinner');
        this.popupHeader = <HTMLDivElement>this.popupElement.querySelector('.popupHeader');
        this.popupContent = <HTMLDivElement>this.popupElement.querySelector('.popupContent');
        this.okButton = <HTMLInputElement>this.popupElement.querySelector('.popupOK');
    }

    public show(showMenu: boolean = true, activateButton: boolean = true, onOkClick: () => void = null): void {
        let application = <Application>Application.applicationContext;
        application.pauseCapture = true;
        this.popupHeader.className = (showMenu) ? 'popupHeader show' : 'popupHeader hide';
        this.popupContent.className = (showMenu) ? 'popupContent' : 'popupContent large';
        this.okButton.disabled = (!activateButton);
        this.okButton.onclick = () => {
            if (!!onOkClick) onOkClick();
            this.hide.apply(this);
        };
        this.popupLoadingIcon.className = 'spinner hide';
        this.popupCanvas.className = 'popup show';
        this.popupElement.className = 'opened';
        this.popupElement.className = 'opened';
        this.popupContent.scrollTop = 0;
    }
    public showSpinner(): void {
        this.popupLoadingIcon.className = 'spinner show';
        this.popupCanvas.className = 'popup hide';
        this.popupElement.className = 'opened';
    }
    public setButtonState(activateButton: boolean = true): void {
        this.okButton.disabled = (!activateButton);
    }
    public hide(): void {
        this.okButton.onclick = () => false;
        this.okButton.disabled = true;
        this.popupElement.className = 'closed';
        this.popupCanvas.className = 'popup hide';
        this.popupLoadingIcon.className = 'spinner hide';
        this.popupHeader.className = 'popupHeader show';
        this.popupContent.className = 'popupContent';
        let application = <Application>Application.applicationContext;
        application.pauseCapture = false;
    }

}