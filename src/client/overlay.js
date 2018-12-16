"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function init() {
    const overlays = $(".overlay");
    overlays.css("height", "0%");
    overlays.css("width", "100%");
    overlays.css("position", "fixed");
    overlays.css("z-index", "1");
    overlays.css("left", "0");
    overlays.css("top", "0");
    overlays.css("overflow-x", "hidden");
    overlays.css("transition", "0.5s");
}
exports.init = init;
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
function hideAll() {
    hide(".overlay");
}
exports.hideAll = hideAll;
function showAll() {
    show(".overlay");
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
$(() => init());
