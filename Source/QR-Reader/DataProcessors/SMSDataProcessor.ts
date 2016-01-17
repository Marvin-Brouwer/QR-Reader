class SMSDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.SMS;

    public process(data: string): void {
        let actionManager = <ActionManager>ioc.Container.getCurrent().resolve<ActionManager>(ActionManager);
        let linkContainer = document.createElement('a');
        linkContainer.href = data;
        linkContainer.className = 'textMessage';
        actionManager.showCallToAction(`${DataType[this.dataType]}`, linkContainer);  
    }
}