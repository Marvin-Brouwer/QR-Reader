'use strict';
var DataProcessorFactory = (function () {
    function DataProcessorFactory() {
        this.dataProcessors = new Array();
    }
    DataProcessorFactory.prototype.addDataProcessor = function (dataProcessor) {
        var key = DataType[dataProcessor.dataType];
        this.dataProcessors.push({ key: key, dataProcessor: dataProcessor });
        return this;
    };
    DataProcessorFactory.prototype.calculate = function (data) {
        data = data.trim();
        console.log("Raw QR-Data: " + data);
        if (data === 'error decoding QR Code') {
            throw new TypeError(data);
        }
        var dataType = EnumExtensions.toArray(DataType).firstOrDefault(function (x) {
            if (DataType[x] === null || !DataType[x].test)
                return false; // Make sure it's a regex
            return DataType[x].test(data);
        });
        var selectedProcessor = this.dataProcessors.first(function (x) { return x.key === dataType; });
        if (!selectedProcessor)
            throw new ReferenceError('The processor for this dataType is missing!');
        var processor = selectedProcessor.dataProcessor;
        //processor.afterSuccessCallback = (executionEvent: () => void) =>
        //{
        //    var sure = window.confirm('sure?');
        //    if (sure) executionEvent();
        //}
        processor.errorCallback = function (errorMessage) {
            alert(errorMessage);
        };
        processor.initiate(data);
    };
    return DataProcessorFactory;
})();
//# sourceMappingURL=DataProcessorFactory.js.map