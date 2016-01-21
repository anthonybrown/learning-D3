var h = 350;
var w = 400;

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

var lineFunc = d3.svg.line()
			.x(function (d) { return d.month * 3; })
			.y(function (d) { return h - d.sales; })
			.interpolate('linear');

var svg = d3.select('#output')
		.append('svg')
		.attr({
			width : w,
			height: h
		});

var viz = svg.append('path')
		.attr({
			d: lineFunc(monthlySales),
			'stroke'      : 'purple',
			'stroke-width': 2,
			'fill'				: 'none'
		});
// add labels
var labels = svg.selectAll('text')
	.data(monthlySales)
	.enter()
	.append('text')
	.text(function (d) { return d.sales })
	.attr({
		x: function(d) { return d.month * 3 - 25; },
		y: function(d) { return h - d.sales; },
		'font-size': '12px',
		'font-family': 'sans-serif',
		'fill': '#333',
		'text-anchor': 'start',
		'dy': '.35em',
		'font-weight': function(d, i) {
			if (i === 0 || i == (monthlySales.length - 1)) {
				return 900;// bold
			} else {
				return 200; // thin. I like setting the font-weight this way for performance and better control.
			}
		}
	});

	// SCATTER PLOT

	svg = d3.select('#plot').append('svg')
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
			cx     : function () { return d.month * 3; },
			cy     : function () { return h - d.sales; },
			r      : 5,
			'fill' : '#555'
		});








