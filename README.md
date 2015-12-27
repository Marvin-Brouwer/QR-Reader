# QR-Redirect
An online qr code redirect site

## Usage
Create a URL QR-Code with the following data, using [goqr.me](http://goqr.me/#t=url):
```javascript
tiny.cc/TODO?qr={ 'url': 'url.tld', secure: false } 
```
Navigate with any smartphone to [http://tiny.cc/QRR](http://tiny.cc/QRR) and scan the url to navigate to.  
This will redirect to [marvin-brouwer.github.io/QR-Redirect](http://marvin-brouwer.github.io/QR-Redirect) but it's easier to type

## Credits
* The decoder used for the QRcode reading is from LazarSoft [https://github.com/LazarSoft/jsqrcode](https://github.com/LazarSoft/jsqrcode)