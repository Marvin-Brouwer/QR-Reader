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
        var vcardData = {};
        var fullName = data.match(/(FN\:)(.*)/i)[2];
        // somehow my map wont promt,alert,confirm
        var sure = confirm("vCard: \n" + fullName);
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