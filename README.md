# Rollup Plugin Userscript Meta Header
This Rollup plugin allows you to automatically add a UserScript meta header to your output bundle. The meta header is configurable and easy to customize according to your needs.

## Installation
Install the plugin with `npm`:
```shell
npm install rollup-plugin-userscript-metaheader
```
or other: 
```shell
yarn add rollup-plugin-userscript-metaheader
pnpm add rollup-plugin-userscript-metaheader
```

## Usage
To use the plugin, add it to your `rollup.config.js` file:
```javascript
import { userScriptPlugin } from 'rollup-plugin-userscript-metaheader';

export default {
    input: 'src/main.js',
    output: {
        file: 'dist/bundle.js',
        format: 'iife'
    },
    plugins: [
        userScriptPlugin({
            headers: {
                name: "My UserScript",
                namespace: "http://mywebsite.com",
                version: "1.0",
                description: "This is a description of my userscript.",
                // Use array for multiple values
                match: ["http://example.com/*", "http://example.org/*"],
                // Use object for key-value pairs
                grant: {
                    GM_getValue: true,
                    GM_setValue: true
                }
            }
        })
    ]
}
```
The `userScriptPlugin` function takes a single argument, an options object, which contains the UserScript headers.

The keys of the `headers` object represent the UserScript meta tags. The value can be a string, a number, a boolean, an array of strings, or an object for key-value pairs, based on header you are using.

If the value is a boolean and set to true, the meta tag will be included with no value.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing
Please read CONTRIBUTING.md for details.

## Contact
If you have any questions, feel free to contact me.




