class CookieHelper {
    public static getCookie(name: string): string {
        let nameEq = `${name}=`;
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEq) === 0) return c.substring(nameEq.length, c.length);
        }
        return null;
    }
    public static setCookie(name: string, value: any, expires: Date = null, secure: boolean = true): void {
        let expiryDate = String();
        if (expires) {
            expiryDate = `; expires=${expires.toUTCString()}`;
        }
        document.cookie = `${name}=${value.toString()}${expiryDate}${secure ? '; secure' : String()}; path=/`;
    }
    public static eraseCookie(name: string): void {
        CookieHelper.setCookie(name, String());
    }
}