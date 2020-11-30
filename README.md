# Rua Pattern Library

## Table of Contents

  1. [Installation](#installation)
  1. [Development](#development)
  1. [Usage](#usage)

## Installation

````bash
npm install
````

@todo Register to npm.js so we can run

````bash
npm install rua-pattern-library
````

## Development

```bash
npm run watch
```
or
```bash
gulp watch
```
Your default browser should open to `localhost:3000` or increment to the next available port.

Note: on first run you may get an error `cannot GET /`.  Try running `npm run build` then watch again.

## Build

```bash
npm run build
```
or
```bash
gulp
```

## Contributing

To update this repo, create a PR with **just the src changes** (not dist/ or docs/). Once the changes have been merged, create a commit "Dist and docs" on master and tag with latest version number.

## Usage

```scss
@import '~rua-pattern-library/src/rua';
```

```js
// Optionally set window.dataTargetNamespace to a custom value (e.g. 'rua-' would mean you'd use `data-rua-toggle="..."`)

import {
    toggler,
    matchHeight,
    clipboard,
    tooltip
} from 'rua-pattern-library/src/9-plugins'

$(document).ready(function(){
    matchHeight()
    toggler()
    clipboard()
    tooltip()
})
```
