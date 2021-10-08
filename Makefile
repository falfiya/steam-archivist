esbuild := .\node_modules\.bin\esbuild.cmd

build:
	$(esbuild) src/main.ts --format=cjs --outfile=bin/main.js

run: build
	node bin/main
