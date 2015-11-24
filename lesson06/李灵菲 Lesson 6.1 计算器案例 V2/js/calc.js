var resultEle = document.getElementById("calcValue");  //获得输入框元素
var last; //定义输入框中最后输入的字符
var flag = 0; //开关变量  存储是否按下过等号运算

//----------该计算器程序使用eval函数来负责最后的运算操作，
//所以以下的大部分的函数操作在于字符拼接的判断----------

//退格函数 去掉最后一位字符
function back() {
	resultEle.value = resultEle.value.substring(0, resultEle.value.length - 1);
}

//重置函数 输入框中的值清空
	function reset() {
		resultEle.value = "";
		resultEle.focus();
	}

//纯数字的拼接函数
	function num(n) {
		last = resultEle.value.charAt(resultEle.value.length - 1);   //获取最后一位字符

		if (flag == 0) { //没有做过等号运算时直接拼接
			if(n==0 && last=="/"){
				return false;         //前一位字符为除号时 不能输入0
			}else{
				resultEle.value += n;
			}
		} else { //做过等号运算再按数字则向输入框重新填值
			resultEle.value = "";
			resultEle.value += n;
			flag = 0;      //开关置为0 表明下次可直接拼接数字
		}
		resultEle.focus();
	}

// +-*/和.拼接函数
	function char(arg) {
		last = resultEle.value.charAt(resultEle.value.length - 1); //获取最后一位字符
		switch (arg) {

			case ".": //小数点使用规则

				if (/\.\d+$/.test(resultEle.value)) { //末尾已有小数时不能再使用.符号
					return;
				}
				if (last != ".") { //前一位字符不是.的情况下拼接.字符
					resultEle.value += arg;
				}
				break;

			default: //此处为+-*/的使用规则

				if (last == "" && arg.search(/[\+\*\/]/) >= 0) { //刚开始运算时除开-能开头，其他运算符不能开头
					return;
				} else if (last.search(/[\+\-\*\/]/) == -1) { //后续运算时 最后一位不是+-*/运算符则加上
					resultEle.value += arg;
				} else {
					resultEle.value = resultEle.value.substring(0, resultEle.value.length - 1) + arg; //前一位字符是+-*/运算符则更换为新的+-*/运算符
				}
				break;

		}
		flag = 0;               //开关置为0,下次可直接拼接
		resultEle.focus();
	}


//平方 立方 三角函数 等 运算
	function math(op) {    //高级运算符 直接计算输入框中的值
		if (resultEle.value != "") {
			result();
		}
		switch (op) {
			case "^(2)":
				resultEle.value = Math.pow(resultEle.value, 2);
				break;
			case "^(3)":
				resultEle.value = Math.pow(resultEle.value, 3);
				break;
			case "%":
				resultEle.value = resultEle.value / 100;
				break;
			case "√":
				resultEle.value = Math.sqrt(resultEle.value);
				break;
			case "sin":
				resultEle.value = Math.sin(resultEle.value);
				break;
			case "cos":
				resultEle.value = Math.cos(resultEle.value);
				break;
			case "tan":
				resultEle.value = Math.tan(resultEle.value);
				break;
			case "^(-1)":
				resultEle.value = 1 / resultEle.value;
				break;
		}
	}

//等号求值函数 使用eval做最后运算
	function result() {
		last = resultEle.value.charAt(resultEle.value.length - 1);
		if (last.search(/[\+\-\*\/]/) >= 0) {   //如果运算时最后一位字符是+-*/ 不计算结果
			return;
		} else {

			//正则 找出所有数字
			var reg = /\d+\.?\d*/g;
			//eval函数求值 使用Number函数解决js八进制问题
			var mathNum = eval(resultEle.value.replace(reg, function(match) {
				return (Number(match));
			}));


			//此处判断是整数还是浮点数
			if (parseInt(mathNum) == mathNum) { //如果判断为整数,直接输出
				resultEle.value = mathNum;      //整数输出到结果
			} else { //如果得到的值为浮点数,用正则将小数做10位精度后 再将多余的零舍去
				var mathFloat = mathNum.toFixed(10).replace(/0+$/, function(match) {
					return "";
				});
				resultEle.value = mathFloat;      //浮点数输出到结果
			}
			flag = 1;           //开关变量开，表示刚做好等号运算
		}
		resultEle.focus();
	}


//输入框内容限制，只允许小键盘运算与求值
	resultEle.onkeydown = function(e) {
		var ev = e || event;
		switch (true) {

			case (ev.keyCode >= 96 && ev.keyCode <= 105):   //键入0-9时调用num函数
				num(ev.keyCode - 96);
				break;

			case (ev.keyCode == 110):                    //键入+-*/.运算符调用char函数
				char(".");
				break;

			case (ev.keyCode == 107):
				char("+");
				break;

			case (ev.keyCode == 109):
				char("-");
				break;

			case (ev.keyCode == 106):
				char("*");
				break;

			case (ev.keyCode == 111):
				char("/");
				break;
			case (ev.keyCode == 13):          //键入回车时对应result函数
				result();
				break;
		}
		return false;   //阻止输入框的默认key down事件
	};
