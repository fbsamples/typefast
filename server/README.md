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
* A Graph Schema Bundle (Contact your FB POC to obtain one)

# Install

### Install Dependencies

    npm install

#### Generate a self-signed SSL certificate (linux/OSX)

    mkdir ssl && cd ssl
    openssl req -x509 -newkey rsa:2048 -keyout key -out crt -days 365 -nodes

#### Setup configuration file

Copy file:

    cp config/local.dist.json config/local.json

Then edit `config/local.json`, filling all the keys:

`application_id` and `application_secret` are available in the [App manager](https://developers.facebook.com/apps/) (under settings).

For `access_token`, create a **admin system user** in business manager. (Remember you have to claim your app in business manager before you can create system users for it). Once you have created an admin system user, generate a token with the `ads_management` permission. Enter this token at `access_token`.

For `business_manager_id` fill in your business_id. You can find this value in the url when you are in business manager.

For `bundle`, provide the absolute path to the provided schema bundle (more info [here](README.md#grsbs)).

# Run

You will need to run a TypeFast server and a TypeFast worker.

## Server

### from source

    npm run server

### From source - Reloading on file changes [dev-only]

    npm run dev-server

## Worker

### from source

    npm run worker

### From source - Reloading on file changes [dev-only]

    npm run dev-worker

# [Optional] Transpile for packaging

    npm run-script transpile

# [Optional] Attaching a debugger

Include ```debug-break``` parameter when running `server` or `worker`. e.g.

    npm run dev-worker -- debug-break

 Which should output: ```Debugger listening on [::]:5858```

  Attach the debugger

     node debug localhost:5858

 And then set a breakpoint and continue execution, e.g.

     debug> sb('Worker.js', 87);
     debug> c

# License

This software is released under the [Facebook Platform License](https://github.com/facebook/typefast/blob/master/LICENSE).
