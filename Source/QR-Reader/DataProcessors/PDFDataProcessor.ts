class PDFDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.PDF;

    public initiate(data: string): void {
        let sure = confirm(`PDF`);
        if (sure) DownloadHelper.presentDownload('QR-PDF', 'pdf', data, 'application/pdf');
    }

    // Leave these
    public afterSuccessCallback: (executionEvent: () => void) => void;
    public errorCallback: (errorMessage: string) => void;

}