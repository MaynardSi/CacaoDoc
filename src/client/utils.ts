export function toCanvas(video: HTMLVideoElement, scale = 1) {
    var canvas = document.createElement("canvas");
    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas
}
export async function toBlob(canvas: HTMLCanvasElement, scale = 1) {
    return new Promise<Blob>(resolve => {
        canvas.toBlob(resolve)
    })
}