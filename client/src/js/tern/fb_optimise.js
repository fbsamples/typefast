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

// Parses comments above variable declarations, function declarations,
// and object properties as docstrings and JSDoc-style type
// annotations.

const walk = require('acorn/dist/walk');

module.exports = function(infer) {
  let fieldsAccessed = {};

  function isEdge(node) {
    return node.types[0]
        && node.types[0].retval
        && node.types[0].retval.proto
        && node.types[0].retval.proto.name.indexOf('cursor') > -1;
  }

  function isCursor(node) {
    return node.types[0]
      && node.types[0].proto
      && node.types[0].proto.name.indexOf('cursor') > -1;
  }

  function getURLSafeFieldsAccessed() {
    let obj = {};
    for (var key in fieldsAccessed) {
      if (fieldsAccessed.hasOwnProperty(key)) {
        obj[key] = Array.from(fieldsAccessed[key]);
      }
    }
    return obj;
  }

  function determineNodeTypeName(objFbType) {
    if (objFbType.types[0].name === 'Business') {
      return objFbType.types[0].name;
    } else {
      return objFbType.types[0].proto.name;
    }
  }

  return {
    postInfer: function(ast, scope, onOptimisationComplete) {
      fieldsAccessed = {};
      walk.simple(ast, {
        MemberExpression: function(node, scope) {
          if (node.object.fbType === undefined) {
            node.object.fbType = infer.expressionType({
              node: node.object,
              state: scope
            });
          }

          if (node.property.fbType === undefined) {
            node.property.fbType = infer.expressionType({
              node: node.property,
              state: scope
            });
          }

          let objFbType = node.object.fbType;
          let name = node.property.name;

          if (node.object.type == 'CallExpression') {
            if (objFbType.proto) {
              let properties = objFbType.proto.props;
              if (properties[name]
                && properties[name].origin == '!Facebook Scripting Definitions' ) {
                if (!fieldsAccessed[objFbType.proto.name]) {
                  fieldsAccessed[objFbType.proto.name] = new Set();
                }
                fieldsAccessed[objFbType.proto.name].add(name);
              }
            }
          } else if (objFbType.propertyName
            && objFbType.types[0]
            && !isCursor(objFbType)) {
            let properties = objFbType.types[0].props || {};

            if (Object.keys(properties).length == 0) {
              if (objFbType.types[0].proto) {
                properties = objFbType.types[0].proto.props;
              }
            }

            if (properties[name] // check its a valid prop
              && !isEdge(properties[name])
              && properties[name].origin == '!Facebook Scripting Definitions' // check its a FB Definition
            ) {
              const nodeName = determineNodeTypeName(objFbType);
              if (!fieldsAccessed[nodeName]) {
                fieldsAccessed[nodeName] = new Set();
              }
              fieldsAccessed[nodeName].add(name);
            }
          }
          node.property.parent_object = node.object;
        }
      }, infer.searchVisitor, scope);
      onOptimisationComplete(getURLSafeFieldsAccessed());
    },
    getFieldsAccessed: function() {
      return fieldsAccessed;
    },
    getURLSafeFieldsAccessed: function() {
      return getURLSafeFieldsAccessed();
    }
  };
};
