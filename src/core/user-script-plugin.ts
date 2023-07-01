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
            const file = Object.values(bundle).find(chunk => 'isEntry' in chunk && chunk.isEntry);
            if (!file || !('code' in file)) {
                throw new Error('No entry file found');
            }
            file.code = userScriptConfig + file.code;
        }
    }
}