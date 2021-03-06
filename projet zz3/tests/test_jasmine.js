 function barChart() {
        var that = {};
        var data = null;
        var margin = {
            top: 40,
            right: 0,
            bottom: 40,
            left: 40
        };
        var h = 500 - margin.top - margin.bottom, w = 500 - margin.top, x, y;
        var svg = d3.select('body').append('svg')
            .attr('height', '500')
            .attr('width', '500')
            .append('g')
            .attr("transform", "translate(" + margin.left + ", " + margin. top +")");
        // add axis
        svg.append("g")
            .attr("class", "x_axis")
            .attr("transform", "translate(0," + h + ")");
        svg.append("g")
            .attr("class", "y_axis");
        that.setData = function(d) {
            data = d;
        };
        that.getData = function() {
            return data;
        };
        that.render = function() {
            if (! data) return;
            x = d3.scale.ordinal().rangeRoundBands([0, w], .05);
            x.domain(data.map(function(d) {
                return d.date;
            }));
            y = d3.scale.linear().range([h, 0]);
            y.domain([0, d3.max(data, function(d) {
                return d.value;
            })]);
            xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");
            yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            var bars = svg.selectAll('.bar').data(this.getData());
            bars.enter().append('rect')
            .attr("fill","#82A600");
            bars.exit().transition()
                .duration(500)
                .attr("height", 0)
                .remove();
            bars
                .transition()
                .duration(500)
                .attr('class', 'bar')
                .attr("x", function(d) {
                    return x(d.date);
                })
                .attr("width", x.rangeBand())
                .attr("y", function(d) {
                    return y(d.value);
                })
                .attr("height", function(d) {
                    return h - y(d.value);
                });
            svg.selectAll("g.x_axis")
                .call(xAxis);
            svg.selectAll("g.y_axis")
                .call(yAxis);
           
        };
        
        return that;
    }
    
    var oldData =  [{ date: '04', value: 100}, { date: '02', value: 70}, {date: '03', value: 80}];
    var newData = [{ date : '09', value : 40}, { date : '04', value : 120} ];
    var switched = false;
    d3.select('#switch').on('click', function() {
      var data = switched? oldData : newData;
      c.setData(data);
      c.render();
      switched = !switched;
    });
    c = barChart();
    c.setData(oldData);
    c.render();