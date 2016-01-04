'use-strict';
class UrlDataProcessor {
    constructor() {
        this.dataType = DataType.Url;
    }
    initiate(data) {
        // todo blacklist
        if (false)
            this.errorCallback(`'${encodeURI(data)}' has been found on our list of dangerous url's`);
        // show nice window with question
        var sure = window.confirm(`Are you sure you want to navigate to '${data}'?`);
        if (sure)
            window.location.href = data;
        else
            this.afterSuccessCallback(() => {
                // close future window
            });
    }
}
//# sourceMappingURL=UrlDataProcessor.js.map