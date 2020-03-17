[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/daniel-keogh/prof-practice) 

# prof-practice

Y3S2 Professional Practice in IT Project.

## Getting Started

### Requirements

Make sure you have [Node.js](https://nodejs.org/en/) installed on your machine, as well as the Ionic CLI:

```sh
$ npm i -g @ionic/cli
```

Remember to first run `npm install` in both the root, and `backend/` directories if you're working with a fresh clone of the repository.

### Run the Ionic Client

- Run `ionic serve` to open the client application in a web browser.

### Run the Server

- Run `npm run server` to start the server with [nodemon](https://www.npmjs.com/package/nodemon).
It should automatically reload if you change any of the source files.

#### Database

The server currently connects to a local MongoDB database ([see keys.js](./backend/src/config/keys.js)):

```js
module.exports = {
    MONGO_URI: 'mongodb://localhost/fitTrack'
};
```

For the server to run correctly you'll need to [install MongoDB](https://docs.mongodb.com/manual/installation/) and run the `mongod` command. Alternatively, you could replace the above `MONGO_URI` string with a [MongoDB Atlas](https://docs.mongodb.com/guides/cloud/connectionstring/) connection string.

### Concurrently

You can run both the client and the server at the same time, using the below command:

```sh
$ npm run dev
```
