var Event = function(title, date, minutes, type) {
	this.title = title;
	this.date = moment(date).format('L');
	this.minutes=minutes ;
	this.type=type;

}

var EventLibrary = function() {
	// this.title = title;
	this.agendaList = [];
	// console.log(title);

}
EventLibrary.prototype.pushEvents = function(object) {
	// console.log(object);
	this.agendaList.push(new Event(object.title, object.date, object.minutes, object.type));
	// console.log(this.agendaList);
}
// creating an object of event types and minutes
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

	return groupMinuteTotal;

}



EventLibrary.prototype.dateArray= function() {
	// pluck (Library.agendaList,'date')
	var dateList = _.chain(this.agendaList)
					.pluck('date')
					.sort()
					.value()

	return dateList;
}

EventLibrary.prototype.minuteArray = function() {
	var values        =_.chain(this.agendaList)
					.sortBy('date')
					.pairs()
					.map(function(x,y){
						return x[1].minutes;
					})
					// .chunk(2)
					// .object()
					.value();
					// console.log('minute1',minuteList);

	var keys        = _.chain(this.agendaList)
					.sortBy('date')
					.pairs()
					.map(function(x,y){
						return x[1].type;
					})
					// .chunk(2)
					// .object()
					.value();
					// console.log(rows);
					// console.log(columns);
					
					
					// var result = _.zipObject(minuteList2,minuteList);
					// console.log('zip',result);
					// var object = _.object(result);
					// var chunk = _.chunk(result,2);
					// var object = _.object(result);
					// console.log('object 1',object);
					// console.log('chunk',_.chunk(result,2));
					// console.log('object 2',_.object(result));
					// console.log(_.chunk(result,2));
					// var result = rows.map(function(row) {
					// 	return row.reduce(function(result,field,index){
					// 		result[columns[index]]= field;
					// 		return result
					// 	}, {});
					// });
					// 
					   var newarray = [];
					   for (var i = 0; i < values.length; i++) {
					       var thing = {};
					       // for (var i = 0; i < columns.length; i++) {
					       //     thing[columns[i]] = rows[y][i];
					       // }
					       thing[keys[i]] = values[i];
					       newarray.push(thing);
					   }



	return newarray;
}


EventLibrary.prototype.dateChunking = function() {
	
	return _.chunk(this.dateArray(),2);
}
// }

Event.prototype.render= function() {
	var eventList = $('<p>')
		.append('<p>'+ this.title +'</p>')
		.append('<p>'+ this.type + '</p>')
		.append('<p>' + this.date + '</p>')
		.append('<p>' + this.minutes + '</p>');

	this.$el =$('<div>')
		.addClass('event')
		.append(eventList);

	return this.$el;

}


EventLibrary.prototype.render= function() {
	
	this.agendaLibrary = [];

	for(var i =0; i<this.agendaList.length;i++) {
		// console.log(i);
		// console.log("Agenda list render: ", this.agendaList[i].render());
		var sort = _.sortBy(this.agendaList,'date');
		// console.log(sort);
		this.agendaLibrary.push(sort[i].render())
	};
	console.log(sort);

	console.log(this.agendaLibrary);
	return this.agendaLibrary;


}

var newEvent1 = new Event('reading','13 February,2015', 45, 'family');
var newEvent2 = new Event('nap','14 February,2015', 60,'rest');
var newEvent3 = new Event('running', '15 February,2015',25,'personal');
var newEvent4 = new Event('movie', '18 February,2015', 120,'personal');
var newEvent5= new Event('coding','20 February,2015', 180, 'work');

var newEvent6 = new Event('reading','13 January,2015', 45, 'family');
var newEvent7 = new Event('nap','14 January,2015', 60,'rest');
var newEvent8 = new Event('running', '15 January,2015',25,'personal');
var newEvent9 = new Event('movie', '18 January,2015', 120,'personal');
var newEvent10= new Event('coding','20 January,2015', 180, 'work');

var newEvent11 = new Event('playing at the park','7 January,2015', 90,'family');
var newEvent12 = new Event('grocery shopping','2 February, 2015', 80,'work');
var newEvent13 = new Event('house cleaning', '4 February, 2015', 70,'work');
var newEvent14 = new Event('stretching','1 February, 2015', 20,'rest');
var newEvent15 = new Event('nap','7 February,2015',30,'rest' );



var Library = new EventLibrary();
Library.pushEvents(newEvent1);
Library.pushEvents(newEvent2)
Library.pushEvents(newEvent3);
Library.pushEvents(newEvent4);
Library.pushEvents(newEvent5);

Library.pushEvents(newEvent6);
Library.pushEvents(newEvent7);
Library.pushEvents(newEvent8);
Library.pushEvents(newEvent9);
Library.pushEvents(newEvent10);

Library.pushEvents(newEvent11);
Library.pushEvents(newEvent12)
Library.pushEvents(newEvent13);
Library.pushEvents(newEvent14);
Library.pushEvents(newEvent15);
console.log('grouped by type ',Library.groupEventsType());




$(document).on('ready', function() {
	// $('.carousel').carousel({
	// 	interval:3000
	// })
	var colors_array= ["#31e031", "#63d8ed", "#2143ed", "#6b1717"];
	Morris.Donut({
		element: 'donut',
		colors: colors_array,
		data: [
			{label: 'family',value:Library.groupEventsType().family},
			{label:'personal',value:Library.groupEventsType().personal},
			{label:'rest',value:Library.groupEventsType().rest},
			{label:'work',value:Library.groupEventsType().work}
		],
	});

	Morris.Bar({
		element:'barChart',
		data:[

		{ y: Library.dateChunking()[0], a: 100, b: 90 },
	    { y: Library.dateChunking()[1], a: 75,  b: 65 },
	    { y: Library.dateChunking()[3], a: 50,  b: 40 },
	    { y: Library.dateChunking()[4], a: 75,  b: 65 },
	    { y: Library.dateChunking()[5], a: 50,  b: 40 },
	    { y: Library.dateChunking()[6], a: 75,  b: 65 },
	    { y: Library.dateChunking()[7], a: 100, b: 90 }
		],
		xkey: 'y',
		ykeys:['a','b'],
		labels:['Series A', 'Series B']
	});

	$('.datepicker').pickadate({
		formatSubmit: 'yyyy/mm/dd',
		hiddenName:true
	});


	 

	$(document).on("submit",function(e) {
		e.preventDefault();
		// console.log('clicked');
		// console.log(this.agendaList);
		// // $('.agenda').append(agendaList.render());

		var userDate = $('.event-date').val();
		var userEvent=$('.event-title').val();
		// var userType=$('.event-type').val();
		var userTime=+$('.event-time').val();
		var userType=$('#myselect option:selected').text();
		// console.log(userType);
		var newEvent = new Event(userEvent,userDate,userTime,userType);
		Library.pushEvents(newEvent);

		// console.log(Library.groupEventsType().personal);

		$('.familyMinutes').empty().append($('<span>' +Library.groupEventsType().family +'</span>') );
		$('.restMinutes').empty().append($('<span>' +Library.groupEventsType().rest +'</span>') );
		$('.personalMinutes').empty().append($('<span>' +Library.groupEventsType().personal +'</span>'));
		$('.workMinutes').empty().append($('<span>' +Library.groupEventsType().work +'</span>') );
		


		// $('.agenda').append(Library.agendaList[0].render());
		$('.formInput').trigger('reset');
		// $('.agenda').append(Library.agendaLibrary.render());
		
		$('.agenda').empty().append(Library.render());


	})   // end of document on submit
  
});