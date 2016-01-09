class NetworkDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.WifiData;

    public initiate(data: string): void {
        let ssID = PatternHelper.matchBetweenKeyAndSemicolon('S', data);
        let secure = PatternHelper.matchBetweenKeyAndSemicolon('T', data).trim() !== 'nopass';

        if (!DeviceHelper.isTouchEnabled())
            alert('Wifi urls are not supported by your system!');
        else
            if (confirm(`Are you sure you want to add the${secure ? ' secure' : String()} network '${ssID}'?`))
                UrlHelper.redirect(data);
    }

    // Leave these
    public afterSuccessCallback: (executionEvent: () => void) => void;
    public errorCallback: (errorMessage: string) => void;
}