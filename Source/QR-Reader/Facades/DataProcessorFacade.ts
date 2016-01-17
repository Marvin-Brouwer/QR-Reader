'use strict';

class DataProcessorFacade {
    private dataProcessors: IEnumerable<{ key: String, dataProcessor: IDataProcessor }>;
    
    constructor() {
        this.dataProcessors = <IEnumerable<{ key: String, dataProcessor: IDataProcessor }>>(<any>(new Array()));
    }

    public addDataProcessor(dataProcessor: IDataProcessor): DataProcessorFacade {
        var key = DataType[dataProcessor.dataType];
        this.dataProcessors.push({ key , dataProcessor});
        return this;
    }

    public calculate(data: string) {
        data = data.trim();
        console.log(`Raw QR-Data: ${data}`);
        if (data === 'error decoding QR Code') {
            throw new TypeError('An error occured while decoding the QR-Code');
        }
        // Todo: stop processing
        let dataType = EnumExtensions.toArray<DataType>(DataType).firstOrDefault((x) => {
            if (DataType[x] === null || !(<any>DataType[x]).test) return false; // Make sure it's a regex
            return (<RegExp><any>DataType[x]).test(data);
        });
        let selectedProcessor = this.dataProcessors.first(x => x.key === <string><any>dataType);
        if (!selectedProcessor) throw new ReferenceError('The processor for this dataType is missing!');
        var processor = selectedProcessor.dataProcessor;
        //processor.afterSuccessCallback = (executionEvent: () => void) =>
        //{
        //    var sure = window.confirm('sure?');
        //    if (sure) executionEvent();
        //}
        processor.errorCallback = (errorMessage: string) => {
            alert(errorMessage);
        }
        // todo: give method to start processing
        processor.initiate(data);
    }
}