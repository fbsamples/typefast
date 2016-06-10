(function() {
  function bindEvents() {
    $('#save-button').click(function() {
      var code = Application.getEditor().getValue();
      Application.runAnalysis();
      var fields = FBOptimise.getURLSafeFieldsAccessed();
      console.log(code, fields);

      $.ajax({
        url: "scripts",
        type: "POST",
        dataType: 'json',
        data: {
          code: code,
          optimisations: fields,
          title: 'TEST TITLE'
        },
        complete: function() {
          //called when complete
        },

        success: function() {
          //called when successful
        },

        error: function() {
          //called when there is an error
        },
      });
    });

    $('#run-button').click(function() {
      console.log('run');
    });
  }

  $(document).ready(function() {
    Application.init();
    bindEvents();
  });
})();
