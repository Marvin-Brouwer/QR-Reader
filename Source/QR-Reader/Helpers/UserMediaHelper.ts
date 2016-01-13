class UserMediaHelper {
    private static hasPolyfill = false;
    public static hasGetUserMedia() {
        if (!this.hasPolyfill) this.setPolyFill();
        return !!(<any>navigator).getUserMedia;
    }
    public static getUserMedia(
        settings: { audio: boolean; video: boolean },
        streamFunc: (stream: any) => void = () => null,
        errorFunc: (e: any) => void = () => null) {
        if (!this.hasPolyfill) this.setPolyFill();
        return !UserMediaHelper.hasGetUserMedia() ? null :
            (<any>navigator).getUserMedia(settings,streamFunc,errorFunc);
    }

    private static setPolyFill() {
        (<any>navigator).getUserMedia =
            (<any>navigator).getUserMedia ||
            (<any>navigator).webkitGetUserMedia ||
            (<any>navigator).mozGetUserMedia ||
            (<any>navigator).msGetUserMedia;
    }
}