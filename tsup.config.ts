/**
 tsup.ts
 one-roster
 
 Created by Ian Thompson on December 1st 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/
import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	outDir: 'dist',
	format: ['cjs', 'esm'], // ← Dual outputs
	dts: true, // ← Generate .d.ts
	sourcemap: true,
	clean: true,
	treeshake: true,
	minify: false, // usually no need to minify internal libs
	splitting: false, // safe & simpler for libs consumed by Node + bundlers
	target: 'es2020',
	// If you want to be explicit:
	cjsInterop: true
});
