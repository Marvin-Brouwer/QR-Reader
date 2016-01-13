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

        this.popupHeader.appendChild(document.querySelector('nav[role=navigation'));
        this.popupContent.appendChild(document.querySelector('#about'));
        this.popupContent.appendChild(document.querySelector('#contribution'));
        this.popupContent.appendChild(document.querySelector('#toa'));;
    }

    public show(showMenu = true, activateButton = true, onOkClick: () => void = null) {
        this.popupHeader.className = (showMenu) ? 'popupHeader show' : 'popupHeader hide';
        this.popupContent.className = (showMenu) ? 'popupContent' : 'popupContent large';
        this.okButton.disabled = (!activateButton);
        this.okButton.onclick = () => {
            if (!!onOkClick) onOkClick();
            this.hide.apply(this);
        };
        this.popupElement.className = 'opened';
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
    }

}