class PhoneCallDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.PhoneCall;

    public initiate(data: string): void {

        if (!DeviceHelper.isTouchEnabled()) 
            alert('tel urls are not supported by your system!');
        else
            if (confirm(`Call '${data}'?`))
                UrlHelper.redirect(data, () => { alert(`Failed to navigate to: '${data}'!`) });
            
    }

    // Leave these
    public afterSuccessCallback: (executionEvent: () => void) => void;
    public errorCallback: (errorMessage: string) => void;

}