class UserMediaHelper {
    private static hasPolyfill: boolean = false;
    public static hasGetUserMedia(): boolean {
        if (!this.hasPolyfill) this.setPolyFill();
        return !!(<any>navigator).getUserMedia;
    }
    public static getUserMedia(
        settings: { audio: boolean; video: boolean },
        streamFunc: (stream: any) => void = () => null,
        errorFunc: (e: any) => void = () => null): any {
        if (!this.hasPolyfill) this.setPolyFill();
        return !UserMediaHelper.hasGetUserMedia() ? null :
            (<any>navigator).getUserMedia(settings, streamFunc, errorFunc);
    }

    private static setPolyFill(): void {
        (<any>navigator).getUserMedia =
            (<any>navigator).getUserMedia ||
            (<any>navigator).webkitGetUserMedia ||
            (<any>navigator).mozGetUserMedia ||
            (<any>navigator).msGetUserMedia;
    }
}