var tools = {
	/* 获取元素的样式
	 * @param  obj <DOM Object> 要获取样式的元素对象
	 * @param  attr <string>  要获取的属性名
	 * @return  <string>  样式的值
	 */
	getStyle : function (obj, attr) {
	// 	if(obj.currentStyle){
	// 		// IE
	// 		return obj.currentStyle[attr];
	// 	}else{
	// 		return getComputedStyle(obj, false)[attr];
	// 	}
		
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
		
	// 	try{
	// 		return obj.currentStyle[attr];
	// 	}catch(){
	// 		return  getComputedStyle(obj, false)[attr];
	// 	}
	},
	
	/* 给元素设置样式
	 * obj <DOM Object> 要设置样式的元素
	 * attrObj <object> 设置的样式，如 {"width" : "200px", "height" : "300px"}
	 */
	setStyle : function (obj, attrObj) {
		for(var key in attrObj) {
			obj.style[key] = attrObj[key];
		}
	},
	
	/* 获取一个元素距离body边缘的坐标
	 * @param obj <DOM Object>  要获取坐标的那个元素对象
	 * @return <object> {left, top}
	 */
	getBodyDis : function (obj) {
		var left = 0, top = 0;
		while(obj.offsetParent) {
			left += obj.offsetLeft;
			top += obj.offsetTop;
			// obj赋值为父级，往前走一步继续计算
			obj = obj.offsetParent;
		}
		return {
			"top" : top,
			"left" : left
		};
	},
	
	/* 获取整个body的宽高
	 * @return <object> {width, height}
	 */
	getBody : function () {
		return {
			width : document.documentElement.clientWidth || document.body.clientWidth,
			height : document.documentElement.clientHeight || document.body.clientHeight
		}
	},
	/* 添加事件监听
	 * obj <DOM object>   添加监听的DOM对象
	 * type <string> 事件句柄（不带on）
	 * fn <function> 事件处理函数
	 * isCapture <boolean> 是否捕获，默认为false（IE8+有效）
	 */
	on: function (obj, type, fn, isCapture) {
		isCapture = isCapture || false;
		
		if(window.attachEvent){
			obj.attachEvent("on"+type, fn);
		}else{
			obj.addEventListener(type, fn, isCapture);
		}
		
	},
	/* 移出事件监听
	 * obj <DOM object>   添加监听的DOM对象
	 * type <string> 事件句柄（不带on）
	 * fn <function> 要移出的那个事件处理函数
	 * isCapture <boolean> 监听是在捕获阶段的话那么移出也要传true，默认为false（IE8+有效）
	 */
	off : function (obj, type, fn, isCapture) {
		isCapture = isCapture || false;
		if(window.detachEvent){
			obj.detachEvent("on"+type, fn);
		}else{
			obj.removeEventListener(type, fn, isCapture);
		}
	},
	
	/* 给某个元素绑定鼠标滚轮事件
	 * obj <DOM object>   添加监听的DOM对象
	 * fn <function>  事件处理函数 这个函数有一个参数 <boolean>  true向下  false代表向上
	 */
	scroll : function (obj, fn) {
		// 回调函数
		// 判断事件有没有效，而不是有没有绑定（有效但是没有绑定的时候值为null）
		if(obj.onmousewheel !== undefined) {
			
			obj.onmousewheel = function (e) {
				e = e || event;
				
				fn(e.wheelDelta < 0);
				/* if(e.wheelDelta < 0) fn(true);
				else fn(false); */
			}
		}else{
			
			obj.addEventListener("DOMMouseScroll", function (e) {
				e = e || event;
				fn(e.detail>0);
			})
		}
	},
	
	/* 让元素匀速运动到指定终点
	 * obj  <DOM Object>  运动的DOM元素
	 * attr <string>  运动的属性名称
	 * end  <number>  运动的终点值
	 * time <number>  运动的耗时
	 */
	linearMove : function (obj, attr, end, time) {
		// 先清除上一次的定时器
		// 把定时器挂在obj的自定义属性上，确保唯一性
		clearInterval(obj.timer);
		// 获取起点值
		var start = parseInt(this.getStyle(obj, attr));
		// 计算总距离
		var distance = end - start;
		// 计算速度
		// 计算运动的步数，以50ms为一步
		var steps = parseInt(time / 20);
		// 计算 px/步
		var speed = distance / steps;
		obj.timer = setInterval(function () {
			
			// 往前走一步
			start += speed;
			obj.style[attr] = start + "px";
			// 到终点的距离小于了一个速度的距离，那么就结束运动
			if(Math.abs(start - end) < Math.abs(speed)) {
				clearInterval(obj.timer);
				// 有可能会超出一点，手动拉回来
				obj.style[attr] = end + "px";
			}
		},20);
		
	},
	/* 缓冲运动
	 * obj  <DOM Object>  运动的DOM元素
	 * attr <string>  运动的属性名称
	 * end  <number>  运动的终点值
	 */
	move: function (obj, attr, end) {
		console.log("move");
		// 清除上一次的定时器
		clearInterval(obj.timer);
		// 获取起点值
		var start = parseInt(this.getStyle(obj, attr));
		// 开始运动
		obj.timer = setInterval(function () {
			console.log(11);
			// 剩下的距离
			var distance = end - start;
			// 速度（这一步走得距离）
			// 正向靠近的时候速度0.9向上取整变为1，负向接近的时候速度-0.9向下取整变为-1
			var speed = distance > 0 ? Math.ceil(distance / 10) : Math.floor(distance / 10);
			// 修改start本身
			start += speed;
			obj.style[attr] = start + "px";
			// 判断终点
			// 由于最后十步一定是一像素的移动，所以一定能相等
			if(start === end) {
				clearInterval(obj.timer);
				console.log("end");
			}
		}, 20);
	},
	
	/* 让元素在窗口范围绝对居中
	 * obj  <DOM Object> 要居中的那个元素
	 */
	showCenter : function (obj) {
		// 显示
		// this.setStyle(obj, {display: "block"});
		obj.style.display = "block";
		// 加上绝对定位
		// 计算坐标
		let _this = this;
		function center () {
			var _top = (_this.getBody().height - obj.offsetHeight) / 2;
			var _left = (_this.getBody().width - obj.offsetWidth) / 2;
			console.log(obj.offsetHeight, obj.offsetWidth);
			_this.setStyle(obj, {
				position :"absolute",
				left : _left + "px",
				top : _top + "px"
			});
		};
		center();
		// 窗口大小发生改变的时候重新计算坐标
		window.onresize = center;
	},
	
	/* 做cookie的存取，修改，删除
	    只传key就是获取
	    key value一起传就是存或者修改
	    option 修改path和expires， expires值为-1代码删除
	 * @param key <string> cookie的属性名
	 * @param [value] <string> cookie的值
	 * @param [option] <object>  {expires, path}
	 * @return  <string>  取cookie的时候就返回当前这条cookie的值
	
	*/
	cookie : function  (key, value, option) {
		if(value === undefined){
			// 获取cookie
			var cookie = document.cookie;
			var arr = cookie.split("; ");
			
			var objCookie = arr.reduce(function (obj, item) {
				var subArr = item.split("=");
				// 把取到的结果解码
				obj[subArr[0]] = decodeURIComponent(subArr[1]);
				// 把obj返回出去作为下一次reduce的obj继续归并
				return obj;
			}, {});
			
			return objCookie[key];
			
		}else{
			// 操作cookie
			// 编码
			var str = key+"="+encodeURIComponent(value);
			// 是否存在option
			if(option) {
				if(option.path) str += ";path="+option.path;
				if(option.expires){
					var date = new Date();
					date.setDate(date.getDate() + option.expires);
					str += ";expires="+date;
				}
			}
			document.cookie = str;
		}
	},

	/* ajax get方法
	 * @param  url <string> 请求的地址
	 * @param  query <object>  请求携带的参数
	 * @param  callback <function>  数据成功以后的回调函数
	 * @param  isJson <boolean>  是否是json格式的数据	
	*/
	ajaxGet: function (url, query, callback, isJson) {
		// isJson没有传递的话默认值为true
		isJson = isJson === undefined ? true : isJson;
		// 1、 new一个ajax核心对象
		var ajax = new XMLHttpRequest();
		// 如果有query再url后面拼接query
		if(query){
			url += "?";
			for(var key in query){
				url += key+"="+query[key]+"&";
			}
			url = url.slice(0, -1);
		}
		// 2、 open
		ajax.open("GET", url, true);
		// 3、 send
		ajax.send(null);
		// 4、 监听状态的改变
		ajax.onreadystatechange = function () {
			if(ajax.readyState === 4 && ajax.status === 200){
				// 利用逻辑短路
				//根据isJon判断是否使用JSON.parse转换
				var res = isJson ? JSON.parse(ajax.responseText) : ajax.responseText;
				
				callback && callback(res);
			}
		}
	},

	/* ajax方法
	 * @param method <string> "get"或者"post"
	 * @param  url <string> 请求的地址
	 * @param  query <object>  请求携带的参数
	 * @param  callback <function>  数据成功以后的回调函数
	 * @param  isJson <boolean>  是否是json格式的数据	
	*/
	ajax: function (method, url, query, callback, isJson) {
		isJson = isJson === undefined ? true : isJson;

		if(method.toUpperCase() === "GET"){
			this.ajaxGet(url, query, callback, isJson);
		}else if(method.toUpperCase() === "POST"){
			var ajax = new XMLHttpRequest();
			ajax.open("POST",url,true);
			ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			// 通过query拼接send的内容
			var str = "";
			if(query){
				for(var key in query){
					str += key+"="+query[key]+"&";
				}
				str = str.slice(0, -1);
			}
			ajax.send(str);
			ajax.onreadystatechange = function(){
				if(ajax.readyState == 4){
					if(ajax.status == 200){
						callback && callback(isJson ? JSON.parse(ajax.responseText) : ajax.responseText);
					}else{
						alert("请求失败");
					}
						
				}
			}
		}
	},
	
	/* 请求jsonp数据
	 * @param url <string> 请求的地址
	 * @param cb <string>  回调函数的函数名
	 * @param [query] <object> 请求携带的参数
	 */
	ajaxJsonp: function (url, cb, query) {
		// 创建script标签
		var script = document.createElement("script");
		url += "?cb="+cb;
		if(query){
			for(var key in query) {
				url += "&"+key+"="+query[key];
			}
		}
		script.src = url;
		document.body.appendChild(script);
		// 过河拆桥
		document.body.removeChild(script);
		
	},

	/* ajax方法
	 * @param  url <string> 请求的地址
	 * @param  query <object>  请求携带的参数
	 * @param  isJson <boolean>  是否是json格式的数据	
	*/

	ajaxGetPromise : function (url, query, isJson) {
		isJson = isJson === undefined ? true : isJson;
		// 如果有query再url后面拼接query
		if(query){
			url += "?";
			for(var key in query){
				url += key+"="+query[key]+"&";
			}
			url = url.slice(0, -1);
		}
		return new Promise((resolve, reject) => {
			let ajax = new XMLHttpRequest();
			ajax.open("GET", url, true);
			ajax.send(null);
			ajax.onreadystatechange = function () {
				if(ajax.readyState === 4){
					if(ajax.status === 200){
						// 数据成功返回了
						resolve(isJson ? JSON.parse(ajax.responseText) : ajax.responseText);
					}else{
						reject();
					}
				}
			}
		})
	}
}



