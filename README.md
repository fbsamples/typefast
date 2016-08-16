# TypeFast

An auto-deployable scripting environment that enables people to quickly leverage powerful automation tools.

# Install and Development

Please refer to the specific components READMEs.

Note: When developing on the Server or Client, SDK components might be required as dependencies. It is advised to install dependencies for all components.

 * [SDK README](sdk/README.md)
 * [Server README](server/README.md)
 * [Client README](client/README.md)

# Deploy to Heroku

### Configure Heroku app

Before starting configuration make sure you have [Heroku CLI](https://toolbelt.heroku.com/) installed on your machine and you are logged in to your Heroku account.

1). Create app on Heroku website or via CLI

    heroku create -a <app_name>

2). Go to Resources tab and add mLab MongoDB add-on

3). Go to Deploy tab and connect github repository or via CLI

    heroku git:remote -a <app_name>

4). Add Config Vars under Settings tab. See Config Vars section

5). Deploy app

    git push heroku master

6). Check Resources and make sure both web and worker dynos are launched

### Config Vars

Following config vars are required for Heroku app:

* *db.url* - path to MongoDB (copy from existing MONGODB_URI config var)
* *DEPRECATED__cxt_id* - adaccount id
* *graph.access_token* - access token generated for admin system user in Business Manager
* *graph.application_id* - application id from [developers.facebook.com/apps](https://developers.facebook.com/apps)
* *graph.application_secret* - application secret
* *graph.business_manager_id* - your business manager id
* *graph.schema.bundle* - set to da204b3753e6fd7a1845f8763bdf611c.grsb
* *graph.version.0* - major version of Graph API, [check current version](https://developers.facebook.com/docs/graph-api)
* *graph.version.1* - minor version of Graph API
* *server.bindings.http.addr* - set to 0.0.0.0
* *server.bindings.http.is_enabled* - set to true
* *server.bindings.https.is_enabled* - set to false
* *server.client.root* - set to /app/client/src

Please see [server/config/default.json](server/config/default.json) for full list of configuration options available.

### Update and Restart

Heroku app restarts automatically whenever you deploy code, change config vars or change add-ons. You can restart app via CLI as well by running:

    heroku restart

You can check app logs on Heroku website or with:

    heroku logs --tail

### Alternative way

Alternatively you can clone your TypeFast Heroku app if you had one before.

    heroku fork -a <source_app> <new_app>

**!Be cautious to change all client related vars.**

# License

This software is released under the [Facebook Platform License](https://github.com/facebook/typefast/blob/master/LICENSE).
