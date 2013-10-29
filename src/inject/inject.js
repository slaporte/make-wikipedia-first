
function move_wp() {
	var retries = 3;
	// using another timer to ensure we catch instant search...
	var update_delay = setInterval(function() {
		if (retries > 0) {
			clearInterval(update_delay);
		}
		var wikis = [];
		$('cite:contains("wikipedia")').each(function(i, e) { 
			wikis.push($(e).parents().eq(4).remove());
		});
		$('#rso').prepend(wikis);
		retries --;
	}, 50);
}

var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		console.log('Moving Wikipedia to #1');
		clearInterval(readyStateCheckInterval);
		move_wp();
		$("#appbar").bind("DOMSubtreeModified", function() {
		    move_wp();
		});
	}
}, 100);

