class VCardDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.VCard;
    private labelMapping = {
        'FN': 'Full name',
        'TEL;CELL': 'Phone(mobile)',
        'TEL;HOME': 'Phone(personal)',
        'TEL;WORK': 'Phone(business)',
        'EMAIL;HOME': 'Email(personal)',
        'EMAIL;WORK': 'Email(business)',
        'ADR': 'Address',
        'Address': 'Organisation'
    };

    public initiate(data: string): void {
        let vcardData = {};
        var fullName = data.match(/(FN\:)(.*)/i)[2];
        // somehow my map wont promt,alert,confirm
        var sure = confirm(`vCard: \n${fullName}`);
        if (sure) {
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:attachment/text,' + encodeURI(data);
            hiddenElement.target = '_blank';
            hiddenElement.setAttribute('download', `${vcardData['Full name']} (${new Date().toISOString().slice(0, 10)}).vcf`);
            hiddenElement.click();
        }
    }

    // Leave these
    public afterSuccessCallback: (executionEvent: () => void) => void;
    public errorCallback: (errorMessage: string) => void;

}