var svg = d3.select(".inner")
    .append("svg")
    .append("g")

svg.append("g")
    .attr("class", "slices");
svg.append("g")
    .attr("class", "labels");

var $inner = $('.inner'),
    width = $inner.width(),
    height = $inner.outerHeight(),
    radius = Math.min(width, height) / 2;

svg.append("text")
    .attr('alignment-baseline', 'central')
    .attr('text-anchor', "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", width / 9)
    .text('£' + document.querySelector('.total').value);

var canvas = d3.select('.inner svg');
canvas
    .attr('preserveAspectRatio', 'xMinYMin')
    .attr('viewBox', '0 0 ' + width + ' ' + height)

var pie = d3.layout.pie()
    .sort(null)
    .value(function (d) {
      return d.value;
    });

var arc = d3.svg.arc()
    .outerRadius(radius * 1)
    .innerRadius(radius * 0.5);

var outerArc = d3.svg.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var key = function (d) {
  return d.data.label;
};

var color = d3.scale.ordinal()
    .domain(["State", "Private", "Shortfall"]);

function getData() {
  var labels = color.domain();
  return labels.map(function (label) {
    return { label: label, value: parseInt(document.querySelector('.' + label.toLowerCase()).value) }
  });
}

change(getData());

d3.selectAll("input")
    .on("change", function () {
      change(getData());
    });


function change(data) {

  /* ------- PIE SLICES -------*/
  var slice = svg.select(".slices").selectAll("path.slice")
      .data(pie(data), key);

  slice.enter()
      .insert("path")
      .attr("class", function (d) {
        return "slice slice-" + d.data.label.toLowerCase();
      });

  slice
      .transition().duration(1000)
      .attrTween("d", function (d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
          return arc(interpolate(t));
        };
      })

  slice.exit()
      .remove();

};
