var h  = 100;
var w  = 400;
var ds; // global var for data.

function buildLine() {
	var lineFunc = d3.svg.line()
		.x(function (d) { return ((d.month-20130001) / 3.25); })
		.y(function (d) { return h - d.sales; })
		.interpolate('linear');
	var svg = d3.select('#output').append('svg')
		.attr({
			width  : w,
			height : h
		});
	var viz = svg.append('path')
							.attr({
								d: lineFunc(ds),
								"stroke" : "purple",
								"stroke-width" : 2,
								"fill" : "none"
							});
}

function showTotals () {
	var t = d3.select('#graph2').append('table');

	// get total
	for (var i = 0; i < ds.length; i++) {
		salesTotal += ds[i]['sales']*1; // *1 converts to a number.
	}

	// add the total
	var tr = t.selectAll('tr')
							.data([1])
							.enter()
							.append('tr')
							.append('td')
							.text('Sales Total: ' + salesTotal);
}

d3.csv('assets/MonthlySales.csv', function (error, data) {
	if(error)
		console.log('There was an error')
	else
		console.log(data); // we have data!!
		ds = data;

	buildLine();
	showTotals();
});
