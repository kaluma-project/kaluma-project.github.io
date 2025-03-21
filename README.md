https://kalumajs.org

## Setup

```sh
# Use node.js version 16.x.
$ git clone https://github.com/kaluma-project/kaluma-project.github.io.git
$ cd kaluma-project.github.io
$ npm install
```

## Run local server

```sh
$ npm run dev
# Open browser with url: http://localhost:8000/
```

## Update API Docs

Update files at `src/markdown-pages`.

## Add a package

Add `<new-package>.json` to `src/packages`.

## Deploy

__DO NOT DEPLOY IF YOU ARE NOT THE MAINTAINER__

```sh
$ npm run deploy
```