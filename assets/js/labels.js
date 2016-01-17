var w = 300;
var h = 320;
var padding = 3;
var dataset = [5, 10, 15, 20, 25, 33, 27, 22, 17, 13, 7];
var svg = d3.select('#output').append('svg')
						.attr('width', w)
						.attr('height', h);

function colorPicker (v) {
	if (v <= 20) {
		return 'rgb(' + (v * 10) + ', 70, 130)';
	} else if (v > 20) {
		return '#ff0033';// hot pick
	}
}
svg.selectAll('rect')
		.data(dataset)
		.enter()
		.append('rect')
	.attr({
		x: function(d, i) { return i * (w / dataset.length); },
		y: function(d) { return h - (d * 9); },
		width: w / dataset.length - padding,
		height: function(d) { return d * 9; },
		fill: function (d) { return colorPicker(d); }
});

svg.selectAll('text')
	.data(dataset)
	.enter()
	.append('text')
	.text(function (d) { return d; })
	.attr({
		"text-anchor": "middle",
		x: function (d, i) { return i * (w / dataset.length) + (w / dataset.length - padding) / 2; },
		y: function (d) { return h - (d * 9) + 14; },
		"font-family": "sans-serif",
		"font-size" : 13,
		"fill": "#ffffff"
	});
