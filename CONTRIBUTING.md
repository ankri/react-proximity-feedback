## Prerequisites

[Node.js](http://nodejs.org/) >= v4 must be installed.

## Installation

* Running `npm install` in the component's root directory will install everything you need for development.

## Demo Development Server

* `npm start` will run a development server with the component's demo app at [http://localhost:3000](http://localhost:3000) with hot module reloading.

## Running Tests

* `npm run test` Run the jest test in `tests/ProximityFeedback.test.js` once

* `npm run test:coverage` Run the jest test in `tests/ProximityFeedback.test.js` once and create the coverage report

* `npm run test:watch` Run the jest test in `tests/ProximityFeedback.test.js` in watch mode

* `npm run test:cypress` Open the the cypress UI

* `npm run test:cypress:headless` Run the cypress test in [headless mode](https://docs.cypress.io/guides/guides/command-line.html#cypress-run)

## Building

* `npm run build` will build the component for publishing to npm and also bundle the demo app and create the docs folder

* `npm run clean` will delete built resources.
