class DropHelper {
    public static supportsFileDrop(): boolean {
        if (DeviceHelper.isMobile()) return false;
        if (!(<any>window).FileReader) return false;
        let div = document.querySelector('div.hide');
        if (!(('draggable' in div) || ('ondragstart' in div && 'ondrop' in div))) return false;
        if (!('files' in DataTransfer.prototype)) return false;
        return true;
    }
    public static attachDropHandler(element: HTMLElement, callback: (file: string) => void): void {
        element.ondragover = (e: DragEvent) => e.preventDefault();
        element.ondrop = (e: DragEvent) => {
            e.preventDefault();
            let file = e.dataTransfer.files[0];
            let reader = new FileReader();

            reader.onload = (event: Event) => {
                console.log(event.target);
                callback((<FileReader>event.target).result);
                // holder.style.background = 'url(' + event.target.result + ') no-repeat center';
            };

            console.log(file);
            reader.readAsDataURL(file);
            return null;
        };
    }
}