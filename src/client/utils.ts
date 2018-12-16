export function getBlob(video: HTMLVideoElement, scale = 1) {
    return new Promise<Blob>(resolve => {
        var canvas = document.createElement("canvas");
        canvas.width = video.videoWidth * scale;
        canvas.height = video.videoHeight * scale;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(resolve)
    })
}