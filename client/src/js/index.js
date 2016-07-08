(function() {
  function saveScript(cb) {
    var code = Application.getEditor().getValue();
    var id = Application.getCurrentScriptID();
    // this is a shitty api, fix it as it makes little sense
    Application.runAnalysis();
    var fields = FBOptimise.getURLSafeFieldsAccessed();
    console.log(code, fields);

    if (id) {
      $.ajax({
        url: "scripts/" + id,
        type: "POST",
        dataType: 'json',
        data: {
          code: code,
          optimisations: fields,
          title: 'An Untitled Masterwork'
        },
        success: function(response) {
          console.log(response);
          if(cb) cb();
        },

        error: function() {
          //called when there is an error
        },
      });
    } else {
      $.ajax({
        url: "scripts",
        type: "POST",
        dataType: 'json',
        data: {
          code: code,
          optimisations: fields,
          title: 'An Untitled Masterwork'
        },
        complete: function(response) {
          //called when complete
        },

        success: function(response) {
          Application.setCurrentScriptID(response.id);
          cb();
        },

        error: function() {
        //called when there is an error
        },
      });
    }
  }

  function previewScript() {
    var logbox = $('#logbox');
    logbox.empty();
    logbox.append('<p>Script is running...</p>')
    // this is a shitty api, fix it as it makes little sense
    Application.runAnalysis();
    var fields = FBOptimise.getURLSafeFieldsAccessed();
    var id = Application.getCurrentScriptID();
    $.ajax({
      url: "exec/" + id,
      type: "POST",
      dataType: 'json',
      success: function(response) {
        logbox.empty();
        response.log.forEach(function(log){
          logbox.append('<p>' + log.message + '</p>')
        })
      },
      error: function() {
        //called when there is an error
      },
    });
  }

  function bindEvents() {
    $('#save-button').click(function(){
      saveScript();
    });

    $('#preview-button').click(function() {
      saveScript(previewScript)
    });
  }

  $(document).ready(function() {
    Application.init();
    bindEvents();
  });
})();
