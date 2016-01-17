class VCardDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.VCard;

    public initiate(data: string): void {
        let actionManager = <ActionManager>ioc.Container.getCurrent().resolve<ActionManager>(ActionManager);
        let fullName = data.match(/(FN\:)(.*)/i)[2];
        let linkContainer = DownloadHelper.getDownloadElement(fullName, 'vcf', data);
        linkContainer.className = 'vCard';
        actionManager.showCallToAction(`${DataType[this.dataType]}: ${fullName}`, linkContainer);
    }

    // Leave these
    public afterSuccessCallback: (executionEvent: () => void) => void;
    public errorCallback: (errorMessage: string) => void;

}