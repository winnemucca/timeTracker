Event.prototype.render= function() {
	this.$el= $('#')
}



var userDate = $('.event-date').val();
		var userEvent=$('.event-title').val();
		// var userType=$('.event-type').val();
		var userTime=+$('.event-time').val();
		var userType=$('#myselect option:selected').text();