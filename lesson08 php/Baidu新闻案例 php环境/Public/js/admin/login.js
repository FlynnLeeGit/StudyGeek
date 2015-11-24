//用户名输入框失去焦点时ajax请求是否存在此用户
$('#username').blur(function() {
	var userkey = $(this).val();
	$.ajax({
		url: appPath+'/userAjax',
		data: {
			'username': userkey
		},
		success: function(data) {
			if (data == 0) {
				$('#username').css('border-color', 'red');    //返回0则不存在 边框红
			} else {
				$('#username').css('border-color', 'green');  //返回1则存在 边框绿
			}
		},
		error: function() {
			alert('服务器连接失败');
		}
	})
});