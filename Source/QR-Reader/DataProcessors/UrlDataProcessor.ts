class UrlDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.Url;

    public initiate(data: string): void {
        // todo blacklist
        if (false) this.errorCallback(`'${encodeURI(data)}' has been found on our list of dangerous url's`);

        // show nice window with question
        let sure = window.confirm(`Are you sure you want to navigate to '${data}'?`);
        if (sure) UrlHelper.redirect(data, () => {alert(`Failed to navigate to: '${data}'!`)});
        else this.afterSuccessCallback(() => {
            // close future window
        });
    }

    // Leave these
    public afterSuccessCallback: (executionEvent: () => void) => void;
    public errorCallback: (errorMessage: string) => void;

}