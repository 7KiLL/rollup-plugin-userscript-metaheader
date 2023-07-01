import {Plugin} from 'vite'
function wrapWithUserscriptTag(str: string) {
    return `// ==UserScript==\n${str}\n// ==/UserScript==\n`
}

/**
 * Test comment here
 */
export type UserScriptType = {
    [key: string]: string[]|string
}
function prepareUserscriptOption(key: string, value: string): string {
    return `// @${key.trim()} ${value.trim()}`
}
function buildUserScriptOptions(options: UserScriptType): string {
    const optionsArray: string[] = [];
    for (const key in options) {
        if (Array.isArray(options[key])) {
            for (const value of options[key]) {
                optionsArray.push(prepareUserscriptOption(key, value))
            }
            continue;
        }
        optionsArray.push(prepareUserscriptOption(key, options[key] as string))
    }

    return optionsArray.join("\n")
}
function userScriptPlugin(options: UserScriptType): Plugin {
    const userScriptOptionsString = buildUserScriptOptions(options);
    const userScriptConfig = wrapWithUserscriptTag(userScriptOptionsString);
    return {
        name: 'transform-file',
        generateBundle(_options, bundle) {
            let file;
            for (const fileName in bundle) {
                const chunk = bundle[fileName];
                if ('isEntry' in chunk && chunk.isEntry) {
                    file = chunk
                    break;
                }
            }

            if (file && 'code' in file) {
                file.code = userScriptConfig + file.code;
            }
        }
    }
}

export {userScriptPlugin};
