// user clicked or asked for port changes to be submitted via ajax
function port_control (e) {
  var td = $(e).closest('.nd_editable_cell');

  $.ajax({
    type: 'POST'
    ,url: uri_base + '/ajax/portcontrol'
    ,data: {
      device:  td.data('for-device')
      ,port:   td.data('for-port')
      ,field:  td.data('field')
      ,action: td.data('action')
      ,value:  td.text().trim()
    }
    ,success: function() {
      toastr.info('Submitted change request');
    }
    ,error: function() {
      toastr.error('Failed to submit change request')
    }
  });
}

// for growl-like functionality, check for notifications periodically
(function worker() {
  $.ajax({
    url: uri_base + '/ajax/userlog'
    ,success: function(data) {
      // Schedule next request when the current one's complete
      setTimeout(worker, 5000);
    }
    ,error: function() {
      // after one failure, don't try again
      toastr.warning('Unable to retrieve change request log')
    }
  });
})();
