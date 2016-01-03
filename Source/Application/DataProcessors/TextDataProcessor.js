'use-strict';
var TextDataProcessor = (function () {
    function TextDataProcessor() {
        this.dataType = DataType.Text;
    }
    TextDataProcessor.prototype.initiate = function (data) {
        // todo: show in an <texarea readonly> <inside a noscript>
        alert("Text value: \n" + data);
    };
    return TextDataProcessor;
})();
//# sourceMappingURL=TextDataProcessor.js.map