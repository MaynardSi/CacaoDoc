"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoSelector = "#video";
function elem() {
    return $(exports.videoSelector).get(0);
}
exports.elem = elem;
const DEFAULT_VIDEO_OPTS = {
    facingMode: "environment"
};
function connectToCamera(videOpts = DEFAULT_VIDEO_OPTS) {
    var vid = elem();
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: videOpts
        }).then(stream => {
            vid.srcObject = stream;
            vid.play();
        });
    }
    return vid;
}
function play() {
    elem().play();
}
exports.play = play;
function pause() {
    elem().pause();
}
exports.pause = pause;
$(() => {
    connectToCamera();
});
