class DeviceHelper {
    public static isTouchEnabled(): boolean {
        return !!('ontouchstart' in window || 'onmsgesturechange' in window);
    }
    public static isMobile(): boolean {
        let detector = <any>document.querySelector('#mobileDetector');
        return (detector.currentStyle ? detector.currentStyle.display :
            getComputedStyle(detector, null).display) === 'none';
    }
}