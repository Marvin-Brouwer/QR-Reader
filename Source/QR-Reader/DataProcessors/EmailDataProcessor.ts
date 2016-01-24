class EmailDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.Email;

    public process(data: string): void {
        let actionManager = ioc.Container.getCurrent().resolve<ActionManager>(ActionManager);
        let email = data.replace(<any>DataType.Email, String());
        email = email.indexOf('?') < 0 ? email : email.split('?')[0];
        let linkContainer = document.createElement('a');
        linkContainer.href = data;
        linkContainer.className = 'textMessage';
        actionManager.showCallToAction(`${DataType[DataType.Email]}: ${email}`, linkContainer);
    }
}