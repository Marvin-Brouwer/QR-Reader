class DropHelper {
    public static supportsFileDrop(): boolean {
        return !!(<any>window).FileReader;
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