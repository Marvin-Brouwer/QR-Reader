'use-strict';
var UrlDataProcessor = (function () {
    function UrlDataProcessor() {
        this.dataType = DataType.Url;
    }
    UrlDataProcessor.prototype.initiate = function (data) {
        // todo blacklist
        if (false)
            this.errorCallback("'" + encodeURI(data) + "' has been found on our list of dangerous url's");
        // show nice window with question
        var sure = window.confirm("Are you sure you want to navigate to '" + data + "'?");
        if (sure)
            window.location.href = data;
        else
            this.afterSuccessCallback(function () {
                // close future window
            });
    };
    return UrlDataProcessor;
})();
//# sourceMappingURL=UrlDataProcessor.js.map