'use strict';
var ImageProcessorFactory = (function () {
    function ImageProcessorFactory(defaultImageProcessor) {
        this.defaultImageProcessor = defaultImageProcessor;
        this.imageProcessors = new Array();
    }
    ImageProcessorFactory.prototype.addImageProcessor = function (imageProcessor) {
        this.imageProcessors.push(imageProcessor);
        return this;
    };
    ImageProcessorFactory.prototype.initiate = function () {
        for (var i = 0; i < this.imageProcessors.length; i++) {
            var imageProcessor = this.imageProcessors[i];
            var nextImageProcessor = this.imageProcessors[i + 1] || null;
            imageProcessor.nextFallback = nextImageProcessor != null ?
                nextImageProcessor.initiate.bind(nextImageProcessor) :
                this.defaultImageProcessor.initiate.bind(this.defaultImageProcessor);
            imageProcessor.declinedFallback = this.defaultImageProcessor.initiate.bind(this.defaultImageProcessor);
        }
        // ReSharper disable once WrongExpressionStatement
        this.imageProcessors[0].initiate();
        return this;
    };
    return ImageProcessorFactory;
})();
//# sourceMappingURL=ImageProcessorFactory.js.map