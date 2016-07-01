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
 */

const fs = require('fs');
const Config = require('./Config');
const config = Config.fromArgv();
const {Map} = require('immutable');
const {getObject} = require('./GraphSchemaLoader');
const schema_bundle = config.getString('graph.schema.bundle');
const outputFilename = '../client/src/defs/fb_defs.js';

function normalizeDescription(description: string): string {
  return description.replace(/\r|\n/, '').replace(/\s+/, ' ');
}

function isObjectType(type: string): bool {
  return type.indexOf(/^(map|Object|object)/) != -1;
}

function typeTransformer(type: string) {
  if(!type) { return null };
  var matches = null;
  switch(type) {
    case 'int':
    case 'unsigned int':
    case 'float':
      return 'number';
    break;
    case 'datetime':
    case enums[type]:
      return 'string';
    case 'string':
    case 'bool':
      return type;
    break;
    case isObjectType(type):
      return 'Object';
    break;
    case /^list<(.*)>/:
      const matches = type.match(/^list<(.*)>/)
      return '[' + typeTransformer(matches[1]) + ']';
    break;
    case 'list':
      return '[?]';
    break;
    default:
      return type;
    break;
  }
}

var schema = getObject(schema_bundle);
var enums = schema.enums;
delete schema.enums;
var map = {
  '!name': '!Facebook Scripting Definitions',
  '!define':  {
    "cursor_prototype": {
      ":Symbol.iterator": "fn() -> !this",
    },
  },
  'adaccount': 'AdAccount',
};

Map(schema).forEach(function(spec, type) {
  var defs = {};
  spec.apis.forEach(function(api){
    const name = api['name'];
    const returntype = typeTransformer(api['return']);
    const description = api['description'];
    const method = api['method'];
    defs[name] = {};

    if (method === 'GET') {
      map['!define'][returntype + '_cursor'] = {
        "!proto": "cursor_prototype",
        "forEach": {
          "!type": "fn(f: fn(el: +"
          + returntype + ", i: number, array: +Array), context?: ?)",
        },
        "valid": {
          "!type": "fn() -> bool",
          "!doc": "Wether the cursor is valid",
        },
        "key": {
          "!type": "fn() -> number",
          "!doc": "The current index of the cursor",
        },
        "rewind": {
          "!type": "fn() -> !this",
        },
        "next": {
          "!type": "fn() -> +" + returntype ,
          "!doc": "Return the next " + returntype + " item from the cursor.",
          "!url": "https://facebook.com",
        },
        "current": {
          "!type": "fn() -> +" + returntype ,
          "!doc": "Gets the current " + returntype + " of the cursor",
        },
      }

      defs[name]['!type'] = 'fn() -> +' + returntype + '_cursor';
      defs[name]['!doc'] = description;
    }
    else if (method === 'POST') {
      if (api['endpoint']) {
        // this is an edge
        defs[name]['!type'] = 'fn(params: Object) -> +' + api['return'];
        defs[name]['!doc'] = description;
      } else {
        // this operation is on the current object
        const name = api.name.slice(1);
        defs[name] = {};
        defs[name]['!type'] = 'fn(params: Object) -> +' + type;
        defs[name]['!doc'] = 'Update the ' + type;
      }
    }

    else if (method === 'DELETE') {
      if (api['endpoint']) {
        // this is an edge
        defs[name]['!type'] = 'fn(params: Object) -> +' + api['return'];
        defs[name]['!doc'] = description;
      } else {
        // this operation is on the current object
        const name = api.name.slice(1);
        defs[name] = {};
        defs[name]['!type'] = 'fn(params: Object) -> bool';
        defs[name]['!doc'] = 'Delete the ' + type;
      }
    }
  });

  spec.fields.forEach(function(field) {
    if (!defs[field['name']]){
      defs[field['name']] = {};
    }
    if(!isObjectType(field['type'])) {
      defs[field['name']]["!type"] = typeTransformer(field['type']);
      defs[field['name']]["!doc"] = field['description'];
    }
  });

  map['!define'][type] = defs;
});

fs.writeFile(outputFilename, 'var fb_defs = ' + JSON.stringify(map, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
});
