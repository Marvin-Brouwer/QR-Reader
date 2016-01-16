class RawFileDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.RawFile;

    public initiate(data: string): void {
        alert('not supported');
    }

    // Leave these
    public afterSuccessCallback: (executionEvent: () => void) => void;
    public errorCallback: (errorMessage: string) => void;

}