export function wrapWithUserscriptTag(str: string) {
    return `// ==UserScript==\n${str}\n// ==/UserScript==\n`
}