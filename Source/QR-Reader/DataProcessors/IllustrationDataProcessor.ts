class IllustrationDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.Illustration;

    public process(data: string): void {
        let actionManager = ioc.Container.getCurrent().resolve<ActionManager>(ActionManager);
        let imageType = (<RegExp><any>this.dataType).exec(data)[2];
        let imageCondition = <IEnumerable<RegExp>>Constants.imageTypes[imageType];
        let errorMessage = String();
        if (!imageCondition) errorMessage = TextDefinitions.getImageTypeError(imageType);
        if (!!imageCondition && !imageCondition.map((x: RegExp) => x.test(data)).firstOrDefault())
            errorMessage = TextDefinitions.imageReadError;
        let imageContainer = document.createElement('img');
        imageContainer.src = errorMessage === String() ? data : Constants.transparentGif;
        imageContainer.className = 'illustration';
        actionManager.showCallToAction(`${DataType[this.dataType]}: ${imageType}`, imageContainer, errorMessage);
    }
}