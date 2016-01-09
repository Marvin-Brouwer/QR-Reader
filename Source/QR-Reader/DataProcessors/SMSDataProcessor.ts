class SMSDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.SMS;

    public initiate(data: string): void {

        if (!DeviceHelper.isTouchEnabled()) 
            alert('sms urls are not supported by your system!');
        else
            if (confirm('Send an sms?'))
                UrlHelper.redirect(data, () => { alert(`Failed to navigate to: '${data}'!`) });
            
    }

    // Leave these
    public afterSuccessCallback: (executionEvent: () => void) => void;
    public errorCallback: (errorMessage: string) => void;

}