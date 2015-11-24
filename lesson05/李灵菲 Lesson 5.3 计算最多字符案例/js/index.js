var inputNum = document.getElementById("num");
var btn = document.getElementById("btn");
var objtxt1 = document.getElementById("objTxt1");
var objtxt2 = document.getElementById("objTxt2");
var pgbar = document.getElementById("pgbar");
var keyCodeTxt = document.getElementById("keyCodeTxt");

//获得最大字母函数
function getMax(n) {
	if (n > 5000 || n < 1) {
		alert("数字不正确 重新输入！")
		window.location.reload();
	}
	var arr = [];
	var keyNumber = 1; //保存出现次数
	var keyArr = [];
	var keyOrder = [];
	var objAfter = {}; //新对象用来保存字母出现次数键值对 对象
	var alphabet = "abcdefghijklmnopqrstuvwxyz";

	for (var i = 0; i < n; i++) { //生成随机对象
		var radomCode = alphabet.charAt(parseInt(Math.random() * 26));
		arr[i] = radomCode;
	};

	for (var i = 0; i < n; i++) {
		if (!objAfter[arr[i]]) { //遍历以字母为下标的键值，如果未定义则给其键值为1
			objAfter[arr[i]] = 1;
		} else {
			objAfter[arr[i]] ++; //如果有定义则在键值上自增
			if (objAfter[arr[i]] >= keyNumber) {
				keyNumber = objAfter[arr[i]]
			}
			//和keyNumber比较大小，大的存为最多次数
		}
	};
	for (var i in objAfter) { //检测是否有出现次数一样多的字母,如果有存到字母数组
		if (objAfter[i] == keyNumber) {
			keyArr.push(i);
		}
	}

	for (var i = 0; i < keyArr.length; i++) { //获得出现最多字母组索引序列
		var tmpArr = [];
		for (var j = 0; j < arr.length; j++) {
			if (arr[j] == keyArr[i]) {
				tmpArr.push(j);
			}
		}
		keyOrder.push(tmpArr); //keyOrder为二维数组 存放每个字母出现的位置
	};

	return result = [arr, keyNumber, keyArr, keyOrder]; //返回获得的随机数组 字母次数 次数最多字母组,字母出现位置二维数组 
}


//btn事件函数
btn.onclick = function() {
	var resultArr = getMax(inputNum.value); //应用求最大函数，返回结果数组

	objtxt1.value = resultArr[0];
	objtxt2.value = resultArr[0].sort();

	var rate = parseInt(resultArr[1] / inputNum.value * 100);
	pgbar.style.width = rate + "%"; //在底部进度条显示
	if (resultArr[1] == 1) {
		keyCodeTxt.innerHTML = "都只出现一次呢,平均比率为" + rate + "%!";
	} else {
		keyCodeTxt.innerHTML = "字母" + resultArr[2] + "最多 出现了" + resultArr[1] + "次！<br />比率" + rate + "%!";
		for (var i = 0; i < resultArr[2].length; i++) { //遍历所有出现次数多的字母 并显示它的出现位置
			keyCodeTxt.innerHTML += "<br />字母" + resultArr[2][i] + "出现的位置为" + resultArr[3][i];
		}
	}

	inputNum.focus();
}