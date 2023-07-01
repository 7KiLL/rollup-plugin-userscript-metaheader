export function resolveArrayOption(key: string, values: string[]): string[] {
    if (!values || values.length === 0) {
        return [];
    }
    
    if (!key) {
        throw new Error("Input 'key' cannot be an empty string");
    }
    
    return values.map(value => resolveBaseOption(key, value));
}

export function resolveObjectOption(key: string, values: {[key: string]: string}) {
    if (!values || Object.keys(values).length === 0) {
        return [];
    }
    
    const options = Object.entries(values).reduce((acc, [objKey, objVal]) => {
        const value = `${objKey.trim()}\t${objVal.trim()}`
        const option = resolveBaseOption(key, value);
        acc.push(option);
        return acc;
    }, [] as string[]);
    
    return options;
}

export function resolveBaseOption(key: string, value: string | boolean | number): string {
    if (key === null || key === undefined || key === '') {
        throw new Error("Key cannot be null or undefined or empty string");
    }
    if (value === null || value === undefined) {
        throw new Error("Value cannot be null or undefined");
    }
    if (!['string', 'boolean', 'number'].includes(typeof key)) {
        throw new Error("Invalid types for key or value");
    }
    if (typeof value === 'boolean') {
        return `// @${key.trim()}`
    }
    return `// @${key.trim()}\t${value.toString().trim()}`
}