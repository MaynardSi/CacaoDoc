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
