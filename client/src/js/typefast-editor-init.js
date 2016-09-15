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

//for codemirror to use JS Hint it needs there to be a global variable
//JSHINT that it can use a reference
window.JSHINT = require('jshint').JSHINT;
const ecma5 = require('tern/defs/ecma5');
const ecma6 = require('tern/defs/ecma6');
const fbdefs = require('./tern/fb_defs');
const tern = window.tern = require('tern');
const infer = require('tern/lib/infer');
const CodeMirror = require('codemirror');
const FBOptimise = require('./tern/fb_optimise')(infer);

// Codemirror addons will autoload dependencies internally
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/lint/lint');
require('codemirror/addon/lint/javascript-lint');
require('codemirror/addon/hint/show-hint');
require('./tern/tern-codemirror')(CodeMirror);

const loadingLastScript = 'Loading your last script...';
const sampleCode = '';

module.exports = function(element, onCodeChange, onOptimisationComplete) {
  tern.registerPlugin('fb_optimise', function(server, options) {
    server.on('postInfer', function(ast, scope) {
      FBOptimise.postInfer(ast, scope, onOptimisationComplete);
    });
  });

  const editor = CodeMirror(element, {
    mode: 'javascript',
    value: sampleCode,
    lineNumbers: true,
    lineWrapping: true,
    gutters: ['CodeMirror-lint-markers'],
    lint: true,
    tabSize: 2,
  });

  const server = new CodeMirror.TernServer({
    defs: [ecma5, ecma6, fbdefs],
    plugins: {
      fb_optimise: true,
    }
  });

  const runAnalysis = function() {
    server.request(
      editor,
      {type: 'completions', types: true, docs: true, urls: true},
      function(error, data) {}
    );
  };

  editor.setOption('extraKeys', {
    'Ctrl-N': function(cm) { server.complete(cm); },
    'Ctrl-I': function(cm) { server.showType(cm); },
    'Ctrl-O': function(cm) { server.showDocs(cm); },
    'Alt-.': function(cm) { server.jumpToDef(cm); },
    'Alt-,': function(cm) { server.jumpBack(cm); },
    'Ctrl-Q': function(cm) { server.rename(cm); },
    'Ctrl-.': function(cm) { server.selectName(cm); }
  });
  editor.on('keyup', function(cm, event) {
    if (event.keyCode === 190) {
      server.complete(cm);
    }
  });

  editor.on('change', function(cm, event) {
    onCodeChange(cm.getValue().replace(/\n/g, '\r\n'));
    runAnalysis();
  });
  editor.on('cursorActivity', function(cm) { server.updateArgHints(cm); });
  editor.getWrapperElement().addEventListener(
    'paste',
    function() {
      runAnalysis();
    }
  );
  runAnalysis();

  return {
    setText: function(code) {
      if (!code) { return; }
      editor.setValue(code);
    },
    setLoadingText: function() {
      editor.setValue(loadingLastScript);
    },
    setWelcomeText: function() {
      editor.setValue(sampleCode);
    }
  };
};
