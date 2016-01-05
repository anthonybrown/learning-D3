d3.select('#text')// first we need to select an element
	.append('svg') // then append the type of element
		.attr('width', 300) // provide the width
		.attr('height', 150) // provide the height
	.append('text') // append the type of svg element
		.text('Text with D3 is Easy Peasy!') // adding text
		.attr('y', 50) // set the y coordinate
		.attr('x', 0) // set the x coordinate
			.style('fill', '#EA54CC'); // provide a style
