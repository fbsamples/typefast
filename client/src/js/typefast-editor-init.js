//for codemirror to use JS Hint it needs there to be a global variable
//JSHINT that it can use a reference
window.JSHINT = require('jshint').JSHINT;
const ecma5 = require("tern/defs/ecma5");
const ecma6 = require("tern/defs/ecma6");
const fbdefs = require("./tern/fb_defs");
const tern = window.tern = require("tern");
const infer = require("tern/lib/infer");
const CodeMirror = require("codemirror");
const FBOptimise = require("./tern/fb_optimise")(infer);

// Codemirror addons will autoload dependencies internally
require('codemirror/mode/javascript/javascript');
require("codemirror/addon/lint/lint");
require("codemirror/addon/lint/javascript-lint");
require("codemirror/addon/hint/show-hint");
require("codemirror/addon/tern/tern");

const loadingLastScript = 'Loading your last script...'

const sampleCode =
`/*jshint esversion: 6 */
//
// Welcome to TypeFast!
//
// adaccount is the global varaiable for scripting with.
// See the following example of how this works

adaccount.getCustomAudiences().forEach(
  ca => console.log(ca.id + ': ' + ca.name)
);`;

module.exports = function(element, onCodeChange, onOptimisationComplete) {
  tern.registerPlugin("fb_optimise", function(server, options) {
    server.on("postInfer", function(ast, scope) {
      FBOptimise.postInfer(ast, scope, onOptimisationComplete)
    })
  });

  const editor = CodeMirror(element, {
    mode: 'javascript',
    value: sampleCode,
    lineNumbers: true,
    gutters: ["CodeMirror-lint-markers"],
    lint: true,
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
      {type: "completions", types: true, docs: true, urls: true},
      function(error, data) {}
    );
  }

  editor.setOption("extraKeys", {
    "Ctrl-N": function(cm) { server.complete(cm); },
    "Ctrl-I": function(cm) { server.showType(cm); },
    "Ctrl-O": function(cm) { server.showDocs(cm); },
    "Alt-.": function(cm) { server.jumpToDef(cm); },
    "Alt-,": function(cm) { server.jumpBack(cm); },
    "Ctrl-Q": function(cm) { server.rename(cm); },
    "Ctrl-.": function(cm) { server.selectName(cm); }
  })
  editor.on("keyup", function (cm, event) {
    if (event.keyCode === 190) {
      server.complete(cm);
    }
  });

  editor.on("change", function(cm, event){
    onCodeChange(cm.getValue());
    runAnalysis();
  })
  editor.on("cursorActivity", function(cm) { server.updateArgHints(cm); });
  editor.getWrapperElement().addEventListener(
    "paste",
    function() {
      runAnalysis();
    }
  );
  runAnalysis();

  return {
    setText: function(code) {
      if(!code) { return }
      editor.setValue(code);
    },
    setLoadingText: function() {
      editor.setValue(loadingLastScript);
    },
    setWelcomeText: function() {
      editor.setValue(sampleCode);
    }
  }
}
