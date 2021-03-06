(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.osm = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{".":3,"./utils":7}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const overlay = require("./overlay");
exports.overlay = overlay;
const loading = require("./loading");
exports.loading = loading;
const modal = require("./modal");
exports.modal = modal;
const cam = require("./cam");
exports.cam = cam;
const cacaodoc = require("./cacaodoc");
exports.cacaodoc = cacaodoc;

},{"./cacaodoc":1,"./cam":2,"./loading":4,"./modal":5,"./overlay":6}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const overlay_1 = require("./overlay");
exports.selector = "#cd-loading";
function show() {
    overlay_1.show(exports.selector);
}
exports.show = show;
function hide() {
    overlay_1.hide(exports.selector);
}
exports.hide = hide;

},{"./overlay":6}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const overlay_1 = require("./overlay");
exports.selectorModal = "#cd-modal";
exports.selectorHeader = "#cd-modal .cd-header";
exports.selectorContent = "#cd-modal .cd-content";
exports.selectorFooter = "#cd-modal .cd-footer";
function show() {
    overlay_1.show(exports.selectorModal);
}
exports.show = show;
function hide() {
    overlay_1.hide(exports.selectorModal);
}
exports.hide = hide;
function header() {
    return $(exports.selectorHeader);
}
exports.header = header;
function content() {
    return $(exports.selectorContent);
}
exports.content = content;
function footer() {
    return $(exports.selectorFooter);
}
exports.footer = footer;
function popup(contentTxt, titleTxt = "Results") {
    header().text(titleTxt);
    content().text(contentTxt);
    show();
}
exports.popup = popup;

},{"./overlay":6}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hideElement(e) {
    e.css("height", "0%");
}
exports.hideElement = hideElement;
function showElement(e) {
    e.css("height", "100%");
}
exports.showElement = showElement;
function hide(...selectors) {
    for (var selector of selectors)
        hideElement($(selector));
}
exports.hide = hide;
function show(...selectors) {
    for (var selector of selectors)
        showElement($(selector));
}
exports.show = show;
exports.overlaySelector = ".cd-overlay";
function hideAll() {
    hide(exports.overlaySelector);
}
exports.hideAll = hideAll;
function showAll() {
    show(exports.overlaySelector);
}
exports.showAll = showAll;
function hideOnly(...selectors) {
    showAll();
    hide(...selectors);
}
exports.hideOnly = hideOnly;
function showOnly(...selectors) {
    hideAll();
    show(...selectors);
}
exports.showOnly = showOnly;

},{}],7:[function(require,module,exports){
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
function toCanvas(video, scale = 1) {
    var canvas = document.createElement("canvas");
    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas;
}
exports.toCanvas = toCanvas;
function toBlob(canvas, scale = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            canvas.toBlob(resolve);
        });
    });
}
exports.toBlob = toBlob;

},{}]},{},[3])(3)
});
