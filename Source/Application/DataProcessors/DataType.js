'use-strict';
var DataType;
(function (DataType) {
    DataType[DataType["Text"] = null] = "Text";
    DataType[DataType["Url"] = (/^(\s)*(https?:\/\/)([a-zA-Z0-9\_\-\.\/\?\=\&\#\:\[\]\{\}]+[a-zA-Z0-9\?\&\#\/\]\}?])(\s)*$/gi)] = "Url";
    DataType[DataType["VCard"] = (new RegExp('^todo$', 'gi'))] = "VCard";
    DataType[DataType["SMS"] = (new RegExp('^todo$', 'gi'))] = "SMS";
    DataType[DataType["Call"] = (new RegExp('^todo$', 'gi'))] = "Call";
    DataType[DataType["GeoLocation"] = (new RegExp('^todo$', 'gi'))] = "GeoLocation";
    DataType[DataType["Event"] = (new RegExp('^todo$', 'gi'))] = "Event";
    DataType[DataType["Email"] = (new RegExp('^todo$', 'gi'))] = "Email";
    DataType[DataType["WifiData"] = (new RegExp('^todo$', 'gi'))] = "WifiData";
})(DataType || (DataType = {}));
//# sourceMappingURL=DataType.js.map