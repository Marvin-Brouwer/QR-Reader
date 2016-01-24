class RawFileDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.RawFile;

    public process(data: string): void {
        let actionManager = ioc.Container.getCurrent().resolve<ActionManager>(ActionManager);
        let fileType = (<RegExp><any>this.dataType).exec(data)[2];
        let errorMessage = document.createElement('p');
        errorMessage.innerText = TextDefinitions.notSupportedDescription;
        actionManager.showCallToAction(TextDefinitions.getRawFileTitle(fileType), errorMessage, TextDefinitions.rawFileError);
    }
}