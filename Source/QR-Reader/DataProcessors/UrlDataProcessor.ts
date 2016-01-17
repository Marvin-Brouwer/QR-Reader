class UrlDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.Url;

    public initiate(data: string): void {
        let actionManager = <ActionManager>ioc.Container.getCurrent().resolve<ActionManager>(ActionManager);
        let errorMessage = String();
        if (Constants.invalidUrls.map(x => x.indexOf(data) > -1 || data.indexOf(x) > -1).firstOrDefault())
            errorMessage = `Warning the url you've scanned is part of our blacklist!`;
        let linkContainer = document.createElement('a');
        linkContainer.href = data;
        linkContainer.target = '_blank';
        linkContainer.className = 'url';
        actionManager.showCallToAction(`${DataType[this.dataType]}`, linkContainer, errorMessage);
    }

    // Leave these
    public afterSuccessCallback: (executionEvent: () => void) => void;
    public errorCallback: (errorMessage: string) => void;

}