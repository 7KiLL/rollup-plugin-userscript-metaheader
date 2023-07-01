import {Plugin} from "vite";
import {buildUserScriptOptions} from "./build-user-script-options";
import {wrapWithUserscriptTag} from "./wrap-with-userscript-tag";
import {UserScriptPluginOptions} from "../types/user-script-plugin-options";

export function userScriptPlugin(options: UserScriptPluginOptions): Plugin {
    const userScriptOptionsString = buildUserScriptOptions(options.headers);
    const userScriptConfig = wrapWithUserscriptTag(userScriptOptionsString);
    return {
        name: 'add-userscript-metaheader',
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