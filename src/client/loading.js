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
