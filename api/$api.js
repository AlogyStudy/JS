(function (window) {
	
	// 全局对象
	var t = {};
	
	// 是否android 
	var isAndroid = (/android/gi).test(navigator.appVersion);
	
	/**
	 * 处理android localStorage兼容性
	 */
	var uzStorage = function () {
		var ls = window.localStorage;
		if (isAndroid) {
			ls = os.localStorage();
		}
		return ls;
	}
	
	/**
	 * 处理ajax传入参数
	 * @param {Object} url   url
	 * @param {Object} data  携带数据
	 * @param {Object} fnSuc 回调
	 * @param {Object} dataType 类型： `get`, `post`
	 */
	function parseArguments(url, data, fnSuc, dataType) {
		// 处理传入参数位置
		if (typeof(data) == 'function') {  // parseArguments('http://xxx.com', function() {}, 'get');
			dataType = fnSuc;
			fnSuc = data;
			data = undefined;
		}
		
		if (typeof(fnSuc) != 'function') { // parseArguments('http://xxx.com', {}, 'get', function() {});
			dataType = fnSuc;
			fnSuc = undefined;
		}
		
		return {
			url: url,
			data: data,
			fnSuc: fnSuc,
			dataType: dataType
		}
	}
	
	/**
	 * 删除出前后端空格 
	 * @param {Object} str 字符串 
	 */
	t.trim = function trim(str) {
		debugger;
		if (String.prototype.trim) {
			return str == null ? '' : String.prototype.trim.call(str);
		} else {
			return str.replace(/(^\s*)|(\s*$)/g, '');
		}
	}
	
	/**
	 * 替换所有空格
	 * @param {Object} str
	 */
	t.trimAll = function trimAll(str) {
		return str.replace(/\s*/g, '');
	}
	
})(window);
