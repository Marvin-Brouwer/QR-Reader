class MATMsgDataProcessor extends  EmailDataProcessor {
    public dataType: DataType = DataType.MATMsg;

    public initiate(data: string): void {
        let innerData = data.replace(<any>this.dataType, String());
        let mailtoLink = this.convertToMailto(innerData);
        super.initiate(mailtoLink);
    }

    private convertToMailto(innerData: string): string {
        let filterRegEx = (key) => new RegExp(`(${key}:\\s*)([^;]+)+`, 'mi');
        let valueOrNull = (key) => {
            let match = innerData.match(filterRegEx(key));
            return !filterRegEx(key).test(innerData) ? String()
                : match.length !== 3 ? String()
                    : match[2];
        };
        let to = valueOrNull('to');
        let cc = valueOrNull('cc');
        let bcc = valueOrNull('bcc');
        let subject = valueOrNull('sub');
        let body = valueOrNull('body');
        return `mailto:${to}?cc=${cc}&bcc=${bcc}&subject=${subject}&body=${body}`;
    }

    // Leave these
    public afterSuccessCallback: (executionEvent: () => void) => void;
    public errorCallback: (errorMessage: string) => void;
}