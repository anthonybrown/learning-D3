var w = 200;		 // set the width of the svg container.
var h = 100;		 // set the height of the svg container.
var padding = 2; // give some padding to the svg rect.
var dataset = [5, 10, 15, 20, 25]; // defining a dataset.
var svg = d3.select('#output').append('svg') // create and append the svg instance to an HTML element.
						.attr('width', w)                // set the 'width' to the variable w.
						.attr('height', h);							 // set the 'height' to the variable h.

// add a function to pick the color
function colorPicker (v) {
	if (v <= 20) {
		return '#777';
	} else if (v > 20) {
		return '#ff00ff';
	}
}

svg.selectAll('rect')												 // add the rectangles with selectAll('rect')
		.data(dataset)													 // set the data to the dataset from above
		.enter()																 // append the rectanlges
		.append('rect')
	.attr({
		x: function(d, i) { return i * (w / dataset.length); },
		y: function(d) { return h - (d * 4); },
		width: w / dataset.length - padding,
		height: function(d) { return d * 4; },
		fill: function(d) { return 'rgb(' + (d * 10) + ', 70, 130)';}
});// we can also creat an Object to contain all the code.

			// this is a messy way of adding attributes one by one.
			// but a good way to learn how D3 works.

			//.attr('x', function(d, i) { // d is how to reference the dataset, i is the index
			//	return i * (w / dataset.length); // set the x position of the bar by the order according to the dataset.
			//})
			//.attr('y', function(d) {// set the y function, just going to use the dataset
			//	return h - (d*4);// have to take the height and subtract the data element
			// }) // this sets it at the bottom
			//.attr('width', w / dataset.length - padding)// setting the width by dividing the length of the dataset minus the padding.
			//.attr('height', function (d) {// setting the height which will be dynmaic depending on the dataset
			//   return d * 4;// we know the height is 100 and the dataset is from 5 to 25, 4 * 25 = 100
			//})
			//.attr('fill', function (d) {
			//	return 'rgb(' + (d * 10) + ', 70, 130)';
			//});// add some color to the bars.
