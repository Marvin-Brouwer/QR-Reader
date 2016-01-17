class IllustrationDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.Illustration;

    public initiate(data: string): void {
        let actionManager = <ActionManager>ioc.Container.getCurrent().resolve<ActionManager>(ActionManager);
        let imageType = (<RegExp><any>this.dataType).exec(data)[2];
        let isValid = !!Constants.imageTypes[imageType];
        let imageContainer = document.createElement('img');
        imageContainer.src = isValid ? data : Constants.transparentGif;
        imageContainer.className = 'illustration' + (isValid ? String() : ' invalid');
        actionManager.showCallToAction(`${DataType[this.dataType]}: ${imageType}`, imageContainer,
            isValid ? String() : `The image of type '${imageType}' is not supported!`);
    }

    // Leave these
    public afterSuccessCallback: (executionEvent: () => void) => void;
    public errorCallback: (errorMessage: string) => void;

}