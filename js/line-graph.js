function linegraph(data, xfactor, yfactor, container, graph, selector) {
  //console.log(data[0]["power"]);
  //console.log(data[0][xfactor]);

  var container_size = d3.select(container).node().getBoundingClientRect();
  var cont_width = container_size.width;
  //var cont_height = container_size.height;

  //console.log(container_size);

  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 45, bottom: 30, left: 45 },
    width = cont_width - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

  // console.log(width);
  // console.log(height);

  // append the svg object to the body of the page
  var svg = d3.select(graph)
    .append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    //.call(d3.zoom().on("zoom", zoom))  
    .attr('background-color', 'orange')
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")")
  //.call(responsivefy);


  // Add X axis (datetime)
  var x = d3.scaleTime()
    .domain(d3.extent(data, function (d) { return d[xfactor]; }))
    .range([0, width]);
  var xAxisComputed = d3.axisBottom(x)
  var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxisComputed);

  // add x axis grid
  // var xGridAdded = svg.append("g")
  //   .attr("transform", "translate(0," + height + ")")
  //   .call(d3.axisBottom(x).tickSize(-height).tickFormat('').ticks(6));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) { return +d[yfactor]; })])
    .range([height, 0]);
  var yAxisComputed = d3.axisLeft(y);
  var yAxis = svg.append("g")
    .call(yAxisComputed);

  // ------- tooltip stuff ---------

  //     var bisectDate = d3.bisector(function(d) { return d.date; }).left;
  //     var formatValue = d3.format(",");
  //     var dateFormatter = d3.timeFormat("%m/%d/%y");


  //   var tooltip = d3.select(container).append("div")
  //     .attr("class", "mytooltip")
  //     .style("position", "absolute")
  //     .style("z-index", "10")
  //     .style("visibility", "hidden")
  //     //.style("display", "none");


  //     var focus = svg.append("g")
  //     .attr("class", "myfocus")
  //     .style("display", "none");

  // focus.append("circle")
  //     .attr("r", 5);

  // var tooltipDate = tooltip.append("div")
  //     .attr("class", "mytooltip-date");

  // var tooltipLikes = tooltip.append("div");
  // tooltipLikes.append("span")
  //     .attr("class", "mytooltip-title")
  //     .text("Likes: ");

  // var tooltipLikesValue = tooltipLikes.append("span")
  //     .attr("class", "mytooltip-likes");

  // svg.append("rect")
  //     .attr("class", "myoverlay")
  //     .attr("width", width)
  //     .attr("height", height)
  //     .attr("opacity", 0)
  //     .on("mouseover", function() { focus.style("display", null); tooltip.style("visibility", "visible");  })
  //     .on("mouseout", function() { focus.style("display", "none"); tooltip.style("visibility", "hidden"); })
  //     .on("mousemove", mousemove);

  // function mousemove() {
  //     var x0 = x.invert(d3.mouse(this)[0]),
  //         i = bisectDate(data, x0, 1),
  //         d0 = data[i - 1],
  //         d1 = data[i],
  //         d = x0 - d0.date > d1.date - x0 ? d1 : d0;
  //     focus.attr("transform", "translate(" + x(d[xfactor]) + "," + y(d[yfactor]) + ")");
  //     tooltip.attr("style", "left:" + (x(d[xfactor]) + 64) + "px;top:" + y(d[yfactor]) + "px;");
  //     tooltip.select(".mytooltip-date").text(dateFormatter(d[xfactor]));
  //     tooltip.select(".mytooltip-likes").text(formatValue(d[yfactor]));
  //     console.log(dateFormatter(d[xfactor]), formatValue(d[yfactor]) );
  // }

  // -------- end tooltip stuff ----------

  // group data by names
  var groupedData = d3.nest()
    .key(function (d) { return d.name; })
    .entries(data);

  // get the names (list of keys)
  var groupNames = groupedData.map(d => { return d.key })

  // color palette
  var groupColor = d3.scaleOrdinal()
    .domain(groupNames)
    .range(['#17a2b8', '#20c997', '#fd7e14', '#dc3545', '#6f42c1', '#28a745', '#a65628', '#f781bf', '#999999'])


  // add the lines
  var lines = svg.selectAll(".line") // select all the things we want to create
    .data(groupedData) // specifiy the data
    .enter() // for each item in groupedData...
    .append("path")
    .attr("fill", "none")
    .attr("stroke", d => { return groupColor(d.key) })
    .attr("stroke-width", 2)
    // don't think we need to add an ititial path, as this is drawn in update
    // .attr("d", d => {
    //   return d3.line()
    //     .x(function (d) { return x(d[xfactor]) })
    //     .y(function (d) { return y(d[yfactor]) })
    //     (d.values)
    // })


  // add clip path to the svg
  d3.select("svg").append("defs").append("clipPath").attr("id", "clip")
    .append("rect").attr("width", width).attr("height", height);
  // add clip path to both lines and areas
  lines.attr("clip-path", "url(#clip)");



  // make the dropdown 
  // dropdown choices correspond to indices in the data array
  var dropdown_choices = [
    { value: 1, text: "Today" },
    { value: 2, text: "Last 3 Days" },
    { value: 3, text: "Last Week" },
    { value: 4, text: "Last Month" },
    { value: 5, text: "All Time" },
    //{ value: 6, text: "Manual Zoom" }
  ];

  // this is a `value` in `dropdown_choices`
  var selected_time = "Last Week";

  // populate dropdown
  d3.select(selector)
    .selectAll("option")
    .data(dropdown_choices)
    .enter()
    .append("option")
    .attr("value", function (option) { return option.value; })
    .text(function (option) { return option.text; });

  // initial selection
  d3.select(selector).property('value', 3);



  // dropdown changes trigger map changes
  d3.select(selector)
    .on("change", function () {
      // call the big update function
      //const selectedText = d3.select('#dropdown option:checked').text();
      //console.log("changed");
      update(d3.select(selector + ' option:checked').text())
    });


  update(selected_time);

  // update the graph according to the selected range
  function update(timeRange) {

    // save to external variable
    selected_time = timeRange;

    console.log("I'm in the update funciton for " + graph)

    // ensure zoom is disabled, we can re-enable it later
    //svg.call(d3.zoom().on("zoom", null));

    // most recent entry is the end date 
    var end_date = d3.max(data, function (d) { return d[xfactor]; });
    var start_date;
    // start date is determined by selector
    if (timeRange == "Today") {
      start_date = d3.timeDay.offset(end_date, -1);
    } else if (timeRange == "Last 3 Days") {
      start_date = d3.timeDay.offset(end_date, -3);
    } else if (timeRange == "Last Week") {
      start_date = d3.timeWeek.offset(end_date, -1);
    } else if (timeRange == "Last Month") {
      start_date = d3.timeWeek.offset(end_date, -4);
    } else if (timeRange == "All Time") {
      start_date = d3.min(data, function (d) { return d[xfactor]; });
    } //else if (timeRange == "Manual Zoom") {
      // enable manual zoom and then return
      //svg.call(d3.zoom().on("zoom", zoom));
      //return
    //} 
    else {
      console.log("ERROR: unknown time range: " + timeRange);
      return
    }

    // rescale the x domain
    x.domain([start_date, end_date]);

    // transition the x axis to the new scale
    xAxis
      .transition()
      .duration(1000)
      .call(d3.axisBottom(x));

    // transition the x axis to the new scale
    // xGridAdded
    //   .transition()
    //   .duration(1000)
    //   .call(d3.axisBottom(x).tickSize(-height).tickFormat('').ticks(6));

    // get the min and max y values that occur in the selected window
    var minY = d3.min(data, (d) => start_date <= d[xfactor] && d[xfactor] <= end_date ? d[yfactor] : NaN);
    var maxY = d3.max(data, (d) => start_date <= d[xfactor] && d[xfactor] <= end_date ? d[yfactor] : NaN);
    //var maxY = d3.max(data, function (d) { return +d[yfactor]; });
    //console.log(minY, maxY);

    // rescale the Y domain based on the selected time range
    y.domain([minY - (0.01 * minY), maxY + (0.01 * maxY)]);

    // transition the y axis to the new scale
    yAxis
      .transition()
      .duration(1000)
      .call(d3.axisLeft(y));

    // transition the lines to the new scale
    lines
      .transition()
      .duration(1000)
      .attr("d", function (d) {
        return d3.line()
          .x(function (d) { return x(d[xfactor]) })
          .y(function (d) { return y(d[yfactor]) })
          (d.values)
      });
  }


  // zoom function called on chart zoom
  function zoom() {
    // re-scale axes during zoom; ref [2]
    xAxis.transition()
      .duration(50)
      .call(xAxisComputed.scale(d3.event.transform.rescaleX(x)));

    yAxis.transition()
      .duration(50)
      .call(yAxisComputed.scale(d3.event.transform.rescaleY(y)));

    //console.log(xAxis.extent())

    var new_xScale = d3.event.transform.rescaleX(x);
    //console.log(d3.event.transform);
    var new_yScale = d3.event.transform.rescaleY(y);
    //var maxY = d3.max(data, d => minX <= d.date && d.date <= maxX ? d.value : NaN)

    lines.attr("d", function (d) {
      return d3.line()
        .x(function (d) { return new_xScale(d[xfactor]) })
        .y(function (d) { return new_yScale(d[yfactor]) })
        (d.values)
    });

  }

  function responsivefy(svg) {
    console.log("responsivefy");
    // container will be the DOM element
    // that the svg is appended to
    // we then measure the container
    // and find its aspect ratio
    const container = d3.select(svg.node().parentNode);
    width = parseInt(svg.style('width'), 10);
    height = parseInt(svg.style('height'), 10);
    const aspect = width / height;

    // set viewBox attribute to the initial size
    // control scaling with preserveAspectRatio
    // resize svg on inital page load
    svg.attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMinYMid')
      .call(resize);

    // add a listener so the chart will be resized
    // when the window resizes
    // multiple listeners for the same event type
    // requires a namespace, i.e., 'click.foo'
    // api docs: https://goo.gl/F3ZCFr
    d3.select(window).on(
      'resize.' + container.attr('id'),
      resize
    );

    // this is the code that resizes the chart
    // it will be called on load
    // and in response to window resizes
    // gets the width of the container
    // and resizes the svg to fill it
    // while maintaining a consistent aspect ratio
    function resize() {
      const w = parseInt(container.style('width'));
      svg.attr('width', w);
      //svg.attr('height', Math.round(w / aspect));
      svg.attr('height', 350);
      //zoom();

    }
  }
}
