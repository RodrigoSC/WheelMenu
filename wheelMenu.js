window.wheelMenu = function(divid, selectedSlice, text, icons){

var dOrig, dChanged;
var iconPos = {x: 0, y: -68};
var minHeight = 100;
var maxHeight = 115;
var midPoint = maxHeight + 5;
var centerRadius = 40;
var animationDuration = 50;
var that = this;

that.canvas = {};

var init = function (divid, selectedSlice, text, icons) { 
	dOrig = buildPath(minHeight);
	dChanged = buildPath(maxHeight);
	that.canvas = d3.select(divid).append('svg')
		.attr('viewBox', '0 0 ' + midPoint*2 + ' ' + midPoint*2)
		.attr('preserveAspectRatio','xMinYMin meet')
		.classed('pie', true);
	for (var i = 0; i < 6; i++) {
		var tOrig = 'translate(' + midPoint + ',' + midPoint + ') rotate(' + (i*60) + ')';
		var g = that.canvas.append('g')
			.datum({slice: i})
			.classed('slice' + i, true)
			/* jshint -W083 */
			.on('mouseout', function(d) {that.updatePath(d.slice, dOrig);})
			.on('mouseover', function(d) {that.updatePath(d.slice, dChanged);})
			.on('click', function(d) {that.selectSlice(d.slice);})
			/* jshint +W083 */
			.attr('transform', tOrig);
		g.append('path')
			.attr('d', dOrig);
		g.append('text')
			.classed('icon', true)
			.text(icons[i])
			.datum({slice: i});
	}
	that.canvas.append('circle')
		.classed('center', true)
		.attr('cx', midPoint)
		.attr('cy', midPoint)
		.attr('r', centerRadius);
	that.canvas.append('text')
		.classed('centerText', true)
		.text('Hello');
	that.setText(text);
	centerText(that.canvas.selectAll('text.icon'), iconPos.x, iconPos.y);
	that.canvas.selectAll('text.icon').attr('transform', function(d) {return 'rotate(-'+ (d.slice *60) + ', '+ iconPos.x +', ' + iconPos.y + ')';});
	that.selectSlice(selectedSlice);
};

that.updatePath = function (i, path) {
	var pelem = that.canvas.select('g.slice'+i);
	if (!pelem.classed('selected'))
		pelem.select('path')
			.transition()
			.duration(animationDuration)
			.attr('d', path);
};

that.selectSlice = function (slice) {
	that.canvas.select('g.selected')
		.each(function(d,i){that.canvas.select('circle.center').classed('slice'+d.slice, false);})
		.select('text.icon')
		.attr('transform', rotate);
	that.canvas.select('g.selected')
		.classed('selected', false)
		.select('path')
		.transition()
		.duration(animationDuration)
		.attr('d', dOrig);
	that.canvas.select('g.slice' + slice)
		.classed('selected',true)
		.select('path')
		.transition()
		.duration(animationDuration)
		.attr('d', dChanged);
	that.canvas.select('g.slice' + slice)
		.select('text.icon')
		.attr('transform', function (d) {return 'translate(0, -10) ' + rotate(d);});

	that.canvas.select('circle.center')
		.classed('slice'+slice, true);
	that.onSelect(slice);
};

that.onSelect = function (slice) {};

that.setText = function (text) {
	var textElem = that.canvas.select('text.centerText');
	textElem.style('font-size', null);
	textElem.text(text);
	var textSize = parseInt(textElem.style('font-size'));
	while ($(textElem.node()).width() > (centerRadius*2 - 15) && textSize > 3) {
		textElem.style('font-size', textSize + 'px');
		textSize --;
	}
	centerText(textElem, midPoint, midPoint);
};

that.spin = function (turns, endSlice) {
	var oldDuration = animationDuration;
	animationDuration = 0;
	var i = 0;
	turns = Math.floor(turns / 6) * 6 + endSlice;
	var go = function () {
		i = i + 1;
		if (i<turns) d3.timer(go, d3.ease('quad-in')(i/turns)*200);
		else animationDuration = oldDuration;
		that.selectSlice(i % 6);
		return true;
	};
	go();
};

var rotate = function (d) {
	return 'rotate(-'+ (d.slice *60) + ', '+ iconPos.x +', ' + iconPos.y + ')';
};

var centerText = function (textElem, x, y) {
	textElem.attr('x', x - $(textElem.node()).width()/2);
	textElem.attr('y', y + $(textElem.node()).height()/3); // over 3 to compensate ascend. Totally made up...
};

var buildPath = function(height) {
	var trig = {cos: 0.5, sin: 0.866};

	return 'm0,0' +
		'l-' + (height * trig.cos) + ',-' + (height * trig.sin) +
		'a' + height + ',' + height + ' 0 0,1 ' + height + ',0' +
		'l-' +  (height * trig.cos) + ',' + (height * trig.sin) + 'z';
};

init(divid, selectedSlice, text, icons);

};
