# TypeFast SDK

TypeFast SDK is the barebone user-space abstraction available within TypeFast workers and it's responsible to provide an abstraction around the Facebook Graph API.

# Requirements

* [Node.js](https://nodejs.org/) 6.0.0+

# Install

### Development with [Flowtype](http://flowtype.org/)

    cd ./typefast/sdk
    npm install

### Transpile for packaging

To transpile the source and exit:

    npm run-script transpile

To transpile the source and wait for future changes:
    npm start

# Tests with [Jest](https://facebook.github.io/jest/)

    cd ./typefast/sdk
    npm test


Note: HTML code coverage files will be built within the `./typefaast/coverage/`

# License

This software is released under the [Facebook Platform License](https://github.com/facebook/typefast/blob/master/LICENSE).
