function save_options() {
  $('#status').hide();
  localStorage['domains'] = $('#domains').val();
  localStorage['number'] = $('#number').val();
  localStorage['highlight'] = $('#highlight').is(':checked');
  $('#status').html('Options Saved.').slideDown();
  setTimeout(function() {
    $('#status').slideUp().empty();
  }, 1000);
}

function restore_options() {
  $('#number').val(localStorage['number']);
  $('#domains').val(localStorage['domains']);
  if (localStorage['highlight'] === 'true') {
    $('#highlight').prop('checked', true);
  }
}

$(restore_options);
$('#save').click(save_options);