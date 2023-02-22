// Declare constants
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = {left: 100, right: 50, top: 50, bottom: 50}

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right

// Frame1: scatter plot
const FRAME1 = d3.select("#vis1")
					.append("svg")
						.attr("height", FRAME_HEIGHT)
						.attr("width", FRAME_WIDTH)
						.attr("class", "frame"); 

function bar_plot() {
	d3.csv('data/data.csv').then((data) => {

		// scale functions
		const X_SCALE = d3.scaleBand()
							.domain(data.map((d) => {return d.Category}))
		  					.range([0, VIS_WIDTH])
		  					.padding(0.5);

		const Y_SCALE = d3.scaleLinear()
		            		.domain([0, d3.max(data, (d) => {return d.Value})])
		            		.range([VIS_HEIGHT, 0]);

		// create bar rectangles
		FRAME1.selectAll('bars')
		      	.data(data)
			    .enter()
			    .append('rect')
			        .attr('x', (d) => {
			          return (X_SCALE(d.Category) + MARGINS.left)})
			        .attr('y', (d) => {
			          return (Y_SCALE(d.Value) + MARGINS.top)})
			        .attr('width', X_SCALE.bandwidth())
			        .attr('height', (d) => {
			          return (VIS_HEIGHT - Y_SCALE(d.Value))})
			        .attr('class', 'bar')
			        .attr('fill', 'lightblue');

		// create x and y axes
		FRAME1.append("g")
				.attr('transform', 'translate(' + MARGINS.left + "," + 
						(VIS_HEIGHT + MARGINS.top) + ')')
				.call(d3.axisBottom(X_SCALE).ticks(10))
						.attr('font-size', "15px");

		FRAME1.append("g")
				.attr('transform', 'translate(' + MARGINS.left + "," + 
						MARGINS.top + ')')
				.call(d3.axisLeft(Y_SCALE).ticks(10))
						.attr('font-size', "15px");
	})
}

bar_plot();