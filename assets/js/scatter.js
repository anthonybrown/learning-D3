	// SCATTER PLOT
var h = 350;
var w = 400;

// Data Source
monthlySales = [
	{ 'month': 10, 'sales': 90 },
	{ 'month': 20, 'sales': 140 },
	{ 'month': 30, 'sales': 250 },
	{ 'month': 40, 'sales': 300 },
	{ 'month': 50, 'sales': 265 },
	{ 'month': 60, 'sales': 225 },
	{ 'month': 70, 'sales': 180 },
	{ 'month': 80, 'sales': 120 },
	{ 'month': 90, 'sales': 155 },
	{ 'month': 100, 'sales': 137 }
];

// Key points indicator color
function salesKPI (d) {
	if (d >= 250) {
		return '#3c7';
	} else if (d < 250) {
		return '#555';
	}
}

// show min or max function
function showMinMax (ds, col, val, type) {
	var max = d3.max(ds, function (d) { return d[col]; });
	var min = d3.min(ds, function (d) { return d[col]; });

	if (type == 'minmax' && (val == max || val == min) ) {
		return val;
	} else if (type == 'all') {
		return val;
	}
}

// Create our SVG
var svg = d3.select('#plot').append('svg')
	.attr({
		width  : w,
		height : h
	});

// add dots
var dots = svg.selectAll('circle')
	.data(monthlySales)
	.enter()
	.append('circle')
	.attr({
		cx     : function (d) { return d.month * 3; },
		cy     : function (d) { return h - d.sales; },
		r      : 5,
		'fill' : function (d) { return salesKPI(d.sales); }
	});

// Add Labels
var labels = svg.selectAll('text')
	.data(monthlySales)
	.enter()
	.append('text')
	.text(function (d) { return showMinMax(monthlySales, 'sales', d.sales, 'minmax') })
	.attr({
		x: function (d) { return (d.month * 3) - 30; },
		y: function (d) { return h - d.sales; },
		'font-size'   : '12px',
		'font-family' : 'sans-serif',
		'fill'			  : '#555555',
		'text-anchor' : 'start'
	});







