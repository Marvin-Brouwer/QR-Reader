class SMSDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.SMS;

    public initiate(data: string): void {
        let actionManager = <ActionManager>ioc.Container.getCurrent().resolve<ActionManager>(ActionManager);
        let linkContainer = document.createElement('a');
        linkContainer.href = data;
        linkContainer.className = 'textMessage';
        actionManager.showCallToAction(`${DataType[this.dataType]}`, linkContainer);  
    }

    // Leave these
    public afterSuccessCallback: (executionEvent: () => void) => void;
    public errorCallback: (errorMessage: string) => void;

}