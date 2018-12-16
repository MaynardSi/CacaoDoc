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
