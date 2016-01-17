class SMSDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.SMS;

    public initiate(data: string): void {
        let actionManager = <ActionManager>ioc.Container.getCurrent().resolve<ActionManager>(ActionManager);
        let errorMessage = String();
        if (!DeviceHelper.isTouchEnabled()) errorMessage = 'Sms urls are not supported by your system!';
        let linkContainer = document.createElement('a');
        linkContainer.href = data;
        linkContainer.className = 'textMessage';
        actionManager.showCallToAction(`${DataType[this.dataType]}`, linkContainer, errorMessage);  
    }

    // Leave these
    public afterSuccessCallback: (executionEvent: () => void) => void;
    public errorCallback: (errorMessage: string) => void;

}