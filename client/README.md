# TypeFast Client

# Requirements

* [Node.js](https://nodejs.org/) 6.0.0+

# Install

**Before getting started with client side development, make sure to have the [Server](../server/README.md) setup and running and the [SDK](../sdk/README.md).**

### Install Dependencies

    npm install

### Generate Definitions

When using our Graph API or SDKs you have to declare in advance which fields you are wanting to access on the object. One of the simplifications TypeFast makes is by statically analysing the code that has been written, we can work this out and seamlessly get the fields you need.

Generate these definitions:

    npm run definition-generation

### Build

    npm run build

# Run

Once the TypeFast server is running, you can access the client via https://localhost:8080. Make sure that the domain you are using matches one of the *App Domains* in your [app manager](https://developers.facebook.com/apps/) (under settings).

### From source - Reloading on file changes

TypeFast uses webpack to package and transpile all the JSX files and ES6 javascript into a single file. When developing on the UI you can make sure that any changes to the source file are automatically recompiled by running the following commands from the client directory root:

```
  npm run dev
```

# Development Notes

The client side is all built using Redux and React Bootstrap. Redux means the app has a uni directional data flow. Components trigger actions -> actions trigger state changes -> and state changes update components. Read up on Redux to understand more about how the app is architected.

http://redux.js.org/

# License

This software is released under the [Facebook Platform License](https://github.com/facebook/typefast/blob/master/LICENSE).
