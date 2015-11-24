var sub=document.getElementById("sub");
var btn=document.getElementById("btn");
var armObj=document.getElementsByClassName("armAnimation")[0];
var heartColorObj=document.getElementsByClassName("heartAnimation")[0];
//延时加载字幕
setTimeout(function(){
	sub.innerHTML="I'm BayMax";
},1000);
clearTimeout();
setTimeout(function(){
	sub.innerHTML="Your Personal";
},2000);

setTimeout(function(){
	sub.innerHTML="Healthcare";
},3000);

setTimeout(function(){
	sub.innerHTML="Companion~~";
},3700);

//字幕加载完毕摇动手臂
setTimeout(function(){
	sub.innerHTML="我是大白哦: )";
	btn.style.display="block";
	armObj.style.webkitAnimationPlayState=armObj.style.MozAnimationPlayState="running";
	heartColorObj.style.webkitAnimationPlayState=heartColorObj.style.MozAnimationPlayState="running";
},4800);

//重载页面
function reload(){
	location.reload();
}

