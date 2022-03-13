# Weather Traveler

Simple React-based web app for living vicariously through the weather conditions in far-flung locations.

## Created By:

  _Tim Roth_

## Project Activity Log

  * 1/29: Basic research: pre-build mental mapping and design ( 1 hour )
  * 1/30: 8 AM – 9 AM Project scaffolding and continued basic research ( 1 hour )
  * 1/30: 6 PM - 8 PM More research on APIs, building UI features and basic project scaffolding continued
  * 2/2: 7 PM - 8 PM Write project proposal and flesh out MVP and Stretch Goals
  * 2/12: 5:45 PM – 10:15 PM Create basic app functionality and research UI libraries and tools for making the feelings side come to life via CSS magic


[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

## Table of Contents

1. [Before Starting](#before-starting)
1. [Getting Started](#getting-started)
1. [Gotchas](#gotchas)
1. [Config Files](#config-files)
1. [Application Structure](#application-structure)
1. [Development](#development)
   1. [Routing](#routing)
1. [Configuration](#configuration)
1. [Production](#production)
1. [Deployment](#deployment)

## Requirements

- node `^14.15.0`
- npm `^6.0.0`


## Before Starting
1. Make sure you have `firebase-tools` installed an you are logged in (`firebase login`)
1. Create a project within the Firebase Console (or have one prepared to use)
1. Confirm billing is enabled for your project
1. Confirm [Firebase Hosting API](https://console.cloud.google.com/apis/library/firebasehosting.googleapis.com) is enabled for your project

## Getting Started

1. Install app and functions dependencies: `yarn install && yarn install --cwd functions`
1. Create a `.env` file which has `GCLOUD_PROJECT` set within it, for example:

    ```
    GCLOUD_PROJECT="some-project"

    ```
1. Start Development server: `npm start`

While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

| `npm run <script>`   | Description                                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `start`             | Serves your app at `localhost:3000` with automatic refreshing and hot module replacement                                |
| `start:dist`        | Builds the application to `./build` then serves at `localhost:3000` using firebase hosting emulator                     |
| `start:emulate`     | Same as `start`, but pointed to database emulators (make sure to call `emulators` first to boot up emulators)           |
| `build`             | Builds the application to `./build`                                                                                     |
| `test`              | Runs unit tests with Jest. See [testing](#testing)                                                                      |
| `test:watch`        | Runs `test` in watch mode to re-run tests when changed                                                                  |
| `lint`              | [Lints](http://stackoverflow.com/questions/8503559/what-is-linting) the project for potential errors                    |
| `lint:fix`          | Lints the project and [fixes all correctable errors](http://eslint.org/docs/user-guide/command-line-interface.html#fix) |

[Husky](https://github.com/typicode/husky) is used to enable `prepush` hook capability. The `prepush` script currently runs `eslint`, which will keep you from pushing if there is any lint within your code. If you would like to disable this, remove the `prepush` script from the `package.json`.

## Gotchas
* Preview Channels are only for hosting - functions changes will not be included (functions will point to your default project)
* UI Tests run in verify workflow use emulators (including functions)

## Config Files

There are multiple configuration files:

- Firebase Project Configuration - `.firebaserc`
- Project Configuration - `config` (file names match branch and environment names)
- Local Project Configuration Override - `.env`
- Local Cloud Functions Configuration - `functions/.runtimeconfig.json`

More details in the [Application Structure Section](#application-structure)

## Application Structure

The application structure presented in this boilerplate is **fractal**, where functionality is grouped primarily by feature rather than file type. Please note, however, that this structure is only meant to serve as a guide, it is by no means prescriptive. That said, it aims to represent generally accepted guidelines and patterns for building scalable applications.

```
├── .github                      # All Github configuration
│   ├── workflows                # Github Actions CI Workflows
│   │  ├── deploy.yml            # Deploy workflow (deploys when pushing to specific branches)
│   │  └── verify.yml            # Paths for application routes
│   └── PULL_REQUEST_TEMPLATE.md # Main HTML page container for app
├── bin                          # Scripts used by npm scripts and CI config
├── config                       # Configuration files (loaded by node-config)
├── functions                    # Cloud Functions
│   ├── src                      # Cloud Functions Source code (each folder represents a function)
│   ├── .runtimeconfig.json      # Cloud Functions local configuration
│   └── index.js                 # Mount point of Cloud Functions (loads functions by name)
├── public                       # All build-related configuration
│   └── index.html               # Main HTML page container for app
├── src                          # Application source code
│   ├── components               # Global Reusable Presentational Components
│   ├── constants                # Project constants such as firebase paths and form names
│   │  ├── firebasePaths.js      # Paths within Firebase (i.e. Collections + Sub-Collections)
│   │  └── paths.js              # Paths for application routes
│   ├── containers               # Global Reusable Container Components
│   ├── layouts                  # Components that dictate major page structure
│   │   └── CoreLayout           # Global application layout in which routes are rendered
│   ├── routes                   # Main route definitions and async split points
│   │   ├── index.js             # Bootstrap main application routes
│   │   └── Home                 # Fractal route
│   │       ├── index.js         # Route definitions and async split points
│   │       ├── components       # Presentational React Components
│   │       └── routes/**        # Fractal sub-routes (** optional)
│   └── utils                    # General Utilities (used throughout application)
│       ├── form.js              # Utilities for forms (validation)
│       └── router.js            # Utilities for routing such as those that redirect back to home if not logged in
├── .env                         # Local Environment settings (automatically loaded up by npm scripts)
├── .eslintignore                # ESLint ignore file
├── .eslintrc.js                 # ESLint configuration
├── .firebaserc                  # Firebase Project configuration settings (including ci settings)
├── database.rules.json          # Rules for Firebase Real Time Database
├── firebase.json                # Firebase Service settings (Hosting, Functions, etc)
├── firestore.indexes.json       # Indexes for Cloud Firestore
├── firestore.rules              # Rules for Cloud Firestore
└── storage.rules                # Rules for Cloud Storage For Firebase
```

## Routing

We use `react-router-dom` [route matching](https://reacttraining.com/react-router/web/guides/basic-components/route-matching) (`<route>/index.js`) to define units of logic within our application. The application routes are defined within `src/routes/index.js`, which loads route settings which live in each route's `index.js`. The component with the suffix `Page` is the top level component of each route (i.e. `HomePage` is the top level component for `Home` route).

There are two types of routes definitions:

### Sync Routes

The most simple way to define a route is a simple object with `path` and `component`:

_src/routes/Home/index.js_

```js
import HomePage from "./components/HomePage";

// Sync route definition
export default {
  path: "/",
  component: HomePage,
};
```

### Async Routes

Routes can also be seperated into their own bundles which are only loaded when visiting that route, which helps decrease the size of your main application bundle. Routes that are loaded asynchronously are defined using `loadable` function which uses `React.lazy` and `React.Suspense`:

_src/routes/NotFound/index.js_

```js
import loadable from "utils/components";

// Async route definition
export default {
  path: "*",
  component: loadable(() =>
    import(/* webpackChunkName: 'NotFound' */ "./components/NotFoundPage")
  ),
};
```

With this setting, the name of the file (called a "chunk") is defined as part of the code as well as a loading spinner showing while the bundle file is loading.

More about how routing works is available in [the react-router-dom docs](https://reacttraining.com/react-router/web/guides/quick-start).
## Deployment

Build code before deployment by running `npm run build`. There are multiple options below for types of deployment, if you are unsure, checkout the Firebase section.

Before starting make sure to install Firebase Command Line Tool: `npm i -g firebase-tools`

#### Manual deploy

1. Run `firebase:login`
1. Initialize project with `firebase init` then answer:
   - What file should be used for Database Rules? -> `database.rules.json`
   - What do you want to use as your public directory? -> `build`
   - Configure as a single-page app (rewrite all urls to /index.html)? -> `Yes`
   - What Firebase project do you want to associate as default? -> **your Firebase project name**
1. Build Project: `npm build`
1. Confirm Firebase config by running locally: `yarn emulators:hosting`
1. Deploy to Firebase (everything including Hosting and Functions): `firebase deploy`

**NOTE:** You can use `yarn emulators:hosting` to test how your application will work when deployed to Firebase, but make sure you run `npm build` first.

## FAQ

1. Why node `14` instead of a newer version?

[Cloud Functions runtime runs on `14`](https://cloud.google.com/functions/docs/concepts/nodejs-runtime), which is why that is what is used for the CI build version.


[license-image]: https://img.shields.io/github/license/phantomcurve/weather-traveler?style=flat-square
[license-url]: https://github.com/phantomcurve/weather-traveler/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
