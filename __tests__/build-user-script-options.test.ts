/*
Code Analysis

Objective:
The objective of the function is to build a string of metadata options for a user script header, based on the input object containing the header options.

Inputs:
- headers: an object containing the options for a user script header, with keys and values of various types.

Flow:
- Initialize an empty array to store the metadata options.
- Iterate over the entries of the input object.
- If the value of an entry is an array, resolve each value using the resolveArrayOption function and add the resulting options to the metadata array.
- If the value of an entry is an object, resolve each key-value pair using the resolveObjectOption function and add the resulting options to the metadata array.
- If the value of an entry is of any other type, resolve it using the resolveBaseOption function and add the resulting option to the metadata array.
- Join the metadata array into a string with newline separators and return it.

Outputs:
- A string of metadata options for a user script header.

Additional aspects:
- The function uses three helper functions to resolve different types of options: resolveArrayOption, resolveObjectOption, and resolveBaseOption.
- The resolveArrayOption function resolves an array of values for a single key, while the resolveObjectOption function resolves an object of key-value pairs for a single key.
- The resolveBaseOption function resolves a single value for a single key, and handles boolean values differently than string values.
- The function assumes that the input object contains valid options for a user script header, and does not perform any validation or error handling beyond what is provided by the helper functions.
*/


import {describe, expect, it} from "vitest";
import {buildUserScriptOptions} from "../src/core/build-user-script-options";
import {UserScriptHeaderOptions} from "../src/types/user-script-header-options";

describe('buildUserScriptOptions_function', () => {

    // Tests that an empty input returns an empty string
    it('test_empty_input', () => {
        const headers = {};
        // @ts-ignore
        const result = buildUserScriptOptions(headers);
        expect(result).toEqual('');
    });

    // Tests that null and undefined values are handled correctly
    it('test_null_and_undefined_values', () => {
        const headers = {
            name: null,
            namespace: undefined,
            version: '1.0.0',
            description: 'Test',
        };
        expect(() => buildUserScriptOptions(headers)).toThrow();
    });

    // Tests that invalid types for key or value are handled correctly
    it('test_number_types', () => {
        const headers = {
            name: 'Test',
            namespace: 'http://example.com',
            version: 1,
            description: 'Test',
        } satisfies UserScriptHeaderOptions;
        expect(buildUserScriptOptions(headers))
            .toEqual(`// @name\tTest
// @namespace\thttp://example.com
// @version\t1
// @description\tTest`);
    });

    // Tests that boolean values are handled correctly
    it('test_boolean_values', () => {
        const headers = {
            name: 'Test',
            namespace: 'http://example.com',
            version: '1.0.0',
            description: 'Test',
            noframes: true,
        };
        const result = buildUserScriptOptions(headers);
        expect(result).toContain('@noframes');
    });

    // Tests that an empty string key is handled correctly
    it('test_empty_string_key', () => {
        const headers = {
            '': 'Test',
        };
        // @ts-ignore
        expect(() => buildUserScriptOptions(headers)).toThrow();
    });

    // Tests that array values are handled correctly
    it('test_array_values', () => {
        const headers = {
            name: 'Test',
            namespace: 'http://example.com',
            version: '1.0.0',
            description: 'Test',
            require: ['jquery', 'lodash'],
        };
        const result = buildUserScriptOptions(headers);
        expect(result).toContain('@require	jquery');
        expect(result).toContain('@require	lodash');
    });

    // Tests that object values are handled correctly
    it('test_object_values', () => {
        const headers = {
            name: 'Test',
            namespace: 'http://example.com',
            version: '1.0.0',
            description: 'Test',
            resource: {
                'http://example.com/image.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIA...'
            },
        };
        const result = buildUserScriptOptions(headers);
        expect(result).toContain('@resource	http://example.com/image.png	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIA...');
    });

    // Tests that object keys and values are trimmed correctly
    it('test_trim_object_keys_and_values', () => {
        const headers = {
            name: 'Test',
            namespace: 'http://example.com',
            version: '1.0.0',
            description: 'Test',
            resource: {
                '  http://example.com/image.png  ': '  data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIA...  '
            },
        };
        const result = buildUserScriptOptions(headers);
        expect(result).toContain('@resource	http://example.com/image.png	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIA...');
    });

    // Tests that different 'run-at' values are handled correctly
    it('test_different_run_at_values', () => {
        const headers = {
            name: 'Test',
            namespace: 'http://example.com',
            version: '1.0.0',
            description: 'Test',
            'run-at': 'document-start',
        } satisfies UserScriptHeaderOptions;
        const result = buildUserScriptOptions(headers);
        expect(result).toContain('@run-at	document-start');
    });

    // Tests that different 'sandbox' values are handled correctly
    it('test_different_sandbox_values', () => {
        const headers = {
            name: 'Test',
            namespace: 'http://example.com',
            version: '1.0.0',
            description: 'Test',
            sandbox: 'allow-scripts allow-forms',
        };
        const result = buildUserScriptOptions(headers);
        expect(result).toContain('@sandbox	allow-scripts allow-forms');
    });

});
