/*
Code Analysis

Objective:
The objective of the "wrapWithUserscriptTag" function is to add the necessary tags to a string in order to turn it into a valid user script.

Inputs:
- "str": a string that represents the content of the user script.

Flow:
1. The function receives a string as input.
2. The function concatenates the input string with the necessary tags to turn it into a valid user script.
3. The function returns the concatenated string.

Outputs:
- A string that represents a valid user script.

Additional aspects:
- The function uses template literals to concatenate the input string with the necessary tags.
- The function assumes that the input string is already a valid user script content and only adds the necessary tags.
*/


import {describe, expect, it} from "vitest";
import {wrapWithUserscriptTag} from "../src/core/wrap-with-userscript-tag";

describe('wrapWithUserscriptTag_function', () => {

    // Tests that the function returns a string starting with the UserScript tag and ending with the closing tag when passed a valid string
    it('test_happy_path', () => {
        const str = 'valid string';
        const expected = '// ==UserScript==\nvalid string\n// ==/UserScript==\n';
        expect(wrapWithUserscriptTag(str)).toEqual(expected);
    });

    // Tests that the function returns a string starting with the UserScript tag and ending with the closing tag when passed a string with special characters
    it('test_edge_case', () => {
        const str = 'string with special characters!@#$%^&*()_+';
        const expected = '// ==UserScript==\nstring with special characters!@#$%^&*()_+\n// ==/UserScript==\n';
        expect(wrapWithUserscriptTag(str)).toEqual(expected);
    });

});
