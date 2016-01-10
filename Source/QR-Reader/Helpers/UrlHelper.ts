class UrlHelper {
    public static redirect(url: string, timeOutError?: () => any): void {
        window.location.replace(url);
        window.location.assign(url);
            if(!!timeOutError)
        window.setTimeout(timeOutError, 2000);
    }
}