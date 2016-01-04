'use strict';
class DataProcessorFactory {
    constructor() {
        this.dataProcessors = new Array();
    }
    addDataProcessor(dataProcessor) {
        var key = DataType[dataProcessor.dataType];
        this.dataProcessors.push({ key, dataProcessor });
        return this;
    }
    calculate(data) {
        data = data.trim();
        console.log(`Raw QR-Data: ${data}`);
        if (data === 'error decoding QR Code') {
            throw new TypeError(data);
        }
        let dataType = EnumExtensions.toArray(DataType).firstOrDefault((x) => {
            if (DataType[x] === null || !DataType[x].test)
                return false; // Make sure it's a regex
            return DataType[x].test(data);
        });
        let selectedProcessor = this.dataProcessors.first(x => x.key === dataType);
        if (!selectedProcessor)
            throw new ReferenceError('The processor for this dataType is missing!');
        var processor = selectedProcessor.dataProcessor;
        //processor.afterSuccessCallback = (executionEvent: () => void) =>
        //{
        //    var sure = window.confirm('sure?');
        //    if (sure) executionEvent();
        //}
        processor.errorCallback = (errorMessage) => {
            alert(errorMessage);
        };
        processor.initiate(data);
    }
}
//# sourceMappingURL=DataProcessorFactory.js.map