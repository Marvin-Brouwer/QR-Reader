class TextDefinitions {
    public static errorOccured: string = `An error occured while`;

    public static showOnGoogleMaps: string = `Show on Google maps`;
    public static blankLinkTarget: string = `_blank`;
    public static selfLinkTarget: string = `_self`;
    public static notSupportedDescription: string = `You've scanned a QR-Code containing a raw file wich is not supported (yet).`;
    public static uploadImageProcessorTitle: string = `Tap to select<wbr/> <span class="no-break">QR-Code</span>`;

    public static imageReadError: string = `${TextDefinitions.errorOccured} reading the image!`;
    public static pdfReadError: string = `${TextDefinitions.errorOccured} reading the pdf!`;
    public static codeReadingErrorMessage: string = `${TextDefinitions.errorOccured} decoding the QR-Code`;
    public static rawFileError: string = `Not supported!`;
    public static blacklistedUrlError: string = `Warning the url you've scanned is part of our blacklist!`;
    public static dataProcessorMissingError: string = `The processor for this dataType is missing!`;
    public static noDefaultImageProcessorError: string =
        `You need to set a default processor before instantiating, \n` +
        `use: setDefaultImageProcessor(defaultImageProcessor: IImageProcessor)`;

    public static libraryCodeReadError: string = `error decoding QR Code`;

    public static getRawFileTitle(fileType: string): string { return `Raw file: ${fileType}`; }

    public static getImageTypeError(imageType: string): string { return `The image of type '${imageType}' is not supported!`; }
}