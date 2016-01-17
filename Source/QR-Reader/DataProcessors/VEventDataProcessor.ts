class VEventDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.VEvent;

    public process(data: string): void {
        let actionManager = <ActionManager>ioc.Container.getCurrent().resolve<ActionManager>(ActionManager);
        let summary = data.match(/(SUMMARY\:)(.*)/i)[2];
        let shortSummary = summary.length <= 10 ? summary : `${summary.substr(0, 7)}...`;
        let linkContainer = DownloadHelper.getDownloadElement(shortSummary, 'ics', data);
        linkContainer.className = 'vEvent';
        actionManager.showCallToAction(`${DataType[this.dataType]}: ${shortSummary}`, linkContainer);
    }
}