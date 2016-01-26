function InitChart() {
	var data = [
		{
			"Client": "ABC",
			"sale": "202",
			"year": "2000"
		},
		{
			"Client": "ABC",
			"sale": "215",
			"year": "2002"
		},
		{
			"Client": "ABC",
			"sale": "179",
			"year": "2004"
		},
		{
			"Client": "ABC",
			"sale": "199",
			"year": "2006"
		},
		{
			"Client": "ABC",
			"sale": "134",
			"year": "2008"
		},
		{
			"Client": "ABC",
			"sale": "176",
			"year": "2010"
		},
		{
			"Client": "XYZ",
			"sale": "100",
			"year": "2000"
		},
		{
			"Client": "XYZ",
			"sale": "215",
			"year": "2002"
		},
		{
			"Client": "XYZ",
			"sale": "179",
			"year": "2004"
		},
		{
			"Client": "XYZ",
			"sale": "199",
			"year": "2006"
		},
		{
			"Client": "XYZ",
			"sale": "134",
			"year": "2008"
		},
		{
			"Client": "XYZ",
			"sale": "176",
			"year": "2013"
		}
	];

	// create some constants for the SVG chart in the HTML
	var vis = d3.select('#visualization'),
			WIDTH   = 1000,
			HEIGHT  =  500,
			MARGINS = {
				top    : 50,
				right  : 20,
				bottom : 50,
				left   : 50
			},
			// create the xScale
			xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right])
				.domain([d3.min(data, function(d) {
					return d.year; }),
				d3.max(data, function(d) {
					return d.year;

				})]),
			// create the yScale
			yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom])
				.domain([d3.min(data, function(d) {
					return d.sale;
				}),

				d3.max(data, function(d) {
					return d.sale;
				})]),
			// Create the axis using the scales from above
			xAxis = d3.svg.axis()
				.scale(xScale)
				.tickFormat(d3.format('Of'))
			yAxis = d3.svg.axis()
				.scale(yScale)
				.orient('left');
			// Append the created X axis to the svg container
			vis.append('svg:g')
				.attr('class', 'axis')
				.attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')' )
				.call(xAxis);
			vis.append('svg:g')
				.attr('class', 'axis')
				.attr('transform', 'translate(' + (MARGINS.left) + ',0)')
				.call(yAxis);

			// create the line graph
			var lineGen = d3.svg.line()
				.x(function (d) { return xScale(d.year); })
				.y(function (d) { return yScale(d.sale); })
				.interpolate('basis')

			var dataGroup = d3.nest()
						.key(function(d) {
							return d.Client;
						})
						.entries(data);

			// append the lines dynamically
			dataGroup.forEach(function(d, i) {
				vis.append('svg:path')
						.attr('d', lineGen(d.values, xScale, yScale))
						.attr('stroke', function(d, j) {
							return 'hsl(' + Math.random() * 360 + ',100%, 50%)';
						})
						.attr('stroke-width', 2)
						.attr('id', 'line_' + d.key)
						.attr('fill', 'none');

				// define the legend space based on the number of clients our line graphs will be drawing
				lspace = WIDTH / dataGroup.length;

				vis.append('text')
						.attr('x', (lspace / 2) + i * lspace)
						.attr('y', HEIGHT)
						.style('fill', 'purple')
						.attr('class', 'legend')
						.on('click', function () {
							var active  = d.active ? false : true;
							var opacity = active ? 0 : 1

							d3.select('#line_' + d.key)
									.style('opacity', opacity);

							d.active = active
						})
						.text(d.key);

			});
}

InitChart();

// OLD HARD CODED CODE, BEEN REPLACED ABOVE WITH A DYNAMIC WAY

// Dummy data
/*var data = [
	{
    "sale": "202",
    "year": "2000"
	},
	{
    "sale": "215",
    "year": "2001"
	},
	{
    "sale": "179",
    "year": "2002"
	},
	{
    "sale": "199",
    "year": "2003"
	},
	{
    "sale": "134",
    "year": "2003"
	},
	{
    "sale": "176",
    "year": "2010"
	}
];

var data2 = [
	{
    "sale": "152",
    "year": "2000"
	},
	{
    "sale": "189",
    "year": "2002"
	},
	{
    "sale": "179",
    "year": "2004"
	},
	{
    "sale": "199",
    "year": "2006"
	},
	{
    "sale": "134",
    "year": "2008"
	},
	{
    "sale": "176",
    "year": "2010"
	}
];*/

// append the line
//vis.append('svg:path')
//	.attr('d', lineGen(data))
//	.attr('stroke', 'steelblue')
//	.attr('stroke-width', 2)
//	.attr('fill', 'none');
// append another line graph
//vis.append('svg:path')
//	.attr('d', lineGen(data2))
//	.attr('stroke', 'orange')
//	.attr('stroke-width', 2)
//	.attr('fill', 'none');

// Use D3's nest method
