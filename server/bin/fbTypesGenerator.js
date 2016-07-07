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

require('babel-register');
require('babel-polyfill');
const fs = require('fs');
const Config = require('./Config');
const {Map} = require('immutable');
const NodeSpec = require('../../sdk/src/specs/NodeSpec');
const SpecRegistry = require('../../sdk/src/SpecRegistry');
const {getObject} = require('./GraphSchemaLoader');
const config = Config.fromArgv();
const schema_bundle = config.getString('graph.schema.bundle');
const outputFilename = '../client/src/js/tern/fb_defs.js';

function normalizeDescription(description) {
  return description.replace(/\r|\n/, '').replace(/\s+/, ' ');
}

function isObjectType(type) {
  return type.indexOf(/^(map|Object|object)/) != -1;
}

function typeTransformer(type) {
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
    // this fudge is for the offline conversions spec that is borked and we
    // need to look at how to fix
    case 'Returns the number of object received.':
      return 'OffsiteConversion'
    break;
    default:
      return type;
    break;
  }
}

var schema = getObject(schema_bundle);
const registry = new SpecRegistry(true);

var enums = schema.enums;
delete schema.enums;

var ternDefinitions = {
  '!name': '!Facebook Scripting Definitions',
  '!define':  {
    "cursor_prototype": {
      ":Symbol.iterator": "fn() -> !this",
    },
  },
  'adaccount': 'AdAccount',
};

new Map(schema).forEach(function(spec, type) {
  var defs = {};
  const transformedType = typeTransformer(type);
  const nodeSpec = NodeSpec.fromJson(registry, JSON.stringify(spec));

  const readSpec = nodeSpec.getReadSpec();
  if (readSpec) {
    const name = typeTransformer(readSpec.getFunctionName());
    defs[name] = {};
    defs[name]['!type'] = 'fn(params: Object) -> +' + transformedType;
    defs[name]['!doc'] = 'Read fields from the ' + transformedType;
  }

  const updateSpec = nodeSpec.getUpdateSpec();
  if (updateSpec) {
    const name = typeTransformer(updateSpec.getFunctionName());
    defs[name] = {};
    defs[name]['!type'] = 'fn(params: Object) -> +' + transformedType;
    defs[name]['!doc'] = 'Update fields on the ' + transformedType;
  }

  const deleteSpec = nodeSpec.getDeleteSpec();
  if (deleteSpec) {
    const name = typeTransformer(deleteSpec.getFunctionName());
    defs[name] = {};
    defs[name]['!type'] = 'fn(params: Object) -> bool';
    defs[name]['!doc'] = 'Delete the ' + transformedType;
  }

  nodeSpec.getEdgeSpecs().forEach(function(edge) {
    const name = edge.getName();
    const returntype = typeTransformer(edge.getReturnType());
    const description = edge.getDescription();
    defs[name] = {};

    ternDefinitions['!define'][returntype + '_cursor'] = {
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
  });

  nodeSpec.getFieldSpecs().forEach(function(fieldSpec){
    const name = fieldSpec.getName();
    const fieldType = fieldSpec.getType();
    if (!defs[name]){
      defs[name] = {};
    }
    if(!isObjectType(fieldType)) {
      defs[name]["!type"] = typeTransformer(fieldType);
      defs[name]["!doc"] = fieldSpec.getDescription();
    }
  });

  ternDefinitions['!define'][transformedType] = defs;
});

fs.writeFile(outputFilename, 'module.exports = ' + JSON.stringify(ternDefinitions, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
});
