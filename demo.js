var times = 3;

var reject = function() {
	$.messager.confirm('提示','拒绝意味着放弃本次选择，你确认要拒绝吗？',function(r){
	    if (r){
	        $('.start').removeAttr('disabled');
	    }
	});
}
$(function(){

	console.log('苟富贵，无相忘 :)');
	
	$('.roulette').find('img').hover(function(){
		console.log($(this).height());
	});
	// var appendLogMsg = function(msg) {}
	var submitScore = function(elm) {
		console.log($(elm['0']).attr('code'));
		$('#desc').text($(elm['0']).attr('title'));
		if (times > 0) {
			$('#desc').parent().append('<button title="我要再来一次" onclick="reject()">拒绝</button>')
		}
	}
	var p = {
		startCallback : function() {
			// appendLogMsg('start');
			// $('#speed, #duration').slider('disable');
			// $('#stopImageNumber').spinner('disable');
			$('.start').attr('disabled', 'true');
			$('.stop').removeAttr('disabled');
		},
		slowDownCallback : function() {
			// appendLogMsg('slowdown');
			$('.stop').attr('disabled', 'true');
		},
		stopCallback : function($stopElm) {
			// appendLogMsg('stop');
			submitScore($stopElm);
			// $('#speed, #duration').slider('enable');
			// $('#stopImageNumber').spinner('enable');
			// $('.start').removeAttr('disabled');
			$('.stop').attr('disabled', 'true');
		}

	}
	var rouletter = $('div.roulette');
	rouletter.roulette(p);	
	$('.stop').click(function(){
		var stopImageNumber = $('.stopImageNumber').val();
		if(stopImageNumber == "") {
			stopImageNumber = null;
		}
		rouletter.roulette('stop');	
	});
	$('.stop').attr('disabled', 'true');
	$('.start').click(function(){
		rouletter.roulette('start');
		$('.stop').removeAttr('disabled');	
		$('#desc').empty();
		$('#desc').siblings().remove();
		times--;
		refreshTimes();
	});

	var refreshTimes = function() {
		$('#times').text(times);
	}
	refreshTimes();

	// var updateParamater = function(){
	// 	p['speed'] = Number($('.speed_param').eq(0).text());
	// 	p['duration'] = Number($('.duration_param').eq(0).text());
	// 	p['stopImageNumber'] = Number($('.stop_image_number_param').eq(0).text());
	// 	rouletter.roulette('option', p);	
	// }
	// var updateSpeed = function(speed){
	// 	$('.speed_param').text(speed);
	// }
	// $('#speed').slider({
	// 	min: 1,
	// 	max: 30,
	// 	value : 10,
	// 	slide: function( event, ui ) {
	// 		updateSpeed(ui.value);
	// 		updateParamater();
	// 	}
	// });
	// updateSpeed($('#speed').slider('value'));

	// var updateDuration = function(duration){
	// 	$('.duration_param').text(duration);
	// }
	// $('#duration').slider({
	// 	min: 2,
	// 	max: 10,
	// 	value : 3,
	// 	slide: function( event, ui ) {
	// 		updateDuration(ui.value);
	// 		updateParamater();
	// 	}
	// });
	// updateDuration($('#duration').slider('value'));

	// var updateStopImageNumber = function(stopImageNumber) {
		// $('.image_sample').children().css('opacity' , 0.2);
		// $('.image_sample').children().filter('[data-value="' + stopImageNumber + '"]').css('opacity' , 1);
		// $('.stop_image_number_param').text(stopImageNumber);
		// updateParamater();
	// }

	// $('#stopImageNumber').spinner({
	// 	spin: function( event, ui ) {
	// 		var imageNumber = ui.value;
	// 		if ( ui.value > 4 ) {
	// 			$( this ).spinner( "value", -1 );
	// 			imageNumber = 0;	
	// 			updateStopImageNumber(-1);		
	// 			return false;
	// 		} else if ( ui.value < -1 ) {
	// 			$( this ).spinner( "value", 4 );
	// 			imageNumber = 4;	
	// 			updateStopImageNumber(4);		
	// 			return false;
	// 		}
	// 		updateStopImageNumber(imageNumber);		
	// 	}
	// });
	// $('#stopImageNumber').spinner('value', 0);
	// updateStopImageNumber($('#stopImageNumber').spinner('value'));		

	// $('.image_sample').children().click(function(){
	// 	var stopImageNumber = $(this).attr('data-value');
	// 	$('#stopImageNumber').spinner('value', stopImageNumber);
	// 	updateStopImageNumber(stopImageNumber);
	// });
});

