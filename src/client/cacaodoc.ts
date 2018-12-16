import { loading, modal } from ".";
import { getBlob } from "./utils";

const DEFAULT_VIDEO_OPTS = {
    facingMode: "environment"
}
function videoInit(videoId: string = "video", videOpts: MediaTrackConstraints = DEFAULT_VIDEO_OPTS) {
    var video = <HTMLVideoElement>document.getElementById(videoId);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: videOpts
        }).then(stream => {
            video.srcObject = stream;
            video.play();
        });
    }
    return video
}

interface CacaoDocResponse {
    id: string,
    project: string,
    iteration: string,
    created: Date,
    predictions: {
        probability: number,
        tagId: string,
        tagName: string
    }[]
}
const CACAODOC_SERVICE_URL = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/b559e521-a21e-47d4-bdf5-9b1d8341dacd/image?iterationId=009eeb2c-d9a4-4e1f-8437-6317a8a7fc1d"
const CACAODOC_SERVICE_KEY = "7cb33007f9f54519bf8951289204e30b"
export function query(data: Blob): JQueryPromise<CacaoDocResponse> {
    return $.ajax({
        type: 'POST',
        url: CACAODOC_SERVICE_URL,
        data: data,
        contentType: 'application/octet-stream',
        processData: false,
        headers: {
            "Prediction-Key": CACAODOC_SERVICE_KEY
        }
    }).then((e: CacaoDocResponse) => {
        e.created = new Date(e.created)
        return e
    })
}

$(() => {
    const vid = videoInit()

    vid.onclick = async function () {
        loading.show()
        vid.pause()

        query(await getBlob(vid)).then(e => {
            var pred = e.predictions.sort((a, b) => a.probability - a.probability)
            var max = pred[0]

            switch (max.tagName) {
                case "not":
                    return "No cacao pod detected"
                case "level0":
                    return "The cacao pod is healthy"
                case "level1":
                case "level2":
                    return "The cacao pod is infected but it can still be treated"
                case "level3":
                case "level4":
                case "level5":
                    return "The cacao pod is severly infected, immediate disposal is recommended"
                default: return "If you're seeing this then there is an internal error that occured"
            }
        }).then(message => {
            modal.popup(message)
        }).always(() => {
            loading.hide()
        })
    }
})
