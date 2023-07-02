export function resolveArrayOption(key: string, values: string[]): string[] {
    if (!values || values.length === 0) {
        return [];
    }
    
    if (!key) {
        throw new Error("Input 'key' cannot be an empty string");
    }
    
    return values.map(value => resolveBaseOption(key, value));
}

export function resolveObjectOption(key: string, values: {[key: string]: string|boolean}) {
    if (!values || Object.keys(values).length === 0) {
        return [];
    }
    
    const options = Object.entries(values).reduce((acc, [objKey, objVal]) => {
        let value;
        if (typeof objVal === 'boolean') {
            value = objKey.trim();
        } else {
            value = `${objKey.trim()}\t${objVal.trim()}`;
        }
        const option = resolveBaseOption(key, value);
        acc.push(option);
        return acc;
    }, [] as string[]);
    
    return options;
}

export function resolveBaseOption(key: string, value: string | boolean | number): string {
    if (!key) {
        throw new Error("Key cannot be null, undefined or an empty string");
    }
    if (value === null || value === undefined) {
        throw new Error("Value cannot be null or undefined");
    }
    if (!['string', 'number'].includes(typeof key)) {
        throw new Error("Invalid type for key. Only string, and number are accepted");
    }
    if (typeof value === 'boolean') {
        return `// @${key.toString().trim()}`
    }
    return `// @${key.toString().trim()}\t${value.toString().trim()}`
}