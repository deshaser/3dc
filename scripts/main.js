var opts = {
  angle: 0.5,
  lineWidth: 0.06,
  colorStop: '#6F6EA0',
  strokeColor: '#EEEEEE'
};
var target = $('#loader')[0];
var gauge = new Donut(target).setOptions(opts);
gauge.maxValue = 100;
gauge.animationSpeed = 30;
gauge.set(20);


$("body").on("loaded", function() {
  $('#loaderContainer').fadeOut(500);
});
