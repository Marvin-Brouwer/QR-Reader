# QR-Redirect
An online qr code redirect site

## Usage
Create a URL QR-Code with the following data, using [goqr.me](http://goqr.me/#t=url):
```javascript
https://github.com/Marvin-Brouwer/QR-Redirect?qr={ 'url': 'url.tld', 'secure': false } 
```
Navigate with any smartphone to [http://tiny.cc/qrr](http://tiny.cc/qrr) and scan the url to navigate to.  
This will redirect to [marvin-brouwer.github.io/QR-Redirect](https://github.com/Marvin-Brouwer/QR-Redirect) but it's easier to type

## Credits
* The decoder used for the QRcode reading is from LazarSoft [https://github.com/LazarSoft/jsqrcode](https://github.com/LazarSoft/jsqrcode)
* The camcanvas swf file for old browser fallback: http://www.taboca.com/p/camcanvas/
* https://github.com/MitosEHR/MitosEHR-Official/tree/master/lib/jsqrcode
* https://github.com/swfobject/swfobject