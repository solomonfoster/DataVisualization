let plotData;
let test;
let test1;

let svg = d3.select("#mainvis")
    .append("svg")
    .attr("height", 1000)
    .attr("width", 1000);


function createScatter(data, xFeature, yFeature) {
    let innerheight = 500;
    let innerwidth = 500;
    let margin = 30;

    let g = svg.append("g")

    let allXPoints = data.map(x => +x[xFeature]),
        allYPoints = data.map(x => +x[yFeature]);


    let xScale = d3.scaleLinear()
        .domain([d3.min(allXPoints), d3.max(allXPoints)])
        .range([margin, innerwidth - margin]);

    let yScale = d3.scaleLinear()
        .domain([d3.min(allYPoints), d3.max(allYPoints)])
        .range([innerheight - margin, margin]);

    test = xScale;
    test1 = allXPoints


    let plotpoint = g.selectAll(".plotpoint")
        .data(data)

    plotpoint.enter()
        .append("circle")
        .attr("class", "plotpoint")
        .attr("cx", d => xScale(+d[xFeature]))
        .attr("cy", d => yScale(+d[yFeature]))
        .attr("r", 3)
        .style("fill", "red")


}


d3.csv("NYC_AB.csv").then(function(data) {
    plotData = data;
    createScatter(plotData, "avg_price", "avg_avail_365");

});
