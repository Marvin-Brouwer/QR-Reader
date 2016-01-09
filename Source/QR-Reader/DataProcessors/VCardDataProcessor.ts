class VCardDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.VCard;

    public initiate(data: string): void {
        let fullName = data.match(/(FN\:)(.*)/i)[2];
        // somehow my map wont promt,alert,confirm
        let sure = confirm(`vCard: \n${fullName}`);
        if (sure) DownloadHelper.presentDownload(fullName, data);
    }

    // Leave these
    public afterSuccessCallback: (executionEvent: () => void) => void;
    public errorCallback: (errorMessage: string) => void;

}