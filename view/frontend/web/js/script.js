require(['jquery', 'mage/url'], function ($, url) {
	// process the form
	$('#form').submit(function(event) {
		$('.form-group').removeClass('has-error'); // remove the error class
		$('.help-block').remove(); // remove the error text
		var path = $('input[name=path]').val();
		var command = $('select[name=command]').val();

		if(path.length && command.length) {
			var formData = {
				'path' : path,
				'command' 	: command
			};

			// process the form
			$.ajax({
				type 		: 'POST', // define the type of HTTP verb we want to use (POST for our form)
				url 		: url.build('shell/shell/console'), // the url where we want to POST
				data 		: formData, // our data object
				dataType 	: 'json', // what type of data do we expect back from the server
				encode 		: true,
				showLoader	: true
			}).done(function(data) {

				// log data to the console so we can see
				console.log(data); 

				// here we will handle errors and validation messages
				if ( ! data.success) {
					
					// handle errors for path ---------------
					if (data.errors.path) {
						$('#path-group').addClass('has-error'); // add the error class to show red input
						$('#path-group').append('<div class="help-block">' + data.errors.path + '</div>'); // add the actual error message under our input
					}

					// handle errors for command ---------------
					if (data.errors.command) {
						$('#command-group').addClass('has-error'); // add the error class to show red input
						$('#command-group').append('<div class="help-block">' + data.errors.command + '</div>'); // add the actual error message under our input
					}

				} else {
					$("#alert-success").html(data.message);
					$("#alert-success").removeClass('hidden');

				}
			}).fail(function(data) {
				console.log(data);
			});
		}
			
		event.preventDefault();
	});
});
