class RawFileDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.RawFile;

    public process(data: string): void {
        let actionManager = <ActionManager>ioc.Container.getCurrent().resolve<ActionManager>(ActionManager);
        let fileType = (<RegExp><any>this.dataType).exec(data)[2];
        let errorMessage = document.createElement('p');
        errorMessage.innerText = 'You\'ve scanned a QR-Code containing a raw file wich is not supported (yet).';
        actionManager.showCallToAction(` Raw file: ${fileType}`, errorMessage, 'Not supported!');
    }
}