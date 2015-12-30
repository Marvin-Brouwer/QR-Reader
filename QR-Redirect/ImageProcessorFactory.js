var ImageProcessorFactory = (function () {
    function ImageProcessorFactory(defaultImageProcessor) {
        this.defaultImageProcessor = defaultImageProcessor;
    }
    ImageProcessorFactory.prototype.addImageProcessor = function (imageProcessor) {
        this.imageProcessors.push(imageProcessor);
    };
    ImageProcessorFactory.prototype.initiate = function () {
        var _this = this;
        for (var i = 0; i < this.imageProcessors.length; i++) {
            var imageProcessor = this.imageProcessors[i];
            var nextImageProcessor = this.imageProcessors[i + 1] || null;
            imageProcessor.nextFallback = function () { return new nextImageProcessor(); };
            imageProcessor.declinedFallback = function () { return new _this.defaultImageProcessor(); };
        }
        // ReSharper disable once WrongExpressionStatement
        new this.imageProcessors[0]();
    };
    return ImageProcessorFactory;
})();
//# sourceMappingURL=ImageProcessorFactory.js.map