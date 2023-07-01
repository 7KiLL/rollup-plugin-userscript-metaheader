import {UserScriptHeaderOptions} from "../types/user-script-header-options";
import {resolveArrayOption, resolveBaseOption, resolveObjectOption} from "./option-resolvers";

export function buildUserScriptOptions(headers: UserScriptHeaderOptions): string {
    const meta: string[] = [];
    Object.entries(headers).map(([key, value]) => {
        if (Array.isArray(value)) {
            meta.push(...resolveArrayOption(key, value));
            return;
        }
        if (typeof value === 'object') {
            meta.push(...resolveObjectOption(key, value))
            return;
        }
        meta.push(resolveBaseOption(key, value))
    });
    return meta.join("\n")
}