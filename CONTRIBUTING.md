## Prerequisites

[Node.js](http://nodejs.org/) >= v4 must be installed.

## Installation

* Running `npm install` in the component's root directory will install everything you need for development.

## Demo Development Server

* `npm start` will run a development server with the component's demo app at [http://localhost:3000](http://localhost:3000) with hot module reloading.

## Running Tests

* `npm test` will start the cypress UI.

* `npm run test:headless` will run cypress in [headless mode](https://docs.cypress.io/guides/guides/command-line.html#cypress-run).

## Building

* `npm run build` will build the component for publishing to npm and also bundle the demo app.

* `npm run clean` will delete built resources.
