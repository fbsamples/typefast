/**
 * Copyright (c) 2016-present, Facebook, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */

import type {Action, State} from 'redux';

import {
  FETCHING_SCRIPTS_SUCCESS,
  SAVE_SCRIPT_REQUEST, SAVE_SCRIPT_SUCCESS,
  SCRIPT_CODE_CHANGED,
  OPTIMISATIONS_COMPLETE,
  PREVIEW_SCRIPT_REQUEST, PREVIEW_SCRIPT_SUCCESS,
  LOAD_SCRIPT,
  FACEBOOK_AUTH_STARTED, FACEBOOK_AUTH_SUCCESS, FACEBOOK_AUTH_FAILURE,
  UNAUTHORISED,
  FETCHING_SCHEDULE_SUCCESS,
  SAVE_SCHEDULE_SUCCESS,
  FETCHING_ROUTINES_SUCCESS,

  SHOW_OPEN_SCRIPT_DIALOG,
  HIDE_OPEN_SCRIPT_DIALOG,

  SHOW_RUN_HISTORY_MODAL,
  HIDE_RUN_HISTORY_MODAL,

  FETCH_SAMPLES,

  SHOW_HELP_MODAL,
  HIDE_HELP_MODAL,

  SHOW_ERROR_MODAL,
  HIDE_ERROR_MODAL,

  FETCHING_START,
  FETCHING_FINISH,

  SHOW_NEW_SCRIPT_DIALOG,
  HIDE_NEW_SCRIPT_DIALOG,
  LOAD_SAMPLE,
  CHANGE_SCRIPT_TITLE,

  SHOW_SCHEDULE_DIALOG,
  HIDE_SCHEDULE_DIALOG,
  SET_NEW_SCHEDULE_MINUTE,
  SET_NEW_SCHEDULE_HOUR,
  SET_NEW_SCHEDULE_INTERVAL,
  SET_NEW_SCHEDULE_DAY,
  SET_NEW_SCHEDULE_PAUSED,
  NEW_SCHEDULE_REQUEST,
} from '../actions/actions';
import { ScheduleRecurence } from '../constants/constants';

function defaultScript() {
  return {
    title: 'Untitled',
    optimisations: [],
    code: '/*jshint esversion: 6 */' + String.fromCharCode(10),
  };
}

function defaultSchedule() {
  return {
    is_paused: true,
    start_time: new Date(Date.now()).toISOString(),
    interval: 0,
    day: 1,
    hour: 0,
    minute: 0,
    recurrence: {},
  };
}

function initialLog() {
  return [];
}

function typefastApp(state: State = {
  isLoading: true,
  isSaving: false,
  isFetching: false,
  isRunning: false,
  scripts: {},
  schedules: [],
  routines: [],
  log: initialLog(),
  runHistory: {},

  needToSave: true,
  currentScript: defaultScript(),
  currentScriptTitle: defaultScript().title,
  currentSchedule: defaultSchedule(),
  editorValue: defaultScript().code,
  accessToken: null,
  isAuthenticated: false,
  isAuthenticating: false,
  isAuthorised: true,
  isError: false,

  samples: [],
  showHelpModal: false,
  showRunHistoryModal: false,
  showOpenScriptDialog: false,
  showNewScriptDialog: false,
  showScheduleDialog: false,
  newSchedule: defaultSchedule(),

  showErrorModal: false,
  errorAction: null,
  errorMessage: null,
  errorStack: [],

  showSaveScheduleSnack: false,
  showSaveScriptSnack: false,
}, action: Action): State {
  let needToSave;
  switch (action.type) {
    case LOAD_SCRIPT:
      let scriptToLoad = defaultScript();
      if (action.payload.id !== 'new') {
        scriptToLoad = state.scripts[action.payload.id];
      }
      return Object.assign({}, state, {
        currentScript: scriptToLoad,
        currentScriptTitle: scriptToLoad.title,
        editorValue: scriptToLoad.code,
        optimisations: scriptToLoad.optimisations || state.optimisations || [],
        log: initialLog(),
      });

    case UNAUTHORISED:
      return Object.assign({}, state, {
        isLoading: true,
        isAuthorised: false,
        isRunning: false,
      });

    case SAVE_SCRIPT_REQUEST:
      return Object.assign({}, state, {
        isSaving: true,
      });

    case SAVE_SCRIPT_SUCCESS:
      let script = {};
      script[action.payload.script.id] = action.payload.script;
      const updatedScripts = Object.assign({}, state.scripts, script);
      return Object.assign({}, state, {
        isSaving: false,
        scripts: updatedScripts,
        scriptCount: Object.keys(updatedScripts).length,
        needToSave: false,
        showSaveScriptSnack: true,
      });

    case SAVE_SCHEDULE_SUCCESS:
      return Object.assign({}, state, {
        currentSchedule: state.newSchedule,
        showSaveScheduleSnack: true,
      });

    case FACEBOOK_AUTH_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        isAuthenticating: false,
        accessToken: action.payload.accessToken,
      });

    case FACEBOOK_AUTH_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isAuthenticating: false,
      });

    case FACEBOOK_AUTH_STARTED:
      return Object.assign({}, state, {
        isError: false,
        isAuthenticated: false,
        isAuthenticating: true,
      });

    case FETCHING_ROUTINES_SUCCESS:
      const routines = action.payload.routines.data.reduce(
        (o, v, i) => {
          if (!o.hasOwnProperty(v.script_id)) {
            o[v.script_id] = [v];
          } else {
            o[v.script_id].push(v);
          }
          return o;
        },
        {}
      );
      return Object.assign({}, state, {
        routines: routines,
      });

    case FETCHING_SCRIPTS_SUCCESS:
      let scripts = action.payload.scripts.data.sort((a, b) => {
        if (a.updated_time > b.updated_time) {
          return -1;
        }
        if (a.updated_time < b.updated_time) {
          return 1;
        }
        return 0;
      });
      scripts = scripts.reduce(
        (o, v, i) => { o[v.id] = v; return o; },
        {}
      );
      return Object.assign({}, state, {
        scripts: scripts,
        currentScript: defaultScript(),
        currentScriptTitle: defaultScript().title,
        scriptCount: Object.keys(scripts).length,
      });

    case FETCHING_SCHEDULE_SUCCESS:
      let currentSchedule = defaultSchedule();
      if (action.payload.schedule.length > 0) {
        currentSchedule = Object.assign(currentSchedule, action.payload.schedule[0]);
        if (currentSchedule.recurrence) {
          if (currentSchedule.recurrence.minutes.length > 0) {
            currentSchedule.interval = ScheduleRecurence.HOURLY;
            currentSchedule.minute = currentSchedule.recurrence.minutes[0];
          }
          if (currentSchedule.recurrence.hours.length > 0) {
            currentSchedule.interval = ScheduleRecurence.DAILY;
            currentSchedule.hour = currentSchedule.recurrence.hours[0];
          }
          if (currentSchedule.recurrence.week_days.length > 0) {
            currentSchedule.interval = ScheduleRecurence.WEEKLY;
            currentSchedule.day = currentSchedule.recurrence.week_days[0];
          }
        }
      }
      return Object.assign({}, state, {currentSchedule});

    case PREVIEW_SCRIPT_SUCCESS:
      return Object.assign({}, state, {
        log: action.payload.log,
        isRunning: !action.payload.is_completed,
      });

    case PREVIEW_SCRIPT_REQUEST:
      return Object.assign({}, state, {
        log: [],
        isRunning: true,
      });

    case SCRIPT_CODE_CHANGED:
      needToSave = !(state.currentScript.id
        && (state.currentScript.code == action.payload.code));
      return Object.assign({}, state, {
        editorValue: action.payload.code,
        needToSave: needToSave,
      });

    case OPTIMISATIONS_COMPLETE: {
      return Object.assign({}, state, {
        optimisations: action.payload.optimisations,
      });
    }

    case SHOW_OPEN_SCRIPT_DIALOG: {
      return Object.assign({}, state, {
        showOpenScriptDialog: true,
      });
    }

    case HIDE_OPEN_SCRIPT_DIALOG: {
      return Object.assign({}, state, {
        showOpenScriptDialog: false,
      });
    }

    case SHOW_RUN_HISTORY_MODAL: {
      return Object.assign({}, state, {
        showRunHistoryModal: true,
      });
    }

    case HIDE_RUN_HISTORY_MODAL: {
      return Object.assign({}, state, {
        showRunHistoryModal: false,
      });
    }

    case FETCH_SAMPLES: {
      return Object.assign({}, state, {
        samples: [
          {
            id: 1,
            name: 'Fetching Ads Insights',
            description: 'How to fetch Ads Insights for all Ad Accounts',
            code: `/*jshint esversion: 6 */

business.getowned_ad_accounts().forEach(function(adaccount) {
  var adsets = adaccount.getadsets();
  adsets.forEach(function(adset) {
    var insightsCursor = adset.getinsights();
    insights = insightsCursor.next();
    if (insights) {
     	console.log("CPM Was " + insights.cpm);
    }
  });
});
            `,
          },
          {
            id: 2,
            name: 'Send a Email based on Insights Data',
            description: 'Send A Mail Gun Email when Relevence Score is less than 5',
            code: `/*jshint esversion: 6 */

const domain = 'sandbox410d9fbb28224914a6fd0a94a2374516.mailgun.org'; // Your Mail Gun Domain
const apiKey = 'key-5d76f855268b063f97b4283d05fc9168'; // Your Mail Gun API Key
const relevanceLimit = 5;

var mailgun = new Mailgun(domain, apiKey);

var poorAds = [];
business.getowned_ad_accounts().forEach(function(adaccount) {
  var adsets = adaccount.getadsets();
  adsets.forEach(function(adset) {
    var insightsCursor = adset.getinsights();
    insights = insightsCursor.next();
    if (insights && insights.relevance_score < 5) {
     	poorAds.push("Low relevance score for ad " + adset.id + " - " + adset.name);
    }
  });
});

mailgun.sendMail(
  'Jordan <jordanrs@fb.com>',
  'Mailgun Sandbox <postmaster@sandbox410d9fbb28224914a6fd0a94a2374516.mailgun.org>',
  'Your Ads Have Low Relevence',
  "The following ads all have a low relevence score \\n " +
  "total: " + poorAds.length + "\\n\\n" +
  poorAds.join("\\n")
);

function Mailgun(domain, apiKey) {
  this.domain = domain;
  this.apiKey = apiKey;
  this.messagesEndpoint = 'https://api.mailgun.net/v3/' + domain + '/messages';

  this.sendMail = function(to,from,subject,body) {
    var resp = request('post', this.messagesEndpoint, {
      headers: {
        'Authorization': 'Basic ' + utils.base64encode("api:" + this.apiKey),
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      body : {
      	to: to,
	      from: from,
        subject: subject,
        text: body
    }});
    console.log(resp.body);
    return resp;
  };
}
            `,
          },
          {
            id: 3,
            name: 'Lead Ads Retrieval',
            description: 'How to loop through all forms and leads for a specific ad account',
            code: `/*jshint esversion: 6 */
//

const TARGET_ACCOUNT_ID = 1049380368502275;

business.getowned_ad_accounts().forEach(account => {
  if (account.account_id == TARGET_ACCOUNT_ID) {
    account.getleadgen_forms().forEach(form => {
      form.getleads().forEach(function(lead) {
      	console.log(lead);
      });
    });
  }
});
            `,
          },
          {
            id: 4,
            name: 'Update Custom Audiences',
            description: 'This uses a mock API to return JSON user data which is parsed and added to a new custom audience.',
            code: `// This is our API providing list of new subscribed users with their email addresses hashed.
var res = request('GET', 'http://www.mocky.io/v2/57cee8b72600007b0464feef');
var users = JSON.parse(res.body);

// Let's extract the list of email addresses only for the purpose of this script
var emails = users.map(function(user) {
	return user.email;
});

business.getowned_ad_accounts().forEach(function(account) {
  // This is our main ad account
  if (account.account_id == 1049380368502275) {
    account.getcustomaudiences().forEach(function(adcc) {
      	adcc.delete();
    });
    var now = Math.floor(Date.now() / 1000);
    // Let's create a new audience
    var audience = account.createcustomaudiences({
      name: now,
      subtype: 'CUSTOM',
      description: 'Example audience'
    });
    // Let's add users to our newly created audience
    audience.createusers({
      payload: {
          schema: 'EMAIL_SHA256',
          data: emails
        }
    });
    console.log(audience.id);
  }
});
            `,
          },
          {
            id: 5,
            name: 'Send SMS when Product Count is 0',
            description: 'When the product count is 0 send an SMS to let you know.',
            code:`/*jshint esversion: 6 */

const accountSid = 'ACf2cc30e87ff7b1929b9752a7c46834e9'; // Your Account SID
const authToken = '00ffc884e63137a18531796a9f24b1b7'; // Your Auth Token
const recipient = '+447818610137'; // Your Number
const sender = '+15005550006'; // Your Twilio Number
const message = 'TEST';

var twilio = new Twilio(accountSid, authToken);

var catalogs = business.getproduct_catalogs();
catalogs.forEach(function(cat) {
  var feeds = cat.getproduct_feeds();
  feeds.forEach(function(feed) {

    if (feed.product_count === 0) {
     	 twilio.sendMessage(
           recipient,
           sender,
           'Product Feed ' + feed.name + ' - ' + feed.id + ' has zero products'
         );
    }
  });
});

// twilio.sendMessage(recipient, sender, message)

function Twilio(accountSid, authToken) {
  this.accountSid = accountSid;
  this.authToken = authToken;
  this.messagesEndpoint = 'https://api.twilio.com/2010-04-01/Accounts/'+this.accountSid+'/Messages.json';

  this.sendMessage = function(to,from,body) {
    var resp = request('post', this.messagesEndpoint, {
      headers: {
        'Authorization': 'Basic ' + utils.base64encode(this.accountSid + ":" + this.authToken),
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      body : {
      	To: to,
	      From: from,
        Body: body
    }});
    console.log(resp.body);
    return resp;
  };
}
            `,
          },
          {
            id: 6,
            name: 'CSV Fetch',
            description: 'How to fetch a CSV file',
            code: `csv = request('get', 'http://www.sample-videos.com/csv/Sample-Spreadsheet-10000-rows.csv');

utils.csvParse(csv.body, function(err, data) {
  console.log(err, data);
});
            `,
          },
          {
            id: 7,
            name: 'XML Fetch',
            description: 'How to fetch a XML file',
            code: `xml = request('get', 'http://www.w3schools.com/xml/note.xml');

utils.xmlParser(xml.body, function(err, data) {
	console.log(data);
});
            `,
          },
          // TODO: add samples here
          // Format: {id, name, description, code}
          // id should be >0
        ],
      });
    }

    case SHOW_HELP_MODAL: {
      return Object.assign({}, state, {
        showHelpModal: true,
      });
    }

    case HIDE_HELP_MODAL: {
      return Object.assign({}, state, {
        showHelpModal: false,
      });
    }

    case SHOW_ERROR_MODAL: {
      return Object.assign({}, state, {
        showErrorModal: true,
        errorAction: action.payload.errorAction,
        errorMessage: action.payload.errorData.message,
        errorStack: action.payload.errorData.stack,
        isError: true,
      });
    }

    case HIDE_ERROR_MODAL: {
      return Object.assign({}, state, {
        showErrorModal: false,
      });
    }

    case FETCHING_START: {
      return Object.assign({}, state, {
        isFetching: true,
      });
    }

    case FETCHING_FINISH: {
      let payload = {
        isFetching: false,
        isLoading: false,
      };
      if (state.isError) {
        payload.isLoading = true;
      }
      return Object.assign({}, state, payload);
    }

    case SHOW_NEW_SCRIPT_DIALOG: {
      return Object.assign({}, state, {
        showNewScriptDialog: true,
      });
    }

    case HIDE_NEW_SCRIPT_DIALOG: {
      return Object.assign({}, state, {
        showNewScriptDialog: false,
      });
    }

    case SHOW_SCHEDULE_DIALOG: {
      return Object.assign({}, state, {
        showScheduleDialog: true,
        newSchedule: state.currentSchedule,
      });
    }

    case HIDE_SCHEDULE_DIALOG: {
      return Object.assign({}, state, {
        showScheduleDialog: false,
      });
    }

    case LOAD_SAMPLE: {
      let currentScript = defaultScript();
      // FLOW_FIXME migrate to Map state
      const sample = state.samples.filter(s => s.id === action.payload.sampleId);
      if (sample.length > 0) {
        currentScript.code = sample[0].code;
      }
      return Object.assign({}, state, {
        currentScript: currentScript,
        currentScriptTitle: currentScript.title,
        editorValue: currentScript.code,
        optimisations: currentScript.optimisations,
        currentSchedule: defaultSchedule(),
      });
    }

    case SET_NEW_SCHEDULE_PAUSED: {
      return Object.assign({}, state, {
        newSchedule: Object.assign({}, state.newSchedule, {
          is_paused: action.payload.schedulePaused,
        }),
      });
    }

    case SET_NEW_SCHEDULE_INTERVAL: {
      return Object.assign({}, state, {
        newSchedule: Object.assign({}, state.newSchedule, {
          interval: action.payload.scheduleInterval,
        }),
      });
    }

    case SET_NEW_SCHEDULE_MINUTE: {
      return Object.assign({}, state, {
        newSchedule: Object.assign({}, state.newSchedule, {
          minute: action.payload.scheduleMinute,
        }),
      });
    }

    case SET_NEW_SCHEDULE_HOUR: {
      return Object.assign({}, state, {
        newSchedule: Object.assign({}, state.newSchedule, {
          hour: action.payload.scheduleHour,
        }),
      });
    }

    case SET_NEW_SCHEDULE_DAY: {
      return Object.assign({}, state, {
        newSchedule: Object.assign({}, state.newSchedule, {
          day: action.payload.scheduleDay,
        }),
      });
    }

    case NEW_SCHEDULE_REQUEST: {
      let recurrence = {
        minutes: [],
        hours: [],
        week_days: [],
      };
      if (state.newSchedule.interval >= ScheduleRecurence.HOURLY) {
        recurrence.minutes.push(state.newSchedule.minute);
      }
      if (state.newSchedule.interval >= ScheduleRecurence.DAILY) {
        recurrence.hours.push(state.newSchedule.hour);
      }
      if (state.newSchedule.interval >= ScheduleRecurence.WEEKLY) {
        recurrence.week_days.push(state.newSchedule.day);
      }

      return Object.assign({}, state, {
        newSchedule: Object.assign({}, state.newSchedule, {
          recurrence: recurrence,
        }),
      });
    }

    case CHANGE_SCRIPT_TITLE: {
      needToSave = (
        !state.currentScript.id ||
        action.payload.title !== state.currentScript.title
      );
      return Object.assign({}, state, {
        needToSave: needToSave,
        currentScriptTitle: action.payload.title,
      });
    }

    default:
      return state;
  }
}

module.exports = typefastApp;
