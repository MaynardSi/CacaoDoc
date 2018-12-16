"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const overlay_1 = require("./overlay");
exports.selectorModal = "#cd-modal";
exports.selectorContent = "#cd-modal-content";
exports.selectorTitle = "#cd-modal-title";
function show() {
    overlay_1.show(exports.selectorModal);
}
exports.show = show;
function hide() {
    overlay_1.hide(exports.selectorModal);
}
exports.hide = hide;
function title() {
    return $(exports.selectorTitle);
}
exports.title = title;
function content() {
    return $(exports.selectorContent);
}
exports.content = content;
function popup(contentTxt, titleTxt = "Results") {
    title().text(titleTxt);
    content().text(contentTxt);
    show();
}
exports.popup = popup;
