var times = 3;
var userObj;
var baseUrl = 'http://localhost:8080';

var reject = function(cid) {
	$.messager.confirm('提示','拒绝意味着放弃本次选择，你确认要拒绝吗？',function(r){
	    if (r){
	    	$.get(baseUrl+'/reject?key='+cid, function(data) {
	    		if (data == 'ok') {
	    			$('.start').removeAttr('disabled');
	    		}
	    	});
	        
	    }
	});
}
var showHint = function(content, cid) {
	if (content) {
		$('#desc').text(content);
		if (times > 0) {
			$('#desc').parent().append('<button title="我要再来一次" onclick="reject('+cid+')">拒绝</button>')
		}
	}
	
}
var refreshTimes = function() {
	$('#times').text(times);
}
var fetchUser = function(userId) {
	$.get(baseUrl+'/initState?uid='+userId, function(data) {
		if (data) {
			if (typeof data === 'string') {
				$.messager.alert('提示', data,'warn');
			} else {
				userObj = data;
				userObj['uid'] = userId;
				times = userObj.times;
				showHint(userObj.description, userObj.cid);
				refreshTimes();
				if (times < 1) {
					$('.start').attr('disabled', 'true');
				}
			}
		}
	});
}
$(function(){
	var userId = localStorage.getItem('treat_user_id');
	if (!userId) {
		// redirect
		window.location='http://www.baidu.com';
		return;
	}

	fetchUser(userId);
	console.log('苟富贵，无相忘 :)');
	
	/*$('.roulette').find('img').hover(function(){
		console.log($(this).height());
	});*/
	
	var submitScore = function(elm) {
		times--;
		refreshTimes();
		if (times < 0) {
			times = 0;
			$.messager.alert('提示', '已记录你的选择，稍候送上','info');
		} else {
			var code = $(elm['0']).attr('code');
			$.get(baseUrl+'/choosen?uid='+userObj.uid+'&key='+code, function(data) {
				if (data && data.substring(0,2) == 'ok') {
					showHint($(elm['0']).attr('title'), data.substring(3));
				} else {
					$.messager.alert('提示', data,'warn');
				}
				
			});
		}
		
	}

	var p = {
		startCallback : function() {
			$('.start').attr('disabled', 'true');
			$('.stop').removeAttr('disabled');
		},
		slowDownCallback : function() {
			$('.stop').attr('disabled', 'true');
		},
		stopCallback : function($stopElm) {
			submitScore($stopElm);
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
	});
});

