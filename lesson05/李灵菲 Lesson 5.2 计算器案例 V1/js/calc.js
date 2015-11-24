var resultObj = document.getElementById("calcValue");
var last;
var flag = 0;

//纯数字拼接函数
function calc(num) {
	if (flag == 0) {                     
		resultObj.value += num;
	}else{                      //判断是否为按下等号后再键入数字时 不做数字拼接 重新计算
		resultObj.value="";
		resultObj.value+=num;
		flag=0;
	}
	resultObj.focus();
}

//运算符和.拼接函数
function char(arg) {
	last = resultObj.value.charAt(resultObj.value.length - 1);
	switch (arg) {

		case ".": //小数点使用规则
			{
				var arr = resultObj.value.match(/\.\d+/g); //将所有小数找出并存入数组arr中
				if (arr) {
					var tmp = arr[arr.length - 1]; //将最后一组小数存到tmp
					var index = resultObj.value.lastIndexOf(tmp); //寻找tmp在整个数学运算式中的索引
					var bool = index + tmp.length == resultObj.value.length; //如果索引+本身tmp的长度等于运算式总长,说明运算式的最后几位是小数，不能再按下小数点.按钮
					if (!bool) {
						resultObj.value += arg;
					} else {
						return;
					}
					return;
				}
				if (last != ".") { //最后一位不是.的情况下使用
					resultObj.value += arg;
				}
				break;
			}

		default: //+-*/使用规则
			{
				if (last == "" && arg.search(/[\+\*\/]/) >= 0) { //除开-能开头，其他运算符不能开头
					return;
				} else if (last.search(/[\+\-\*\/]/) == -1) { //最后一位不是+-*/运算符则加上
					resultObj.value += arg;
				} else {
					resultObj.value = resultObj.value.substring(0, resultObj.value.length - 1) + arg; //最后一位是运算符则替换该运算符
				}
				break;
			}
	}
	resultObj.focus();
	flag=0;
}

//退格函数
function back() {
	resultObj.value = resultObj.value.substring(0, resultObj.value.length - 1);
	resultObj.focus();
}

//结果函数
function result() {
	last = resultObj.value.charAt(resultObj.value.length - 1);
	if (last.search(/[\+\-\*\/]/) >= 0) { //如果运算时最后一位是运算符 不计算结果
		return;
	} else {
		var reg = /\d+/g; //正则找出所有数字
		resultObj.value = eval(resultObj.value.replace(reg, function(match) { //利用正则和replace将类似010的八进制转为Number十进制 最后使用eval计算
			return (Number(match));
		}));
		resultObj.focus();
		flag=1;
	}
}

//重置函数
function refresh() {
	location.reload();
}