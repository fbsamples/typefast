var Application = (function(){
  var editor, server, currentScriptId;

  function getLastScript(cb) {
    $.ajax({
      url: "scripts",
      type: "GET",
      dataType: 'json',
      success: function(response) {
        cb(response);
      },

      error: function() {
        //called when there is an error
      },
    });
  }

  return {
    init: function() {

      editor = CodeMirror($('#sandbox')[0], {
        mode: 'javascript',
        value: '//loading your scripts...',
        lineNumbers: true,
        gutters: ["CodeMirror-lint-markers"],
        lint: true,
      });

      getLastScript(function(response){
        if (response.length === 0) {
          editor.setValue($('#default-code').text())
        } else {
          var script = response[0];
          currentScriptId = script._id
          editor.setValue(script.code);
        }
      })

      tern.registerPlugin("fb_optimise", function(server, options) {
        server.on("postInfer", FBOptimise.postInfer)
      });

      server = new CodeMirror.TernServer({
        defs: [ecma5, ecma6, fb_defs],
        plugins: {
          fb_optimise: true,
        }
      });

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
      editor.on("cursorActivity", function(cm) { server.updateArgHints(cm); });
      editor.getWrapperElement().addEventListener(
        "paste",
        function() {
          server.runAnalysis(editor);
        }
      );
      server.runAnalysis(editor);
    },
    getTernServer: function() {
      return server;
    },
    getEditor: function() {
      return editor;
    },
    runAnalysis: function() {
      server.runAnalysis(editor);
    },
    getCurrentScriptID: function() {
      return currentScriptId;
    },
    setCurrentScriptID: function(id) {
      currentScriptId = id;
    }
  }
})()
