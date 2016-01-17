class TextDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.Text;

    public process(data: string): void {
        let actionManager = <ActionManager>ioc.Container.getCurrent().resolve<ActionManager>(ActionManager);
        let textContainer = document.createElement('textarea');
        textContainer.value = data;
        textContainer.readOnly = true;
        actionManager.showCallToAction(DataType[this.dataType], textContainer);
    }
}