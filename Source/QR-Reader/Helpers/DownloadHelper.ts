class DownloadHelper {
    public static presentDownload(fileName: string, extension: string, data: string, dataType: string = 'attachment/text'): void {
        let hiddenElement = DownloadHelper.getDownloadElement(fileName, extension, data);
        hiddenElement.click();
        hiddenElement = null;
    }
    public static getDownloadElement(fileName: string, extension: string, data: string, dataType: string = 'attachment/text'): HTMLAnchorElement {
        let downloadAnchor = document.createElement('a');
        downloadAnchor.href = `data:${dataType},${encodeURI(data)}`;
        downloadAnchor.target = '_blank';
        downloadAnchor.setAttribute('download', `${fileName} (${new Date().toISOString().slice(0, 10)}).${extension}`);
        return downloadAnchor;
    }
}