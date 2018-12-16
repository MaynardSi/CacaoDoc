"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const utils_1 = require("./utils");
const CACAODOC_SERVICE_URL = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/b559e521-a21e-47d4-bdf5-9b1d8341dacd/image?iterationId=009eeb2c-d9a4-4e1f-8437-6317a8a7fc1d";
const CACAODOC_SERVICE_KEY = "7cb33007f9f54519bf8951289204e30b";
function query(data) {
    return $.ajax({
        type: 'POST',
        url: CACAODOC_SERVICE_URL,
        data: data,
        contentType: 'application/octet-stream',
        processData: false,
        headers: {
            "Prediction-Key": CACAODOC_SERVICE_KEY
        }
    }).then((e) => {
        e.created = new Date(e.created);
        return e;
    });
}
exports.query = query;
$(() => {
    var vid = _1.cam.elem();
    vid.onclick = function () {
        return __awaiter(this, void 0, void 0, function* () {
            _1.loading.show();
            vid.pause();
            var canvas = utils_1.toCanvas(vid);
            query(yield utils_1.toBlob(canvas)).then(e => {
                var pred = e.predictions.sort((a, b) => a.probability - a.probability);
                var max = pred[0];
                switch (max.tagName) {
                    case "not":
                        return "No cacao pod detected";
                    case "level0":
                        return "The cacao pod is healthy";
                    case "level1":
                    case "level2":
                        return "The cacao pod is infected but it can still be treated";
                    case "level3":
                    case "level4":
                    case "level5":
                        return "The cacao pod is severely infected, immediate disposal is recommended";
                    default: return "If you're seeing this then there is an internal error that occured";
                }
            }).then(message => {
                // modal.popup(message)
                _1.modal.header().text("Results");
                _1.modal.content().html(`
            <h1>${message}</h1>
            <img class="image-fluid" src="${canvas.toDataURL()}">
            `);
                _1.modal.show();
            }).always(() => {
                _1.loading.hide();
            }).fail(() => {
                _1.modal.popup("Cannot connect to server", "Error!");
            });
        });
    };
});
