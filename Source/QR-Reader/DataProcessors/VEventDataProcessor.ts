class VEventDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.VEvent;

    public initiate(data: string): void {
        let summary = data.match(/(SUMMARY\:)(.*)/i)[2];
        let shortSummary = summary.length <= 10 ? summary : `${summary.substr(0,7)}...`;
        // somehow my map wont promt,alert,confirm
        let sure = confirm(`vEvent: \n${summary}`);
        if (sure) DownloadHelper.presentDownload(shortSummary, 'ics', data);
    }

    // Leave these
    public afterSuccessCallback: (executionEvent: () => void) => void;
    public errorCallback: (errorMessage: string) => void;

}