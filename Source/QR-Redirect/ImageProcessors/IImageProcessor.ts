'use strict';

interface IImageProcessor {
    nextFallback: () => void;
    declinedFallback: () => void;
    initiate: () => void;
    qrCallback: (data: string) => void;
}