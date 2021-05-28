var HIGHLIGHT_COLOR = 'rgba(255, 255, 204, 0.5)';
var options = {};

chrome.extension.sendMessage({type:'getPref', key:'domains'}, function(result) {
    var ret = result || ['wikipedia'];
    if (typeof ret === 'string') {
    ret = ret.split(', ');
  }
    options['domains'] = ret;
});

chrome.extension.sendMessage({type:'getPref', key:'number'}, function(result) {
    options['number'] = result || 'all';
});

chrome.extension.sendMessage({type:'getPref', key:'highlight'}, function(result) {
    options['highlight'] = result || false;
});

function move_results() {
  var retries = 4;
  // using another timer to ensure we catch instant search...
  var update_delay = setInterval(function() {
    if (retries > 0) {
      clearInterval(update_delay);
    }
    var results = [];
    for (var i = 0; i < options['domains'].length; i++) {
      var domain = options['domains'][i];
      if (options['number'] === 'first') {
        if (options['highlight'] === 'true') {
          results.push($('cite:contains("' + domain + '")').parents().eq(3).css('background', HIGHLIGHT_COLOR).remove());
        } else {
          results.push($('cite:contains("' + domain + '")').parents().eq(3).remove());
        }
      } else if (options['number'] === 'all') {
        $('cite:contains("' + domain + '")').each(function(i, e) {
          if (options['highlight'] === 'true') {
            $(e).parents().eq(3).css('background', HIGHLIGHT_COLOR);
          }
          results.push($(e).parents().eq(3).remove());
        });
      }
    }
    $('#rso').prepend(results);
    retries --;
  }, 50);
}

var readyStateCheckInterval = setInterval(function() {
  if (document.readyState === "complete") {
    console.log('Moving Wikipedia to #1');
    clearInterval(readyStateCheckInterval);
    move_results();
    $("#appbar").bind("DOMSubtreeModified", function() {
      move_results();
    });
  }
}, 100);

