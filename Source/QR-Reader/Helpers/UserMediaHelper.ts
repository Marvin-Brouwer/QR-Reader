// ReSharper disable once InconsistentNaming
declare var MediaStreamTrack: any;

class UserMediaHelper {
    private static hasPolyfill: boolean = false;
    public static hasGetUserMedia(): boolean {
        if (!this.hasPolyfill) this.setPolyFill();
        return this.hasGetMediaDevicesUserMedia() || this.hasGetNavigatorUserMedia();
    }
    public static getUserMedia(
        streamFunc: (stream: any) => void = () => null,
        errorFunc: (e: any) => void = () => null): any {
        if (!this.hasPolyfill) this.setPolyFill();
        if (!UserMediaHelper.hasGetUserMedia()) return null;
        UserMediaHelper.applyFrontCam((frontCam: any) => {
            if (!frontCam) return null;
            if (this.hasGetMediaDevicesUserMedia())
                return (<any>navigator).mediaDevices.getUserMedia(Constants.getCameraSettings(frontCam), streamFunc, errorFunc);
            try {
                return (<any>navigator).getUserMedia(Constants.getLegacyCameraSettings(frontCam), streamFunc, errorFunc);
            } catch (e) {
                // So... aparently chrome doesn't support this yet
                if (e.message.indexOf(TextDefinitions.htmlMalformedConstraints))
                    return (<any>navigator).getUserMedia(Constants.basicCameraSettings, streamFunc, errorFunc);
                throw e;
            }
        });
        return null; // This should never be reached, just pleasing the parser
    }
    public static checkPermissions(): void {
        if (!this.hasPolyfill) this.setPolyFill();
        if (!UserMediaHelper.hasGetUserMedia()) return null;
        if (this.hasGetMediaDevicesUserMedia())
            return (<any>navigator).mediaDevices.getUserMedia(Constants.basicCameraSettings, () => null, () => null);
        return (<any>navigator).getUserMedia(Constants.basicCameraSettings, () => null, () => null);
    }
    private static hasGetNavigatorUserMedia(): boolean {
        if (!this.hasPolyfill) this.setPolyFill();
        return !!(<any>navigator).getUserMedia;
    }
    private static hasGetMediaDevicesUserMedia(): boolean {
        if (!this.hasPolyfill) this.setPolyFill();
        return !!(<any>navigator).mediaDevices.getUserMedia;
    }
    private static setPolyFill(): void {
        (<any>navigator).mediaDevices = (<any>navigator).mediaDevices || {};
        (<any>navigator).mediaDevices.getUserMedia =
            (<any>navigator).mediaDevices.getUserMedia ||
            (<any>navigator).mediaDevices.webkitGetUserMedia ||
            (<any>navigator).mediaDevices.mozGetUserMedia ||
            (<any>navigator).mediaDevices.msGetUserMedia;
        (<any>navigator).getUserMedia =
            (<any>navigator).getUserMedia ||
            (<any>navigator).webkitGetUserMedia ||
            (<any>navigator).mozGetUserMedia ||
            (<any>navigator).msGetUserMedia;
        this.hasPolyfill = true;
    }

    private static applyFrontCam(selectedCallback: (frontCam: any) => void): void {
        if (!MediaStreamTrack || !MediaStreamTrack.getSources) {
            return null;
        } else {
            return MediaStreamTrack.getSources((sourceInfos: IEnumerable<any>) => {
                let videoSource = sourceInfos[sourceInfos.length - 1];

                for (let i = 0; i !== sourceInfos.length; ++i) {
                   let sourceInfo = sourceInfos[i];
                   if (sourceInfo.kind === 'video') {
                        console.log(sourceInfo.id, sourceInfo.label || 'camera');
                        if (sourceInfo.facing.toString().indexOf('environment') > -1)
                            videoSource = sourceInfo.id;
                    }
                }
                selectedCallback(videoSource); // This needs a callback, a return statement doesn't work sadly
            });
        }
    }
}