//获取元素
var scoreObj = document.getElementById("score");
var scoreText = document.querySelector(".score-text");
var classLevelObj = document.querySelector(".classLevel");
var classTxt = document.getElementById("classTxt");
var iconStarArr = document.querySelectorAll(".icon-star");
var scoreInt;

//滑动滑钮更改评级
scoreObj.onmousemove = function() {
	scoreText.innerHTML = scoreObj.value;
	scoreInt = parseInt(scoreObj.value / 10); //value值/10并且转为整数再判断
	switch (true) {
		case (scoreInt >= 9): //优等生判断与样式
			{
				classTxt.innerHTML = "优等生";
				classLevelObj.style.color = "#008080";
				for (var i = 0; i < 5; i++) {
					iconStarArr[i].style.display = "inline-block";
				}
				break;
			}
		case (scoreInt == 8): //优等生判断与样式  
			{
				classTxt.innerHTML = "二等生";
				classLevelObj.style.color = "#4B0082";
				for (var i = 0; i < 5; i++) {
					i < 4 ? iconStarArr[i].style.display = "inline-block" : iconStarArr[i].style.display = "none";
				}
				break;
			}
		case (scoreInt == 7): //二等生判断与样式
			{
				classTxt.innerHTML = "三等生";
				classLevelObj.style.color = "#808080";
				for (var i = 0; i < 5; i++) {
					i < 3 ? iconStarArr[i].style.display = "inline-block" : iconStarArr[i].style.display = "none";
				}
				break;
			}
		case (scoreInt == 6): //三等生判断与样式
			{
				classTxt.innerHTML = "四等生";
				classLevelObj.style.color = "#008000";
				for (var i = 0; i < 5; i++) {
					i < 2 ? iconStarArr[i].style.display = "inline-block" : iconStarArr[i].style.display = "none";
				}
				break;
			}
		default: //默认的不及格的判断与样式
			{
				classTxt.innerHTML = "不及格";
				classLevelObj.style.color = "red";
				for (var i = 0; i < 5; i++) {
					i < 1 ? iconStarArr[i].style.display = "inline-block" : iconStarArr[i].style.display = "none";
				}
				break;
			}
	}
}