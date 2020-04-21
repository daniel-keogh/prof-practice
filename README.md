[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/daniel-keogh/prof-practice) 

# prof-practice

Y3S2 Professional Practice in IT Project.

## Getting Started

### Requirements

Make sure you have [Node.js](https://nodejs.org/en/) installed on your machine, as well as the Ionic CLI:

```sh
$ npm i -g @ionic/cli
```

Remember to first run `npm install` in both the root, and `backend/` directories if you're working with a fresh clone of the repository:

```console
user@host:~/prof-practice$ npm install

user@host:~/prof-practice$ cd backend/
user@host:~/prof-practice/backend$ npm install
```

### Run Concurrently

You can run both the client and the server at the same time, using the below command:

```sh
$ npm run dev
```

You could alternatively run the client or server individually, as follows.
Note that all these commands should be run from the root of the repository.

#### Run the Ionic Client

- Run `ionic serve` to open the client application in a web browser.

#### Run the Server

- Run `npm run server` to start the server with [nodemon](https://www.npmjs.com/package/nodemon).
It should automatically reload if you change any of the source files.

## Running on a Device

**_Note:_** Full details on building for a device, including the setup requirements are on the [Capacitor](https://capacitor.ionicframework.com/docs/getting-started/dependencies) website.

The Android and iOS projects are located in the `android/` and `ios/` directories respectively. To run the app on one of these platforms you first need to build the app by running `ionic build`. Then you can run either of the following commands to open the native Android or iOS project in the standard IDE for that platform (Xcode for iOS, or Android Studio for Android).

```sh
$ npx cap open ios
$ npx cap open android
```

### Rebuilding

Any time you run `ionic build` you'll need to run `npx cap copy` afterwards in order to copy the built changes into the native project folders.
