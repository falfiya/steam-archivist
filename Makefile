esbuild := .\node_modules\.bin\esbuild.cmd

run:
	$(esbuild) src/main.ts --format=cjs --outfile=bin/main.js
	node bin/main
