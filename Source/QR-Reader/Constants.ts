class Constants{
    public static version = '1.0.0';
    // ReSharper disable once InconsistentNaming
    public static agreedToTOA = `argreedToTOA/V-1`; // update if TOA changes
    public static pdfBase = '';
    public static imageTypes = {
        jpeg : ['FFD8'],
        jpg : ['FFD8'],
        png : ['89504E470D0A1A0A'],
        gif : ['474946'],
        bmp : ['424D'],
        tiff : ['4949', '4D4D']
    };
    // https://gist.github.com/gruber/f7d2a569b3fb51d48a89
    public static invalidUrls = [
        'adclick.g.doubleclick.net', 'addthis.com', 'adgardener.com', 'adnxs.com',
        'ads.pointroll.com', 'ads.shorttail.net', 'apture.com', 'bop.fm', 'cdn.taboolasyndication.com',
        'chartbeat.com', 'chartbeat.net', 'd1.openx.org', 'doubleclick.net', 'doubleverify.com',
        'exitjunction.com', 'fyre.co', 'getconnected.southwestwi-fi.com', 'googleadservices.com',
        'gravity.com', 'grvcdn.com', 'imrworldwide.com', 'intellitxt.com', 'jetpackdigital.com',
        'kontera.com', 'livefyre.com', 'luminate.com', 'meebo.com', 'moovmanage.com', 'outbrain.com',
        'parsely.com', 'po.st', 'pointroll.com', 'pubmatic.com', 'quantserve.com', 's.ppjol.net',
        'scorecardresearch.com', 'serving-sys.com', 'sharethis.com', 'snap.com', 'superclick.com',
        'taboola.com', 'taboolasyndication.com', 'tynt.com', 'wibiya.com'
    ];
    https://commons.wikimedia.org/wiki/File:Transparent.gif
    public static transparentGif = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
}