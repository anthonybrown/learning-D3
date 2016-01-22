// Home page line graph for cyglass ui
function timeConverter(timestamp){
  var a = new Date(timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time =  month + ' ' + date;
  return time;
}


function initializeLineGraph(rawData) {
	var linegraph_div = "line_graph";
	//alert(JSON.stringify(rawData.data));
	var histData = [];
	for(var i = 0; i < rawData.data.length; i++) {
		// alert(JSON.stringify(histData.data[i].ipproto)+ " "+histData.data[i].snapshotstart);
		for ( var j = 0; j < rawData.data[i].ipproto.length; j++) {
			//alert (histData.data[i].snapshotstart +  " "+ JSON.stringify(histData.data[i].ipproto[j]));
			var protoKey = Object.keys(rawData.data[i].ipproto[j])[0];
			var protoCount = rawData.data[i].ipproto[j][protoKey];
			var date = timeConverter(rawData.data[i].snapshotstart*1);
			histData.push({snapshotstart:date, ipproto:protoKey, packetcount:protoCount} );
		}
  }

	//Set the dimensions of the canvas / graph
	var linegraph_margin = {top: 30, right: 10, bottom: 100, left: 80};
	var width = document.getElementById(linegraph_div).clientWidth - linegraph_margin.left - linegraph_margin.right;

	//var width =700;
	var height = 295 - linegraph_margin.top - linegraph_margin.bottom;

	// Set the ranges
	var x = d3.scale.ordinal().rangeRoundBands([0, width],1);
	var y = d3.scale.linear().range([height, 0]);

	// Define the axes
	var linegraph_xAxis = d3.svg.axis().scale(x)
		.orient("bottom").ticks(8);
	var linegraph_yAxis = d3.svg.axis().scale(y)
		.orient("left").tickFormat(d3.format("s"));

	// Define the line
	var countline = d3.svg.line()

		.x(function(d) { return x(d.snapshotstart); })
		.y(function(d) { return y(d.packetcount); });

	//Adds the svg canvas
	var linegraph_svg = d3.select("#" + linegraph_div).append("svg").attr("id","svgHId")
	.attr("width", width + linegraph_margin.left + linegraph_margin.right)
	.attr("height", height + linegraph_margin.top + linegraph_margin.bottom)
	.append("g")
	.attr("transform", "translate(" + linegraph_margin.left + "," + linegraph_margin.top + ")");

	// Get the data
	histData.forEach(function(d) {
		d.packetcount = +d.packetcount;
	});

	//histData.sort(function(a, b) { return d3.ascending(a.snapshotstart, b.snapshotstart); });

	// Scale the range of the data
	x.domain(histData.map(function(d) { return d.snapshotstart; }));
	y.domain([0, d3.max(histData, function(d) { return d.packetcount; })]);

	// Nest the entries by ipproto
	var dataNest = d3.nest()
		.key(function(d) {return d.ipproto;})
		.entries(histData);
	var color = d3.scale.category10(); // set the colour scale
	legendSpace = width/dataNest.length; // spacing for the legend
	function xx(e) { return x(e.snapshotstart); }
	function yy(e) { return y(parseInt(e.packetcount)); }
	// Loop through each ipproto / key
	dataNest.forEach(function(d,i) {
		linegraph_svg.append("path")
			.attr("class", "line")
			.style("stroke", function() { // Add the colours dynamically
				return d.color = color(d.key); })
				.attr("id", 'tag'+d.key.replace(/\s+/g, '').replace('(','').replace(')',''))// assign ID
				.attr("d", countline(d.values));

		// Add the Legend
		linegraph_svg.append("text")
			.attr("x", (legendSpace/2)+i*legendSpace) // space legend
			.attr("y", height + (linegraph_margin.bottom/2)+30)
			.attr("class", "legend")// style the legend
			.style("cursor", "pointer")
			.style("fill", function() { // Add the colors dynamically
				return d.color = color(d.key); })
				.on("click", function(){
					// Determine if current line is visible
					var active = d.active ? false : true,
						newOpacity = active ? 0 : 1;
					// 	Hide or show the elements based on the ID
					d3.select("#tag"+d.key.replace(/\s+/g, '').replace('(',''))
					.transition().duration(100)
					.style("opacity", newOpacity);
					// Update whether or not the elements are active
					d.active = active;
				})
				//.on('click', function () { d3.select('.circle').attr('opacity', 0); })
				.text(d.key);


		linegraph_svg
		.selectAll("circle")
		.data(histData)
		.enter().append("circle")
		.style("fill", function(d){
			return color(d.ipproto)
		})
		.style("stroke", function(d){
			return color(d.ipproto)
		})
		.attr("r", 4)
		.attr("cx", xx)
		.attr("cy", yy)
		.attr('opacity', 1)
		.attr("class", "circle")
		.on("mouseover", function(d) { d3.select(this).attr("r", 6); showDataHist(this, d.packetcount);})
		.on("mouseout", function(){  d3.select(this).attr("r", 4); hideData();})
		.on("contextmenu", function(d) {
			showpopup(this,d);
			return false;
		})
		.attr("id", 'tag'+d.key.replace(/\s+/g, '').replace('(','').replace(')',''))
		//.on('click', function () { d3.select(this).attr('opacity', 0); hideData(); });

	});

	linegraph_svg.append("text")
		.attr("x", width-70)
		.style("fill", "red")
		.text(getCurrentDate());

	//Label for Y-axis
	linegraph_svg.append("text")
	.attr("transform", "rotate(-90)")
	.attr("x", -120)
	.attr("y",height-235)
	.style("text-anchor", "start")
	.text("Packet Count");
//	Label for x-axis
//	linegraph_svg.append("text")
//	.attr("transform", "rotate(-90)")
//	.attr("x", -65)
//	.attr("y",height+40)
//	.style("text-anchor", "start")
//	.text("Month and Day");

	// Add the X Axis
	linegraph_svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(linegraph_xAxis)
		.selectAll("text")
		//.attr("y", 8)
		//.attr("x", 6)
		.attr("dx", "-.8em")
		.attr("dy", ".35em")
		.attr("transform", "rotate(-60)")
		.style("text-anchor", "end")
		.style("cursor", "pointer");

	// Add the Y Axis
	linegraph_svg.append("g")
		.attr("class", "y axis")
		.call(linegraph_yAxis);
}

function showDataHist(obj, d) {
	var coord = d3.mouse(obj);
	var infobox = d3.select(".infobox");
	// now we just position the infobox roughly where our mouse is
	infobox.style("left", (coord[0] + 90) + "px" );
	infobox.style("top", (coord[1])+100 + "px");
	$(".infobox").html(d);
	$(".infobox").show();
}

function hideData() {
	$(".infobox").hide();
}

function getCurrentDate() {
	var currentDate = new Date();
	var date = currentDate.getDate();
	var year = currentDate.getFullYear();
	var month = currentDate.getMonth();
	return (month+1)+"/"+date+"/"+year;
}
