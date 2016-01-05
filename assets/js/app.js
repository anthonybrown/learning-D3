d3.select('#output')
	.append('svg')
	.append('rect')
	.attr('width', 50)
	.attr('height', 50)
	.style('fill', 'royalblue');

d3.select('#rect')
	.append('svg')
	.append('rect')
		.attr('width', 50)
		.attr('height', 200)
		.style('fill', 'steelblue');
