class UrlDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.Url;

    public process(data: string): void {
        let actionManager = ioc.Container.getCurrent().resolve<ActionManager>(ActionManager);
        let errorMessage = String();
        if (Constants.invalidUrls.map((x: string) => x.indexOf(data) > -1 || data.indexOf(x) > -1).firstOrDefault())
            errorMessage = `Warning the url you've scanned is part of our blacklist!`;
        let summary = data.replace(/http(s)?:\/\//mi, String());
        let shortSummary = summary.length <= 28 ? summary : `${summary.substr(0, 25)}...`;
        let linkContainer = document.createElement('a');
        linkContainer.href = data;
        linkContainer.target = '_blank';
        linkContainer.className = 'url';
        actionManager.showCallToAction(`${DataType[this.dataType]}: ${shortSummary}`, linkContainer, errorMessage);
    }
}