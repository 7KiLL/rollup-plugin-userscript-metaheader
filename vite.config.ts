import {defineConfig} from "vite";
import {resolve} from "path";
import {typescriptPaths} from "rollup-plugin-typescript-paths";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
    resolve: {
        alias: [
            {
                find: "~",
                replacement: resolve(__dirname, "./src"),
            },
        ],
    },
    build: {
        sourcemap: true,
        manifest: true,
        minify: true,
        reportCompressedSize: true,
        lib: {
            name: "VsRec",
            fileName: "main",
            entry: resolve(__dirname, 'src/main.ts'),
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            external: [],
            plugins: [
                typescriptPaths({
                    preserveExtensions: true,
                }),
                typescript({
                    sourceMap: false,
                    declaration: true,
                    outDir: "dist",
                }),
            ],
        },
    },
})