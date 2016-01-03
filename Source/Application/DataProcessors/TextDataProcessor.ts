'use-strict';

class TextDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.Text;

    public initiate(data: string): void {
        // todo: show in an <texarea readonly> <inside a noscript>
        alert(`Text value: \n${data}`);
    }

    // Leave these
    public afterSuccessCallback: (executionEvent: () => void) => void;
    public errorCallback: (errorMessage: string) => void;

}