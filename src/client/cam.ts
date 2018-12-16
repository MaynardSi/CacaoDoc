export var videoSelector = "#video"
export function elem(): HTMLVideoElement {
    return <HTMLVideoElement>$(videoSelector).get(0)
}

const DEFAULT_VIDEO_OPTS = {
    facingMode: "environment"
}
function connectToCamera(videOpts: MediaTrackConstraints = DEFAULT_VIDEO_OPTS) {
    var vid = elem()
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: videOpts
        }).then(stream => {
            vid.srcObject = stream;
            vid.play();
        });
    }
    return vid
}

export function play() {
    elem().play()
}
export function pause() {
    elem().pause()
}

$(() => {
    connectToCamera()
})