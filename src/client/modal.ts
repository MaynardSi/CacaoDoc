import { show as s, hide as h } from "./overlay"

export var selectorModal = "#cd-modal"
export var selectorContent = "#cd-modal-content"
export var selectorTitle = "#cd-modal-title"

export function show() {
    s(selectorModal)
}
export function hide() {
    h(selectorModal)
}
export function title() {
    return $(selectorTitle)
}
export function content() {
    return $(selectorContent)
}

export function popup(contentTxt: string, titleTxt: string = "Results") {
    title().text(titleTxt)
    content().text(contentTxt)
    show()
}