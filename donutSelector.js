(function(donutSelector){

var dOrig = 'm50,100l-50,-86a100,100 0 0,1 100,0l-50,86z';
var dChanged = 'm50,100l-65,-112a112,112 0 0,1 130,0l-65,112z';
var parentId = '';

donutSelector.init = function (divid, selectedSlice, amount, icons) { 
	parentId = divid;
	var group = $(parentId + ' > svg> g');
	var iconPos = {x: 50, y: 35};
	for (var i = 0; i < 6; i++) {
		var tOrig = 'translate(85,35) rotate(' + (i*60) + ', 50, 100)';
		group.append('<g class="slice' + i + '"' +
			'onmouseover=\'donutSelector.updatePath(this, "' + dChanged + '");\'' +
			'onmouseout=\'donutSelector.updatePath(this, "' + dOrig + '");\'' +
			'onmouseup=\'donutSelector.selectSlice('+i+');\'' +
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
	group.append('<text class="amount" x="135" y="135">€54</text>');
	$(parentId).html($(parentId).html()); // hack to render the SVG
	centerText($('text.icon'), iconPos.x, iconPos.y); // must be done after it's drawn
	donutSelector.selectSlice(selectedSlice);
	setAmount(amount);
};

donutSelector.updatePath = function (elem, path) {
	var pelem = $(elem).children('path');
	if (pelem.attr('class') !== 'selected') pelem.attr('d', path);
};

donutSelector.selectSlice = function (slice) {
	var group = $(parentId + ' > svg> g');

	$(parentId + ' > svg> g path.selected').removeAttr('class').attr('d', dOrig);
	group.children('g.slice' + slice).children('path').attr('class','selected').attr('d', dChanged);
	group.children('circle.center').attr('class', 'center slice' + slice);
};

var setAmount = function (amount) {
	$(parentId + ' > svg> g text.amount').text(amount);
	centerText($(parentId + ' > svg> g text.amount'), 135, 135);
};

var centerText = function (textElem, x, y) {
	textElem.attr('x', x - textElem.width()/2);
	textElem.attr('y', y + textElem.height()/3); // over 3 to compensate ascend. Totally made up...
};

donutSelector.boxText = function (textElem) {
	$(parentId + ' > svg> g').append('<rect x="'+ textElem.attr('x')  +'" y="'+ (textElem.attr('y') - textElem.height()) +'" '+
			'width="'+ textElem.width() +'" height="'+ textElem.height() +'" ' +
			'style="fill:blue;stroke:pink;stroke-width:1;fill-opacity:0.1;stroke-opacity:0.9" />');
	$(parentId).html($(parentId).html()); // hack to render the SVG
};

})(window.donutSelector = window.donutSelector  || {});
