(function(wheelMenu){

var dOrig = 'm50,100l-50,-86a100,100 0 0,1 100,0l-50,86z';
var dChanged = 'm50,100l-65,-112a112,112 0 0,1 130,0l-65,112z';
var parentId = '';
var iconPos = {x: 50, y: 35};

wheelMenu.onSelect = function (slice) {};

wheelMenu.init = function (divid, selectedSlice, text, icons) { 
	parentId = divid;
	$(parentId).append('<svg viewBox="0 0 270 270" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" xmlns:xlink="http://www.w3.org/1999/xlink" class="pie"></svg>');
	var group = $(parentId + ' > svg');
	for (var i = 0; i < 6; i++) {
		var tOrig = 'translate(85,35) rotate(' + (i*60) + ', 50, 100)';
		group.append('<g class="slice' + i + '"' +
			'onmouseover=\'wheelMenu.updatePath(this, "' + dChanged + '");\'' +
			'onmouseout=\'wheelMenu.updatePath(this, "' + dOrig + '");\'' +
			'onmouseup=\'wheelMenu.selectSlice('+i+');\'' +
			'transform="' + tOrig + '"' + 
			'>' +
			'<path d="' + dOrig + '"' +
			'/>' +
			'<text class="icon"' +
			'transform="rotate(-'+ (i*60) + ', '+ iconPos.x +', ' + iconPos.y + ')"' +
			'>' + icons[i] + '</text>' +
			'</g>');
	}
	group.append('<circle class="center" cx="135" cy="135" r="40"/>');
	group.append('<text class="centerText" x="135" y="135">Hello</text>');
	$(parentId).html($(parentId).html()); // hack to render the SVG
	centerText($('text.icon'), iconPos.x, iconPos.y); // must be done after it's drawn
	wheelMenu.selectSlice(selectedSlice);
	setText(text);
};

wheelMenu.updatePath = function (elem, path) {
	var pelem = $(elem).children('path');
	if (pelem.attr('class') !== 'selected') pelem.attr('d', path);
};

wheelMenu.selectSlice = function (slice) {
	$(parentId + ' > svg path.selected').removeAttr('class').attr('d', dOrig);
	$(parentId + ' g.slice' + slice).children('path').attr('class','selected').attr('d', dChanged);
	$(parentId + ' circle.center').attr('class', 'center slice' + slice);
	wheelMenu.onSelect(slice);
};

var setText = function (text) {
	$(parentId + ' > svg text.centerText').text(text);
	centerText($(parentId + ' > svg text.centerText'), 135, 135);
};

var centerText = function (textElem, x, y) {
	textElem.attr('x', x - textElem.width()/2);
	textElem.attr('y', y + textElem.height()/3); // over 3 to compensate ascend. Totally made up...
};

wheelMenu.boxText = function (textElem) {
	$(parentId + ' > svg').append('<rect x="'+ textElem.attr('x')  +'" y="'+ (textElem.attr('y') - textElem.height()) +'" '+
			'width="'+ textElem.width() +'" height="'+ textElem.height() +'" ' +
			'style="fill:blue;stroke:pink;stroke-width:1;fill-opacity:0.1;stroke-opacity:0.9" />');
	$(parentId).html($(parentId).html()); // hack to render the SVG
};

})(window.wheelMenu = window.wheelMenu  || {});
