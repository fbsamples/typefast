# TypeFast deployment to Heroku

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

* *NPM_CONFIG_PRODUCTION* - set to false
* *db.url* - path to MongoDB (copy from existing MONGODB_URI config var)
* *graph.access_token* - access token generated for admin system user in Business Manager
* *graph.application_id* - application id from [developers.facebook.com/apps](https://developers.facebook.com/apps)
* *graph.application_secret* - application secret
* *graph.business_manager_id* - your business manager id
* *graph.schema.bundle* - set to the filename of used graph schema bundle: `<HASH>.grsb` (more info [here](README.md#grsbs))
* *graph.version.0* - major version of Graph API, [check current version](https://developers.facebook.com/docs/graph-api)
* *graph.version.1* - minor version of Graph API
* *server.bindings.http.addr* - set to 0.0.0.0
* *server.bindings.http.is_enabled* - set to true
* *server.bindings.https.is_enabled* - set to false

Please see [server/config/default.json](server/config/default.json) for full list of configuration options available.

### Update and Restart

Heroku app restarts automatically whenever you deploy code, change config vars or change add-ons. You can restart app via CLI as well by running:

    heroku restart

You can check app logs on Heroku website or with:

    heroku logs --tail

To add debug information to network calls, set config var debug to true.

### Alternative way

Alternatively you can clone your TypeFast Heroku app if you had one before.

    heroku fork -a <source_app> <new_app>

**!Be cautious to change all client related vars.**
