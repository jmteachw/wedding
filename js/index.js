//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
	if ($(".navbar").offset().top > 50) {
    	$(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
	$('a.page-scroll').bind('click', function(event) {
    	var $anchor = $(this);
    	$('html, body').stop().animate({
        	scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

/* RSVP submit fucntion */

// Attach a submit handler to the form
$("#rsvpForm").submit(function(event) {
 
	// Stop form from submitting normally
	event.preventDefault();

	// Get some values from elements on the page:
	var $form = $(this),
	firstName = $form.find("input[name='first-name']").val(),
	lastName = $form.find("input[name='last-name']").val(),
	email = $form.find("input[name='email']").val(),
	attending = $form.find("input[name='attending']:checked").val();

	// Send the data using post
	var posting = $.post("http://api.alyandjordan.us:8080/api/rsvp/", { "first_name": firstName, "last_name": lastName, "email": email, "attending": attending === 'true'});

	// Vars for the modal
	var alertClass = 'alert-success';
	var message = 'Success! Thank you for RSVP\'ing!';

	// If the call was a failure
	posting.fail(function(response) {
		if(response.responseText == '{"non_field_errors":["The fields first_name, last_name must make a unique set."]}') {
			alertClass = 'alert-info';
			message = 'You\'re already RSVP\'d!';
		}
		else {
			alertClass = 'alert-danger';
        	message = 'Something went wrong! Please try again later.';
    	}
	});

	// Show the message modal based on result
	posting.always(function() {
		$('#rsvpMessages').removeClass('hide').addClass('alert ' + alertClass + ' alert-dismissible').slideDown().show();
        	$('#rsvpMessagesContent').html('<h4>' + message + '</h4>');
        	$('#modal').modal('show');
	});
});