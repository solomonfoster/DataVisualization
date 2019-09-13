let plotData;
let test;
let test1;

let svg = d3.select("#mainvis")
    .append("svg")
    .attr("height", 1200)
    .attr("width", 1200)

function createScatter(data, xFeature, yFeature, offset) {
    let innerheight = 360;
    let innerwidth = 360;
    let margin = 50;

    let g = svg.append("g")
        .attr("class", "innerplot")
        .attr("transform", "translate(" + 330*offset[0] + ", " + 330*offset[1] + ")")

    let allXPoints = data.map(x => +x[xFeature]),
        allYPoints = data.map(x => +x[yFeature]);

    let xScale = d3.scaleLinear()
        .domain([d3.min(allXPoints), d3.max(allXPoints)])
        .range([margin, innerwidth - margin]);

    let yScale = d3.scaleLinear()
        .domain([d3.min(allYPoints), d3.max(allYPoints)])
        .range([innerheight - margin, margin]);

    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    if (offset[1] == 0) {
        let xAxis = d3.axisTop()
            .scale(xScale);

        g.append("g")
            .call(xAxis)
            .attr("transform", "translate(0, " + margin + ")");

    } else if (offset[1] == 2) {
        let xAxis = d3.axisBottom()
            .scale(xScale);

        g.append("g")
            .call(xAxis)
            .attr("transform", "translate(0, " + (innerheight - margin) + ")");
    }

    if (offset[0] == 0) {
        let yAxis = d3.axisLeft()
            .scale(yScale);

        g.append("g")
            .call(yAxis)
            .attr("transform", "translate(" + margin + ", 0)");

    } else if (offset[0] == 2) {
        let yAxis = d3.axisRight()
            .scale(yScale);

        g.append("g")
            .call(yAxis)
            .attr("transform", "translate(" + (innerwidth - margin) + ", 0)");
    }

    if (offset[1] == 0) {
        function make_x_gridlines() {
            return d3.axisTop(xScale)
                .ticks(10)
        }

        g.append("g")
            .attr("class", "grid")
            .attr("transform", "translate(0, " + margin + ")")
            .call(make_x_gridlines()
                .tickSize(-(innerheight*3 - margin*3))
                .tickFormat("")
            )

        g.append("text")
            .attr("x", 150)
            .attr("y", 15)
            .text(xFeature)
            .style("font", "14px Roboto")
    }

    if (offset[0] == 0) {
        function make_y_gridlines() {
            return d3.axisLeft(yScale)
                .ticks(10)
        }

        g.append("g")
            .attr("class", "grid")
            .attr("transform", "translate(" + margin + ",0)")
            .call(make_y_gridlines()
                .tickSize(-(innerwidth*3 - margin*3))
                .tickFormat("")
            )

        g.append("text")
            .attr("x", 15)
            .attr("y", 200)
            .text(yFeature)
            .style("font", "14px Roboto")
            .attr("transform", "rotate(-90, 10, 200)")
    }

    let plotpoint = g.selectAll(".plotpoint")
        .data(data)

    plotpoint.enter()
        .append("circle")
        .attr("class", "plotpoint")
        .attr("cx", d => xScale(+d[xFeature]))
        .attr("cy", d => yScale(+d[yFeature]))
        .attr("r", 3)
        .style("fill", d => colorScale(d["neighbourhood_group"]))
        .append("title")
            .text(d => d["neighbourhood"]);


    if (offset[0] == offset[1]) {
        createKey();
    }

    //Helper function to create plot key
    function createKey() {
        let boroughs = Array.from(new Set(plotData.map(x => x["neighbourhood_group"])));

        g.append("rect")
            .attr("x", 55)
            .attr("y", 55)
            .attr("height", 90)
            .attr("width", 100)
            .style("fill", "white")

        let keylabels = g.selectAll(".keylabels")
            .data(boroughs);

        keylabels.enter()
            .append("text")
            .attr("x", 70)
            .attr("y", (d, i) => i*17 + 70)
            .style("font", "12px Roboto")
            .text(d => d);

        let keysymbols = g.selectAll(".keysymbols")
            .data(boroughs);

        keysymbols.enter()
            .append("circle")
            .attr("cx", 63)
            .attr("cy", (d, i) => i*17 + 66)
            .attr("r", 3)
            .style("fill", d => colorScale(d));
    }
}


d3.csv("NYC_AB.csv").then(function(data) {
    plotData = data;

    let features = plotData["columns"].slice(2,5);
    for (i = 0; i < features.length; i++) {
        for (j = 0; j < features.length; j++) {
            createScatter(plotData, features[i], features[j], [i, j]);
        }
    }

});
