var Event = function(title, date, minutes, type) {
	this.title = title;
	this.date = date;
	this.minutes=minutes;
	this.type=type;

}

var EventLibrary = function() {
	// this.title = title;
	this.agendaList = [];

	// console.log(title);

}
// EventLibrary.prototype.pushEvents= function(object){
EventLibrary.prototype.pushEvents = function(object) {
	
	// console.log(object);
	this.agendaList.push(new Event(object.title, object.date, object.minutes, object.type));
	// console.log(this.agendaList);
}


EventLibrary.prototype.groupEventsType = function() {
	

	var groupMinuteTotal = _.chain(this.agendaList)
							.groupBy(function(data) {
								return data.type;
							})
							.pairs()
							.map(function(x) {
								return [
								x[0],x[1].reduce(function(total,y) {
									return total + y.minutes;
								},0)
								]
							})
							.object()
							.value();

	// console.log(groupMinuteTotal);

	return groupMinuteTotal;



	// return _.groupBy(this.agendaList,function(data) {
	// 	return data.type;
	// })


}
// EventLibrary.prototype.groupEventsWork = function() {
// 	// console.log(object);
// 	var newGroup = _.groupBy(this.agendaList,function(data) {
// 		return data.work;


// 	});
// 	return _.groupBy(this.agendaList,function(data) {
// 		return data.work;
// 	})


// }



// EventLibrary.prototype.groupEventsFamily = function() {
// 	// console.log(object);

// 	return _.groupBy(this.agendaList,function(data) {
// 		return data.family;
// 	})


// }

// EventLibrary.prototype.groupEventsRest = function() {
// 	// console.log(object);

// 	return _.groupBy(this.agendaList,function(data) {
// 		return data.rest;
// 	})


// }






Event.prototype.render= function() {
	var eventList = $('<ul>')
		.append('<li>'+ this.title +'</li>')
		.append('<li>'+ this.type + '</li>')
		.append('<li>' + this.date + '</li>')
		.append('<li>' + this.minutes + '</li>');

	this.$el =$('<div>')
		.addClass('event')
		.append(eventList);

	return this.$el;

}

var newEvent1 = new Event('reading','february 13', 45, 'family');
var newEvent2 = new Event('nap','february 14', 60,'rest');
var newEvent3 = new Event('running', 'february 15',25,'personal');
var newEvent4 = new Event('movie', 'february 18', 120,'personal');
var newEvent5= new Event('coding','february 20', 180, 'work');
var Library = new EventLibrary();
Library.pushEvents(newEvent1);
Library.pushEvents(newEvent2)
Library.pushEvents(newEvent3);
Library.pushEvents(newEvent4);
Library.pushEvents(newEvent5);
console.log('grouped by type ',Library.groupEventsType());
// console.log('grouped by work ',Library.groupEventsWork());
// console.log('grouped by family ',Library.groupEventsFamily());
// console.log('grouped by rest ',Library.groupEventsRest());



$(document).on('ready', function() {
	 // var agendaList = [];

	$(document).on("submit",function(e) {
		e.preventDefault();
		console.log('clicked');
		// console.log(this.agendaList);
		// // $('.agenda').append(agendaList.render());

		var userDate = $('.event-date').val();
		var userEvent=$('.event-title').val();
		// var userType=$('.event-type').val();
		var userTime=+$('.event-time').val();
		var userType=$('#myselect option:selected').text();
		console.log(userType);
		var newEvent = new Event(userEvent,userDate,userTime,userType);
		console.log(newEvent);
		Library.pushEvents(newEvent);
		// $('.agenda').
		// console.log(agendaList);

		// var agendaListElements= agendaList.map(function(response) {
		// 	var userRespEl = $('<div class="agendaOutPut"></div>');
		// 	var eventEl = $('<p class="date">').text(response.userDate);

		// 	var respEl = $('<p class="resp">').text(response.userEvent);
		// 	userRespEl.append(eventEl,respEl);
		// 	return userRespEl;
		// })

		// $('.agenda').append(agendaListElements);

		// $('.agenda').append()


	})   // end of document on submit
  
});