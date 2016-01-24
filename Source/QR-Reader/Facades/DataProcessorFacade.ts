class DataProcessorFacade {
    private dataProcessors: IEnumerable<{ key: String, dataProcessor: IDataProcessor }>;

    constructor() {
        this.dataProcessors = <IEnumerable<{ key: String, dataProcessor: IDataProcessor }>>(<any>(new Array()));
    }

    public addDataProcessor(dataProcessor: IDataProcessor): DataProcessorFacade {
        let key = DataType[dataProcessor.dataType];
        this.dataProcessors.push({ key, dataProcessor });
        return this;
    }

    public calculate(data: string): void {
        data = data.trim();
        console.log(`Raw QR-Data: ${data}`);
        if (data === TextDefinitions.libraryCodeReadError) {
            throw new TypeError(TextDefinitions.codeReadingErrorMessage);
        }
        let application = <Application>Application.applicationContext;
        application.pauseCapture = true;
        let dataType = EnumExtensions.toArray<DataType>(DataType).firstOrDefault((x: DataType) => {
            if (DataType[x] === null || !(<any>DataType[x]).test) return false; // Make sure it's a regex
            return (<RegExp><any>DataType[x]).test(data);
        });
        let selectedProcessor = this.dataProcessors.first(
            (x: { key: String, dataProcessor: IDataProcessor }) => x.key === <string><any>dataType);
        if (!selectedProcessor) throw new ReferenceError(TextDefinitions.dataProcessorMissingError);
        let processor = selectedProcessor.dataProcessor;
        processor.process(data);
    }
}