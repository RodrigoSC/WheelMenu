(function(wheelMenu){

var dOrig, dChanged;
var parentId = '';
var iconPos = {x: 0, y: -60};
var canvas = {};
var minHeight = 100;
var maxHeight = 115;
var midPoint = maxHeight + 5;

wheelMenu.init = function (divid, selectedSlice, text, icons) { 
	dOrig = buildPath(minHeight);
	dChanged = buildPath(maxHeight);
	parentId = divid;
	canvas = d3.select(parentId).append('svg')
		.attr('viewBox', '0 0 ' + midPoint*2 + ' ' + midPoint*2)
		.attr('preserveAspectRatio','xMinYMin meet')
		.classed('pie', true);
	for (var i = 0; i < 6; i++) {
		var tOrig = 'translate(' + midPoint + ',' + midPoint + ') rotate(' + (i*60) + ')';
		var g = canvas.append('g')
			.classed('slice' + i, true)
			.attr('onmouseover', 'wheelMenu.updatePath(this, "' + dChanged + '");')
			.attr('onmouseout', 'wheelMenu.updatePath(this, "' + dOrig + '");')
			.attr('onmouseup', 'wheelMenu.selectSlice('+i+');')
			.attr('transform', tOrig);
		g.append('path')
			.attr('d', dOrig);
		g.append('text')
			.classed('icon', true)
			.text(icons[i])
			.datum({slice: i});
	}
	canvas.append('circle')
		.classed('center', true)
		.attr('cx', midPoint)
		.attr('cy', midPoint)
		.attr('r', 40);
	canvas.append('text')
		.classed('centerText', true)
		.text('Hello');
	setText(text);
	centerText(canvas.selectAll('text.icon'), iconPos.x, iconPos.y);
	canvas.selectAll('text.icon').attr('transform', function(d) {return 'rotate(-'+ (d.slice *60) + ', '+ iconPos.x +', ' + iconPos.y + ')';});
	wheelMenu.selectSlice(selectedSlice);
};

wheelMenu.updatePath = function (elem, path) {
	var pelem = d3.select(elem);
	if (!pelem.classed('selected'))
		pelem.select('path').attr('d', path);
};

wheelMenu.selectSlice = function (slice) {
	canvas.select('g.selected')
		.select('text.icon')
		.attr('transform', rotate);
	canvas.select('g.selected')
		.classed('selected', false)
		.select('path')
		.attr('d', dOrig);
	canvas.select('g.slice' + slice)
		.classed('selected',true)
		.select('path')
		.attr('d', dChanged);
	canvas.select('g.slice' + slice)
		.select('text.icon')
		.attr('transform', function (d) {return 'translate(0, -10) ' + rotate(d);});
	$(parentId + ' circle.center').attr('class', 'center slice' + slice);
	wheelMenu.onSelect(slice);
};

wheelMenu.onSelect = function (slice) {};

var rotate = function (d) {
	return 'rotate(-'+ (d.slice *60) + ', '+ iconPos.x +', ' + iconPos.y + ')';
};

var setText = function (text) {
	canvas.select('text.centerText').text(text);
	centerText(canvas.select('text.centerText'), midPoint, midPoint);
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


wheelMenu.boxText = function (textElem) {
	$(parentId + ' > svg').append('<rect x="'+ textElem.attr('x')  +'" y="'+ (textElem.attr('y') - textElem.height()) +'" '+
			'width="'+ textElem.width() +'" height="'+ textElem.height() +'" ' +
			'style="fill:blue;stroke:pink;stroke-width:1;fill-opacity:0.1;stroke-opacity:0.9" />');
	$(parentId).html($(parentId).html()); // hack to render the SVG
};

})(window.wheelMenu = window.wheelMenu  || {});
