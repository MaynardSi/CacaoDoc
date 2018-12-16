import { show as s, hide as h } from "./overlay"

export var selector = "#cd-loading"
export function show() {
    s(selector)
}
export function hide() {
    h(selector)
}