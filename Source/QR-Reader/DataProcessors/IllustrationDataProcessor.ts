class IllustrationDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.Illustration;

    public initiate(data: string): void {
        let sure = confirm(`Image`);
    }

    // Leave these
    public afterSuccessCallback: (executionEvent: () => void) => void;
    public errorCallback: (errorMessage: string) => void;

}