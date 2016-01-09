﻿'use-strict';

enum DataType {
    Text = null,
    Url = <any>(/^(\s)*(https?:\/\/)([a-zA-Z0-9\_\-\.\/\?\=\&\#\:\[\]\{\}]+[a-zA-Z0-9\?\&\#\/\]\}?])(\s)*$/i),
    VCard = <any>(/(BEGIN:VCARD(\s*)){1}(\w*\W*\s*?)*((\s*?)END:VCARD){1}/mi),
    SMS = <any>(/^(sms(to)?(:)?(\s)?)/mi),
    PhoneCall = <any>(/^(tel(:)?(\s)?)/mi),
    GeoLocation = <any>(/^(geo(:)?(\s)?)/mi),
    // Extend: https://en.wikipedia.org/wiki/ICalendar
    VEvent = <any>(/(BEGIN:V(\w*\W*)?(\s*)){1}(\w*\W*\s*?)*((\s*?)END:V(\w*\W*)?){1}/mi),
    Email = <any>(new RegExp('^todo$', 'gi')),
    WifiData = <any>(new RegExp('^todo$', 'gi'))
}