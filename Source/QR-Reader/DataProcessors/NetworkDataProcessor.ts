class NetworkDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.WifiData;

    public process(data: string): void {
        let actionManager = <ActionManager>ioc.Container.getCurrent().resolve<ActionManager>(ActionManager);
        let ssID = PatternHelper.matchBetweenKeyAndSemicolon('S', data);
        let secure = PatternHelper.matchBetweenKeyAndSemicolon('T', data).trim() !== 'nopass';
        let linkContainer = document.createElement('a');
        linkContainer.href = data;
        linkContainer.className = 'network';
        actionManager.showCallToAction(`${DataType[this.dataType]}: '${ssID}'${secure ? ' (Secure)' : String()}`, linkContainer);
    }
}