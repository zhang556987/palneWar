/** 判断一个字符串是否为纯数字 */
function isANum(str){
	if(!Number(str) && str!=0){
		return false;
	} 
	return true;
}
/** 将日期对象转换成字符串格式 */
function date2string(d){
	return d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}
/** 计算两个日期之间相差的天数 */
function betweenDate(d1,d2){
	return Math.abs(d1.getTime()-d2.getTime())/1000/60/60/24;
}
/** 获取N天以后的日期对象 */
function getDateAfter(n){
	var now = new Date();
	var milli = now.getTime() + n*24*60*60*1000;
	return new Date(milli);
}
/** 产生指定范围内的随机整数 */
function randomInt(min,max){
	return Math.round( Math.random()*(max-min) + min );
}
/** 获取某个月份的天数 */

/** 判断某个年份是否为闰年 */

/** 将给定字符串转换成日期对象 */

/** 生成一个随机颜色 */
function randomColor(){
	var R = Math.floor(Math.random()*256).toString(16);
	var G = Math.floor(Math.random()*256).toString(16);
	var B = Math.floor(Math.random()*256).toString(16);
	return "#" + (R.length<2?"0"+R:R) + (G.length<2?"0"+G:G) + (B.length<2?"0"+B:B);
}

/** 根据class名称获取元素 */
if(!document.getElementsByClassName){
	document.getElementsByClassName = function(classname){
		var temp = [];
		var alldom = document.getElementsByTagName("*");
		for(var i=0; i<alldom.length; i++){
			if(alldom[i].className.indexOf(classname+" ") != -1){
				temp.push(alldom[i]);
			}
		}
		return temp;
	}
}

/** 获取非行内样式 */
function getStyle(obj, attr) {
    if(obj.currentStyle) { //IE浏览器
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj,null)[attr];
    }
}

/** 过滤文本节点 */
function textNodeFilter(list){
	var newarr = [];
	for(var i=0; i<list.length; i++){
		if(list[i].nodeType == 1){
			newarr.push(list[i]);
		}
	}
	return newarr;
}

/** 计算元素在页面上的绝对位置 */
function offsetPagePosition(ele){
	var _left = ele.offsetLeft;
	var _top = ele.offsetTop;
	while(ele.offsetParent){
		_left += ele.offsetParent.offsetLeft;
		_top += ele.offsetParent.offsetTop;
		ele = ele.offsetParent;
	}
	return { "left":_left, "top":_top };
}

/** 截取数组，同时将伪数组转换为数组 */
function slice(obj, start, stop){
	if(obj==undefined) {
		console.log("%c 参数传递有问题，数组不可以为undefined","color:red");
	}
	start = start || 0;
	stop = stop || obj.length;
	var list = [];
	for(var i=start; i<stop; i++){
		list.push(obj[i]);
	}
	return list;
}

/** 使用事件监听器的方式绑定函数 */
function addEvent(ele, eventname, func, isCapture){
	if(ele.addEventListener){ //标准
		ele.addEventListener(eventname, func, isCapture);
		addEvent = function(ele, eventname, func, isCapture){
			ele.addEventListener(eventname, func, isCapture);
		}
	} else { //IE
		ele.attachEvent("on"+eventname, func);
		addEvent = function(ele, eventname, func){
			ele.attachEvent("on"+eventname, func);
		}
	}
}

/** 设置cookie */
function setCookie(key,value, n){
	n = n || 10;
	var d = new Date();
	d.setDate( d.getDate()+n );
	document.cookie = key+"="+value+";expires="+d+"; path=/";
}

/* 提取cookie */
function getCookie(key){
	var cookiestr = document.cookie;
	var list = cookiestr.split("; ");
	for(var i in list){
		var kv = list[i].split("=");
		if(key == kv[0]) {
			return kv[1];
		}
	}
	return null;
}
