class ActionManager {
    private tabManager: TabManager;
    private popupManager: PopupManager;
    private title: HTMLHeadingElement;
    private invalidMessage: HTMLParagraphElement;
    private actionContent: HTMLDivElement;

    constructor() {
        this.tabManager = ioc.Container.getCurrent().resolve<TabManager>(TabManager);
        this.popupManager = ioc.Container.getCurrent().resolve<PopupManager>(PopupManager);
        this.title = <HTMLHeadingElement>document.querySelector('#callToAction .typeName');
        this.invalidMessage = <HTMLParagraphElement>document.querySelector('#callToAction .invalidMessage');
        this.actionContent = <HTMLDivElement>document.querySelector('#callToAction .actionContent');
    }

    public showCallToAction(typeName: string, content: HTMLElement, invalidMessage: string = String()): void {
        let isValid = invalidMessage === String();
        this.tabManager.setActive('callToAction');
        this.title.innerText = typeName;
        this.invalidMessage.innerText = invalidMessage;
        this.actionContent.innerHTML = String();
        this.actionContent.appendChild(content);
        this.actionContent.className = isValid ? 'actionContent' : 'actionContent invalid';
        this.popupManager.show(false);
    }
}