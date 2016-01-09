'use-strict';

class DeviceHelper {
    public static isTouchEnabled() : boolean {
        return !!('ontouchstart' in window || 'onmsgesturechange' in window);
    }
}