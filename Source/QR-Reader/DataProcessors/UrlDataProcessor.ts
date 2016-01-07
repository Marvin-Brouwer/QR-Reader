'use-strict';

class UrlDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.Url;

    public initiate(data: string): void {
        // todo blacklist
        if (false) this.errorCallback(`'${encodeURI(data)}' has been found on our list of dangerous url's`);

        // show nice window with question
        var sure = window.confirm(`Are you sure you want to navigate to '${data}'?`);
        if (sure) window.location.href = data;
        else this.afterSuccessCallback(() => {
            // close future window
        });
    }

    // Leave these
    public afterSuccessCallback: (executionEvent: () => void) => void;
    public errorCallback: (errorMessage: string) => void;

}