# TypeFast Server

TypeFast Server is the backend responsible for:
* Delivery TypeFast client build over HTTPS
* Providing an authentication interface over Facebook Graph API
* Providing access to data storage
* Execute stored routines within isolated processes
* Providing a scheduling mechanism for routines

# Requirements

* [Node.js](https://nodejs.org/) 6.0.0+
* [MongoDB](https://www.mongodb.com/community) 3.2.0+
* An SSL certificate

# Install

### Development with [Flowtype](http://flowtype.org/)

    npm install

#### Generate a self-signed SSL certificate (linux/OSX)

    mkdir ssl && cd ssl
    openssl req -x509 -newkey rsa:2048 -keyout key -out crt -days 365 -nodes

#### Setup base configuration

    cp config/local.dist.json config/local.json

### Transpile for packaging

To transpile the source and exit:

    npm run-script transpile

### Run from source

    npm start

# License

This software is released under the [Facebook Platform License](https://github.com/facebook/typefast/blob/master/LICENSE).
