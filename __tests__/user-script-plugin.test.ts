/*
Code Analysis

Objective:
The objective of the userScriptPlugin function is to create a Vite plugin that adds a UserScript meta header to the generated bundle. This meta header contains information about the UserScript, such as its name, version, description, and author.

Inputs:
- options: an object containing the headers for the UserScript meta header.

Flow:
1. The function calls the buildUserScriptOptions function to generate a string of meta header options based on the input headers.
2. The function calls the wrapWithUserscriptTag function to wrap the meta header options string with the UserScript meta header tags.
3. The function returns a Vite plugin object with a generateBundle hook that modifies the generated bundle by adding the UserScript meta header to the entry file's code.

Outputs:
- A Vite plugin object with a generateBundle hook that modifies the generated bundle by adding the UserScript meta header to the entry file's code.

Additional aspects:
- The function uses the buildUserScriptOptions and wrapWithUserscriptTag helper functions to generate and format the UserScript meta header.
- The function throws an error if no entry file is found in the generated bundle.
*/



import {describe, expect, it} from "vitest";
import {userScriptPlugin} from "../src/core/user-script-plugin";
import {UserScriptPluginOptions} from "../src/types/user-script-plugin-options";

describe('userScriptPlugin_function', () => {

    // Tests that the function returns a plugin with the correct name
    it('test_returns_plugin_with_correct_name', () => {
        const options = {
            headers: {}
        };
        // @ts-ignore
        const plugin = userScriptPlugin(options);
        expect(plugin.name).toBe('add-userscript-metaheader');
    });


    // Tests that the function appends the user script config to the code correctly
    it('test_appends_user_script_config_to_code_correctly', () => {
        const options = {
            headers: {
                name: 'Test',
                version: '1.0.0',
                description: 'Test description',
                author: 'Test author',
                match: 'https://example.com/*',
                namespace: 'test'
            }
        } satisfies UserScriptPluginOptions;
        const plugin = userScriptPlugin(options);
        const bundle = {
            'file.js': {
                isEntry: true,
                code: 'console.log("Hello, world!");'
            }
        };
        // @ts-ignore
        plugin.generateBundle({}, bundle);
        const expected = '// ==UserScript==\n// @name\tTest\n// @version\t1.0.0\n// @description\tTest description\n// @author\tTest author\n// @match\thttps://example.com/*\n// @namespace\ttest\n// ==/UserScript==\nconsole.log("Hello, world!");';
        expect(bundle['file.js'].code).toBe(expected);
    });

    // Tests that the function throws an error when no entry file is found
    it('test_throws_error_when_no_entry_file_found', () => {
        const options = {
            headers: {
                name: 'Test',
                version: '1.0.0',
                description: 'Test description',
                author: 'Test author',
                match: 'https://example.com/*',
                namespace: 'test'
            }
        } satisfies UserScriptPluginOptions;
        const plugin = userScriptPlugin(options);
        const bundle = {};
        // @ts-ignore
        expect(() => plugin.generateBundle({}, bundle)).toThrow('No entry file found');
    });

});
