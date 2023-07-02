/*
Code Analysis

Objective:
The resolveBaseOption function is designed to generate a string option based on a given key and value. It can handle both string and boolean values and formats them accordingly.

Inputs:
- key: a string representing the option key
- value: a string or boolean representing the option value

Flow:
- Check if the value is a boolean
- If it is, return a string with the key and a comment indicating it is a boolean option
- If it is not, return a string with the key, a tab character, and the value, all formatted as a comment

Outputs:
- A string representing the option, formatted as a comment

Additional aspects:
- The function trims the key and value before formatting them
- The function is used by the resolveArrayOption and resolveObjectOption functions to generate options for arrays and objects, respectively.
*/



import {describe, expect, it} from "vitest";
import {resolveArrayOption, resolveBaseOption, resolveObjectOption} from "../src/core/option-resolvers";

describe('resolveBaseOption_function', () => {
    it('test_happy_path_string_value', () => {
        const key = 'key';
        const value = 'value';
        const expected = `// @${key.trim()}	${value.trim()}`;
        const result = resolveBaseOption(key, value);
        expect(result).toBe(expected);
    });

    it('test_happy_path_number_value', () => {
        const key = 'version';
        const value = 1;
        const expected = `// @${key.trim()}	1`;
        const result = resolveBaseOption(key, value);
        expect(result).toBe(expected);
    });
    it('test_happy_path_boolean_value', () => {
        const key = 'key';
        const value = true;
        const expected = `// @${key.trim()}`;
        const result = resolveBaseOption(key, value);
        expect(result).toBe(expected);
    });
    it('test_edge_case_null_key', () => {
        const key = null;
        const value = 'value';
        // @ts-ignore
        expect(() => resolveBaseOption(key, value)).toThrowErrorMatchingSnapshot();
    });
    it('test_edge_case_null_key', () => {
        const key = null;
        const value = 'value';
        // @ts-ignore
        expect(() => resolveBaseOption(key, value)).toThrowErrorMatchingSnapshot()
    });

    it('test_edge_case_numeric_key', function () {
        const key = 1;
        const value = 'any'
        // @ts-ignore
        expect(resolveBaseOption(key, value)).toMatchSnapshot();
    });

    it('test_edge_case_object_key', function () {
        const key = {};
        const value = 'value';
        // @ts-ignore
        expect(() => resolveBaseOption(key, value)).toThrowErrorMatchingSnapshot()
    });

    it('test_edge_case_array_key', function () {
        const key: unknown[] = [];
        const value = 'value';
        // @ts-ignore
        expect(() => resolveBaseOption(key, value)).toThrowErrorMatchingSnapshot()
    });
});

describe('resolveArrayOption_function', () => {
    it('test_empty_values', () => {
        const key = 'key'
        const values: string[] = []
        const expected: string[] = []
        const result = resolveArrayOption(key, values)
        expect(result).toEqual(expected)
    })

    it('test_string_values', () => {
        const key = 'key'
        const values = ['value1', 'value2']
        const expected = ['// @key\tvalue1', '// @key\tvalue2']
        const result = resolveArrayOption(key, values)
        expect(result).toEqual(expected)
    })
    it('test_boolean_values', () => {
        const key = 'key'
        const values = [true, false]
        const expected = ['// @key', '// @key']
        // @ts-ignore
        const result = resolveArrayOption(key, values)
        expect(result).toEqual(expected)
    })

    it('test_null_key', () => {
        const key = null
        const values = ['value1', 'value2']
        // @ts-ignore
        expect(() => resolveArrayOption(key, values)).toThrowErrorMatchingSnapshot()
    })

    it('test_null_values', () => {
        const key = 'key'
        const values = null
        // @ts-ignore
        expect(resolveArrayOption(key, values)).toEqual([])
    })

    it('test_invalid_values', () => {
        const key = 'key'
        const values = [1, 2]
        // @ts-ignore
        expect(resolveArrayOption(key, values)).toEqual(["// @key\t1","// @key\t2"])
    })
})

describe('resolveObjectOption_function', () => {
    it('test_empty_values_object', () => {
        const key = 'test_key';
        const values = {};
        const result = resolveObjectOption(key, values);
        expect(result).toEqual([]);
    });

    it('test_valid_key_and_values_object', () => {
        const key = 'test_key';
        const values = {
            'value1': 'option1',
            'value2': 'option2'
        };
        const result = resolveObjectOption(key, values);
        expect(result).toEqual([
            '// @test_key\tvalue1\toption1',
            '// @test_key\tvalue2\toption2'
        ]);
    });
    it('test_null_key', () => {
        const key = null;
        const values = {
            'value1': 'option1',
            'value2': 'option2'
        };
        // @ts-ignore
        expect(() => resolveObjectOption(key, values)).toThrowErrorMatchingSnapshot();
    });
    it('test_undefined_key', () => {
        const key = undefined;
        const values = {
            'value1': 'option1',
            'value2': 'option2'
        };
        // @ts-ignore
        expect(() => resolveObjectOption(key, values)).toThrowErrorMatchingSnapshot();
    });
    it('test_boolean_object', () => {
        const key = 'key';
        const values = {
            'value1': true,
            'value2': true
        };
        // @ts-ignore
        expect(resolveObjectOption(key, values)).toMatchSnapshot();
    });
    it('test_null_values_object', () => {
        const key = 'test_key';
        const values = null;
        // @ts-ignore
        expect(resolveObjectOption(key, values)).toEqual([]);
    });
    it('test_undefined_values_object', () => {
        const key = 'test_key';
        const values = undefined;
        // @ts-ignore
        expect(resolveObjectOption(key, values)).toEqual([]);
    });
})

