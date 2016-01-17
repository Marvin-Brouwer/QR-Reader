class PDFDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.PDF;

    public process(data: string): void {
        let actionManager = <ActionManager>ioc.Container.getCurrent().resolve<ActionManager>(ActionManager);
        let errorMessage = String();
        let pdfContainer = DownloadHelper.getDownloadElement('QR-PDF', 'pdf', data, 'application/pdf');
        pdfContainer.className = 'pdf';
        if (!Constants.pdfBase.test(data)) {
            errorMessage = `An error occured while reading the pdf!`;
            pdfContainer.href = '#';
            pdfContainer.target = '_self';
            pdfContainer.removeAttribute('download');
        }
        actionManager.showCallToAction(`${DataType[this.dataType]}`, pdfContainer, errorMessage);
    }
}