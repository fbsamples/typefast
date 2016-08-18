#Client Development ReadMe

##Development

**Before getting started with client side development, make sure to have the [Sever](../server/README.md)**

TypeFast use a build tool chain to package and transpile all the JSX files and ES6 javascript into a single file. When developing on the UI you can make sure that any changes to the source file are automatically recompiled by running the following commands from the client directory root:

```
  npm install
  npm run watch
```

##Activating Auto Complete and Optimisations

When using our Graph API or SDKs you have to declare in advance which fields you are wanting to access on the object. One of the simplifications TypeFast makes is by statically analysing the code that has been written, we can work this out and seamlessly get the fields you have access.

Before Starting Type Fast you will need to generate these definitions by running the command from **the server root directory**

```
  npm run definition-generation
```

##How things are built

The client side is all built using Redux and React Bootstrap. 
