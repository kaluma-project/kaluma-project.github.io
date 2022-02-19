---
layout: "doc.njk"
title: "IDE"
tags: "docs"
---

# Web IDE

## Introduction

[Kaluma IDE](https://kaluma.io/ide) is a web-based code editor which allows you to edit code in a web browser. Kaluma IDE works with web browsers supporting Web Serial API including Google Chrome and Microsoft Edge (or other browsers with [Kaluma Agent](https://kaluma.io/agent)).

The main features are:

* A sophisticated web-based code editor
* Provide cloud-based free public repositories
* Automatic code bundling with Webpack
* Support code linting based on ESLint
* Project release management (publish and import reusable packages)
* Support project fork

![Kaluma IDE](<.gitbook/assets/스크린샷 2021-03-17 오후 9.30.06.png>)

## Connect Device

You can find connected boards by clicking at the device select dropdown in the top-right area. To connect a device, click the device select dropdown and select a port where your device is connected in the dialog showing a list of serial ports.

> If your device is not detected in your browser, please check below:
> 
> * Check whether your browser supports [Web Serial API](https://developer.mozilla.org/en-US/docs/Web/API/Web\_Serial\_API) or not? (recommend Chrome or Edge)
> * Still not detected even with Chrome or Edge, install [Kaluma Agent](https://kaluma.io/agent).

## Code Uploading

To upload your code select **Upload** menu (or "Up-arrow" button in the top area). The entry file (specified in `package.json`'s `main` field. Default is `index.js` . See [Project Configuration](ide.md#project-configuration)) will be uploaded and executed in the connected board. If you want to upload other than the entry file,  open the file to upload in Code Editor and then select **Upload Current** menu.

## Project Configuration

You can configure project with `package.json`

```javascript
{
  "name": "my-project",
  "dependencies": {
    "@niklauslee/ssd1306": "1.0.0"
  },
  "main": "index.js",
  "bundle": {
    "mode": "development"
  }
}
```

* **`name`** `<string>` Project name.
* **`dependencies`** `<Object<string,string>>` Module dependencies with module name and version like `"@owner/package": "1.0.0"`. If you want to bundle the currently working version not a released version, set the version to `"current"` like `"@owner/package": "current"`.
* **`main`** `<string>` The entry point of the module. The file specified by this property is loaded when this module is imported by `require()` form other products. Default: `index.js`.
* **`bundle`** `<object>` Configuration for code bundling.
  * **`mode`** `<string>` Bundling mode is `development` or `production`. In `development` mode, the code is bundled _as-is (not minified)_ so it is readable and and easier to debug. Whereas in `production` mode, the bundled code is minified so it is smaller and faster but not useful for debugging. Default: `development`.

