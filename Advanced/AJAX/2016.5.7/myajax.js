(function( window ){
	
	var Object = ({}.constructor);
	
	var myajax = window.myajax = {};
	
	
	/**
	 * get
	 * @param {String} url  请求参数
	 * @param {Object} queryJson 提交
	 * @param {function} callback 回调函数
	 */
	myajax.get = function( url,queryJson,callback ){
		
		//处理参数
		if ( !( arguments=>3 && typeof url == 'string' && typeof queryJson == 'object'  && typeof callback == 'function') ) {
			throw Error('您传入参数有误');
		}
		
		//处理兼容性
		var xhr = null;
		if ( window.XMLHttpRequest ) {
			xhr = new window.XMLHttpRequest();
		} else {
			xhr =  new window.ActiveXObject(Microsoft.XMLHTTP);
		}
		
		//添加监听
		xhr.onreadystatechange = function(){
			if ( xhr.readyState == 4 ) {
				if ( xhr.status >= 200 && xhr.status < 300 || xhr.status == 304  ) {
					callback(null,xhr.responseText);
				} else {
					callback(new Error('没有找到请求的文件'),undefined);
				}
			}
		}
		var queryString = myajax._queryJson2queryString(queryJson);
		
		//配置 get参数
		xhr.open('get',url + '?' + queryString,true);
		//发送
		xhr.send(null);
		
	}
	
	
	/**
	 * post
	 * @param {String} url  请求参数
	 * @param {Object} queryJson 提交
	 * @param {function} callback 回调函数
	 */
	myajax.post = function( url,queryJson,callback ){
		
		//处理参数
		if ( !( arguments=>3 && typeof url == 'string' && typeof queryJson == 'object'  && typeof callback == 'function') ) {
			throw Error('您传入参数有误');
		}
		
		//处理兼容性
		var xhr = null;
		if ( window.XMLHttpRequest ) {
			xhr = new window.XMLHttpRequest();
		} else {
			xhr =  new window.ActiveXObject(Microsoft.XMLHTTP);
		}
		
		//添加监听
		xhr.onreadystatechange = function(){
			if ( xhr.readyState == 4 ) {
				if ( xhr.status >= 200 && xhr.status < 300 || xhr.status == 304  ) {
					callback(null,xhr.responseText);
				} else {
					callback(new Error('没有找到请求的文件'),undefined);
				}
			}
		}
		var queryString = myajax._queryJson2queryString(queryJson);
		
		xhr.open('post',url,true);
		
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.send(queryString);
		
	}
	
	/**
	 * 查询json变为 字符串
	 * @param {Object} json 需要的字符串
	 * @return {String} json转成功为string
	 */
	
	myajax._queryJson2queryString = function( json ){
		var arr = [];
		for ( var k in json ) {
			arr.push( k + '=' + encodeURIComponent(json[k]) );
		}
		return arr.join('&');
	}
	
})( window );
