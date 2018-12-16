import { show as s, hide as h } from "./overlay"

export var selectorModal = "#cd-modal"
export var selectorHeader = "#cd-modal .cd-header"
export var selectorContent = "#cd-modal .cd-content"
export var selectorFooter = "#cd-modal .cd-footer"

export function show() {
    s(selectorModal)
}
export function hide() {
    h(selectorModal)
}

export function header() {
    return $(selectorHeader)
}
export function content() {
    return $(selectorContent)
}
export function footer() {
    return $(selectorFooter)
}

export function popup(contentTxt: string, titleTxt: string = "Results") {
    header().text(titleTxt)
    content().text(contentTxt)
    show()
}