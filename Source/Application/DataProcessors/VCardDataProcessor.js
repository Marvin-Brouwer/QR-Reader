var VCardDataProcessor = (function () {
    function VCardDataProcessor() {
        this.dataType = DataType.VCard;
        this.labelMapping = {
            'FN': 'Full name',
            'TEL;CELL': 'Phone(mobile)',
            'TEL;HOME': 'Phone(personal)',
            'TEL;WORK': 'Phone(business)',
            'EMAIL;HOME': 'Email(personal)',
            'EMAIL;WORK': 'Email(business)',
            'ADR': 'Address',
            'Address': 'Organisation'
        };
    }
    VCardDataProcessor.prototype.initiate = function (data) {
        var _this = this;
        var vcardData = {};
        data.replace(/^(BEGIN:VCARD(\s*)*VERSION:[0-9].[0-9]+(\s*)*)/mi, '') // cut start tag and version tag
            .replace(/((\s*?)END:VCARD)/gmi, '') // cut endTag
            .trim().split(/\n\r?/mgi) // split lines
            .map(function (x) { return x.split(':'); }) // split on divider
            .forEach(function (field) {
            var mapLabel = EnumExtensions.toArray(_this.labelMapping).first(function (x) { return field[0].indexOf(x) !== -1; });
            if (!mapLabel)
                return;
            var label = _this.labelMapping[mapLabel.replace('"', '').trim()];
            if (!!label && label.indexOf('ADR') === -1)
                vcardData[label] = field[1].replace(/;/g, ' ').trim();
            if (!!label && mapLabel.indexOf('ADR') !== -1) {
                var data_1 = field[1].split(';');
                vcardData[label] = data_1[3].trim() + ",\n" + (data_1[4].trim() + ' ' + data_1[5].trim()).trim() + ",\n" + data_1[6].trim();
            }
        });
        // somehow my map wont promt,alert,confirm
        var sure = confirm("vCard: \n$download?");
        if (sure) {
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:attachment/text,' + encodeURI(data);
            hiddenElement.target = '_blank';
            hiddenElement.setAttribute('download', vcardData['Full name'] + " (" + new Date().toISOString().slice(0, 10) + ").vcf");
            hiddenElement.click();
        }
    };
    return VCardDataProcessor;
})();
//# sourceMappingURL=VCardDataProcessor.js.map