class ImageProcessorFacade {
    private imageProcessors: Array<IImageProcessor>;
    private defaultImageProcessor: IImageProcessor;

    constructor() {
        this.imageProcessors = new Array<IImageProcessor>();
    }

    public addImageProcessor(imageProcessor: IImageProcessor): ImageProcessorFacade {
        this.imageProcessors.push(imageProcessor);
        return this;
    }
    public setDefaultImageProcessor(defaultImageProcessor: IImageProcessor): ImageProcessorFacade {
        this.defaultImageProcessor = defaultImageProcessor;
        return this;
    }

    public initiate(): ImageProcessorFacade {
        if (!this.defaultImageProcessor)
            throw new ReferenceError(TextDefinitions.noDefaultImageProcessorError);
        for (let i = 0; i < this.imageProcessors.length; i++) {
            let imageProcessor = this.imageProcessors[i];
            let nextImageProcessor = this.imageProcessors[i + 1] || null;
            imageProcessor.nextFallback = nextImageProcessor != null ?
                nextImageProcessor.initiate.bind(nextImageProcessor) :
                this.defaultImageProcessor.initiate.bind(this.defaultImageProcessor);
            imageProcessor.declinedFallback = this.defaultImageProcessor.initiate.bind(this.defaultImageProcessor);
        }

        // ReSharper disable once WrongExpressionStatement
        this.imageProcessors[0].initiate();
        return this;
    }
}