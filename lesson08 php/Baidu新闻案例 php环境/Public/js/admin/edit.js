$('.type-select>option').each(function(index, ele) {   //使type select的option值默认选中
	if ($(ele).val() == editType) {
		$(ele).attr('selected', true);
	}
});
$('.label-select>option').each(function(index, ele) { //使label select的option值默认选中
	if ($(ele).val() == editLabel) {
		$(ele).attr('selected', true);
	}
});