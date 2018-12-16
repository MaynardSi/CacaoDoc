export function hideElement(e: JQuery<HTMLElement>) {
    e.css("height", "0%")
}
export function showElement(e: JQuery<HTMLElement>) {
    e.css("height", "100%")
}

export function hide(...selectors: string[]) {
    for (var selector of selectors)
        hideElement($(selector))
}
export function show(...selectors: string[]) {
    for (var selector of selectors)
        showElement($(selector))
}

export var overlaySelector = ".cd-overlay"
export function hideAll() {
    hide(overlaySelector)
}
export function showAll() {
    show(overlaySelector)
}

export function hideOnly(...selectors: string[]) {
    showAll()
    hide(...selectors)
}
export function showOnly(...selectors: string[]) {
    hideAll()
    show(...selectors)
}
