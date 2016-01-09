'use-strict';

class DownloadHelper {
    public static presentDownload(fileName: string, extension: string, data: string): void {
        let hiddenElement = document.createElement('a');
        hiddenElement.href = `data:attachment/text,${encodeURI(data)}`;
        hiddenElement.target = '_blank';
        hiddenElement.setAttribute('download', `${fileName} (${new Date().toISOString().slice(0, 10)}).${extension}`);
        hiddenElement.click();
        delete (hiddenElement);
        hiddenElement = null;
    }
}