// example from D3 documentation
var data = [4, 8, 15, 16, 23, 42];

var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 420]);

d3.select('.chart')
  .selectAll('div')
    .data(data)
  .enter().append('div')
    .style('width', function(d) { return x(d) + 'px'; })
    .text(function(d) { return d; });

// Pluarsight tutorial
var w = 150;
var h = 100;
var padding = 2;
var dataset = [5, 10, 15, 20, 25];
var svg = d3.select('.chart2')
						.append('svg')
						.attr('width', w)
						.attr('height', h);

svg.selectAll('rect')
		.data(dataset)
		.enter()
		.append('rect')
			.attr('x', function (d, i) {
				return (i * (w / dataset.length));
			})
			.attr('y', function(d) {
				return h - (d * 4);
			})
			.attr('width', w / dataset.length - padding)
			.attr('height', function (d) {
				return (d * 4);
			})
			.style('fill', '#c8e277');





