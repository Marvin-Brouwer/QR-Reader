class Html5ImageProcessor implements IImageProcessor {
    private video: HTMLVideoElement;
    public nextFallback(): void { }
    public declinedFallback(): void { }

    public initiate(): void {
        if (!UserMediaHelper.hasGetUserMedia()) {
            this.nextFallback(); return;
        }

        this.buildHtml();
        this.initializeVideo();
        qrcode.callback = this.qrCallback.bind(this);
    }

    public qrCallback(data: string): void {
        (<Application>ioc.ApplicationContext.applicationContext).qrCallback(data, (error: string) => { });
    }

    private buildHtml(): void {
        this.video = document.createElement('video');
        this.video.id = 'mainVideo';
        this.video.muted = true;
        this.video.autoplay = false;
        this.video.loop = true;

        document.body.querySelector('#appBody').appendChild(this.video);
    }

    private initializeVideo(): void {
        let animationFrame = null;
        let doVideoParse = false;
        let thecanvas = document.createElement('canvas');
        let parseVideo = () => {
            if (!doVideoParse) {
                window.clearInterval(animationFrame);
                animationFrame = null;
                this.declinedFallback(); // It's either broke or declined
                return;
            }
            let application = <Application>Application.applicationContext;
            if (application.pauseCapture) return;
            console.log('video parse');
            let context = thecanvas.getContext('2d');
            // draw the video contents into the canvas x, y, width, height
            context.drawImage(this.video, 0, 0, thecanvas.width, thecanvas.height);

            // get the image data from the canvas object
            let dataUrl = thecanvas.toDataURL();
            qrcode.decode(dataUrl);
        };

        UserMediaHelper.getUserMedia(
            { audio: false, video: true },
            (stream: any) => {
                doVideoParse = true;
                this.video.src = window.URL.createObjectURL(stream);
                this.video.play();
                animationFrame = window.setInterval(parseVideo, 200);
            },
            (e: Error) => {
                this.video.style.display = 'none';
                doVideoParse = false;
                if (animationFrame != null) {
                    window.clearInterval(animationFrame);
                    animationFrame = null;
                }
                this.declinedFallback(); // It's either broke or declined
            });

        this.video.style.display = 'block';

    }
}