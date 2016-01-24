class PhoneCallDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.PhoneCall;

    public process(data: string): void {
        let actionManager = ioc.Container.getCurrent().resolve<ActionManager>(ActionManager);
        let linkContainer = document.createElement('a');
        linkContainer.href = data;
        linkContainer.className = 'phoneCall';
        actionManager.showCallToAction(`${DataType[this.dataType]}`, linkContainer);
    }
}