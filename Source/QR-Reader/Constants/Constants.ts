class Constants {
    // ReSharper disable once InconsistentNaming
    public static agreedToTOA: string = `agreedToTOA/V-1`; // Increment if TOA changes
    public static pdfBase: RegExp = /^data:application\/pdf;base64,JVBER/gmi;
    public static imageTypes: any = {
        jpeg: [/^data:image\/jp(e?)g;base64,\/9j\/4/mi],
        jpg: [/^data:image\/jp(e?)g;base64,\/9j\/4/mi],
        png: [/^data:image\/png;base64,iVBOR/mi],
        gif: [/^data:image\/gif;base64,R0lGODlh/mi],
        bmp: [/^data:image\/bmp;base64,Qk/mi]// ,
        // tiff : ['?']
    };
    // https://gist.github.com/gruber/f7d2a569b3fb51d48a89
    public static invalidUrls: IEnumerable<string> = <any>[
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
    // https://commons.wikimedia.org/wiki/File:Transparent.gif
    public static transparentGif: string = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    public static basicCameraSettings: { audio: boolean | Object; video: boolean | Object } = { video: true, audio: false };

    public static getCameraSettings(source: string): { audio: boolean | Object; video: boolean | Object } {
        return { video: { sourceId: source, facingMode: { exact: 'environment' } }, audio: false };
    }
    public static getLegacyCameraSettings(source: string): { audio: boolean | Object; video: boolean | Object } {
        return { video: { sourceId: source }, audio: false };
    }
}