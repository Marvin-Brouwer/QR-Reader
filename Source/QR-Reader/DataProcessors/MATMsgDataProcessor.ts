class MATMsgDataProcessor extends  EmailDataProcessor {
    public dataType: DataType = DataType.MATMsg;

    public initiate(data: string): void {
        let innerData = data.replace(<any>this.dataType, String());
        let mailtoLink = this.convertToMailto(innerData);
        super.initiate(mailtoLink);
    }

    private convertToMailto(innerData: string): string {
        let to = PatternHelper.matchBetweenKeyAndSemicolon('to', innerData);
        let cc = PatternHelper.matchBetweenKeyAndSemicolon('cc', innerData);
        let bcc = PatternHelper.matchBetweenKeyAndSemicolon('bcc', innerData);
        let subject = PatternHelper.matchBetweenKeyAndSemicolon('sub', innerData);
        let body = PatternHelper.matchBetweenKeyAndSemicolon('body', innerData);
        return `mailto:${to}?cc=${cc}&bcc=${bcc}&subject=${subject}&body=${body}`;
    }

    // Leave these
    public afterSuccessCallback: (executionEvent: () => void) => void;
    public errorCallback: (errorMessage: string) => void;
}