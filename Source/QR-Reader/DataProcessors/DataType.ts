'use-strict';

enum DataType {
    Text = null,
    Url = <any>(/^(\s)*(https?:\/\/)([a-zA-Z0-9\_\-\.\/\?\=\&\#\:\[\]\{\}]+[a-zA-Z0-9\?\&\#\/\]\}?])(\s)*$/i),
    VCard = <any>(/(BEGIN:VCARD(\s*)){1}(\w*\W*\s*?)*((\s*?)END:VCARD){1}/mi),
    SMS = <any>(new RegExp('^todo$', 'gi')),
    Call = <any>(new RegExp('^todo$', 'gi')),
    GeoLocation = <any>(new RegExp('^todo$', 'gi')),
    Event = <any>(new RegExp('^todo$', 'gi')),
    Email = <any>(new RegExp('^todo$', 'gi')),
    WifiData = <any>(new RegExp('^todo$', 'gi'))
}