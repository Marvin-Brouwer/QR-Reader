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
        data.replace(/^(BEGIN:VCARD(\s*)*VERSION:[0-9].[0-9]+(\s*)*)/mi, '') // cut start tag and version tag
            .replace(/((\s*?)END:VCARD)/gmi, '') // cut endTag
            .trim().split(/\n\r?/mgi) // split lines
            .map(x => x.split(':')) // split on divider
            .forEach(field => { // convert even items to keys and odd items to values
                let mapLabel = EnumExtensions.toArray<string>(this.labelMapping).first(x => field[0].indexOf(x) !== -1);
                if (!mapLabel) return;
                let label = this.labelMapping[mapLabel.replace('"', '').trim()];
                if (!!label && label.indexOf('ADR') === -1)
                    vcardData[label] = field[1].replace(/;/g, ' ').trim();
                if (!!label && mapLabel.indexOf('ADR') !== -1) {
                    let data = field[1].split(';');
                    vcardData[label] = `${data[3].trim()},\n${(data[4].trim()+' '+data[5].trim()).trim()},\n${data[6].trim()}`;
                }
            });
        // somehow my map wont promt,alert,confirm
        var sure = confirm(`vCard: \n$download?`);
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