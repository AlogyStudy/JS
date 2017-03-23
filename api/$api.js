(function (window) {
	
	// 全局对象
	var t = {};
	
	// 是否android 
	var isAndroid = (/android/gi).test(navigator.appVersion);
	
	/**
	 * 处理android localStorage兼容性
	 * @return 
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
	 * @return 
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
	 * @return 
	 */
	t.trim = function trim(str) {
		if (String.prototype.trim) {
			return str == null ? '' : String.prototype.trim.call(str);
		} else {
			return str.replace(/(^\s*)|(\s*$)/g, '');
		}
	}
	
	/**
	 * 替换所有空格
	 * @param {Object} str
	 * @return 
	 */
	t.trimAll = function trimAll(str) {
		return str.replace(/\s*/g, '');
	}
	
	
	/**
	 * 是否是元素
	 * @param {Object} obj 当前元素
	 * @return 
	 */
	t.isElement = function (obj) {
		return !!(obj && obj.nodeType == 1);
	}
	
	/**
	 * 是否是对象
	 * @param {Object} obj
	 * @return 
	 */
	t.isArray = function (obj) {
		return Array.isArray ? Array.isArray(obj) : obj instanceof Array; 
	}
	
	/**
	 * 判断是否是空对象
	 * @param {Object} obj
	 * @return 
	 */
	t.isEmptyObject = function (obj) {
		return JSON.stringify(obj) === '{}' ? true : false; 
	}
	
	/**
	 * 添加事件 
	 * @param {Object} el 元素
	 * @param {Object} name 事件名 
	 * @param {Object} fn 回调
	 * @param {Object} useCaptrue 捕获 或者 冒泡
	 */
	t.addEvt = function (el, name, fn, useCaptrue) {
		// 判断是否元素
		if (!t.isElement(el)) {
			console.log('el 参数必须是DOM Element');
			return;
		}
		useCaptrue = useCaptrue || false; // 默认是捕获
		// 判断是否有 addEventListener 
		if (el.addEventListener) {
			el.addEventListener(name, fn, useCaptrue);
		}
	}
	
	/**
	 * 移除事件
	 * @param {Object} el 元素
	 * @param {Object} name 事件名
	 * @param {Object} fn 回调
	 * @param {Object} useCaptrue 捕获 或者 冒泡
	 */
	t.rmEvt = function (el, name, fn, useCaptrue) {
		// 判断是否有元素
		if (!t.isElement(el)) {
			console.log('el 参数必须是DOM Element');
			return;
		}
		useCaptrue = useCaptrue || false; 
		// 移除事件
		if (el.removeEventListener) {
			el.removeEventListener(name, fn, useCaptrue);				
		}
	}
	
	/**
	 * 绑定一次事件
	 * @param {Object} el
	 * @param {Object} name
	 * @param {Object} fn
	 * @param {Object} useCaptrue
	 */
	t.oneEvt = function (el, name, fn, useCaptrue) {
		if (!t.isElement(el)) {
			console.log('el 参数必须是DOM Element');
			return;
		}
		useCaptrue = useCaptrue || false;
		var me = this;
		var cb = function() {
			fn && fn();
			me.rmEvt(el, name, cb, useCaptrue);
		}
		me.addEvt(el, name, cb, useCaptrue); 
	}
	
	/**
	 * 选择dom 
	 * @param {Object} el
	 * @param {Object} selector
	 */
	t.dom = function(el, selector) {
		if (arguments.length === 1 && typeof(arguments[0]) == 'string') {
			if (document.querySelector) {
				return document.querySelector(arguments[0]);
			}
		} else if (arguments.length === 2) {
			if (el.querySelector) {
				return el.querySelector(selector);
			}
		}
	}
	
	/**
	 * 选择多个dom 
	 * @param {Object} el
	 * @param {Object} selector 选择器
	 */
	t.domAll = function (el, selector) {
		if (arguments.length === 1 && typeof(arguments[0]) == 'string') {
			if (document.querySelectorAll) {
				return document.querySelectorAll(arguments[0]);
			}
		} else if (arguments.length === 2) {
			if (el.querySelectorAll) {
				return el.querySelectorAll(selector);
			}
		}
	}
	
	/**
	 * 获取id，DOM元素
	 * @param {Object} id
	 * @return 
	 */
	t.byId = function (id) {
		return document.getElementById(id);	
	}
	
	/**
	 * 获取第一个元素
	 * @param {Object} el
	 * @param {Object} selector
	 * @return 
	 */
	t.first = function (el, selector) {
		if (arguments.length === 1) {
			if (!t.isElement(el)) {
				console.warn('$api.first 第一个参数是 el， el是 DOM Element');
				return;
			}
			return el.children[0]; 
		}
		if (arguments.length === 2) {
			return this.dom(el,selector);
		}
	}
	
	/**
	 * 获取最后一个元素
	 * @param {Object} el
	 * @param {Object} selector
	 * @return 
	 */
	t.last = function (el, selector) {
		if (arguments.length === 1) {
			if (!t.isElement(el)) {
				console.warn('$api.last 第一次参数是el，el是DOM Element');
				return;
			}
			var children = el.children;
			return children[children.length - 1];
		}
		if (arguments.length == 2) {
			return this.dom(el, selector+':last-child');
		}
	}
	
	/**
	 * 获取index个的元素  
	 * @param {Object} el
	 * @param {Object} index
	 * @return 
	 */
	t.eq = function (el, index) {
		return this.dom(el, ':nth-child('+ index +')');
	}
	
	/**
	 * 不获取传入元素 
	 * @param {Object} el
	 * @param {Object} selector
	 * @return 
	 */
	t.not = function (el, selector) {
		return this.domAll(el, ':not('+ selector +')');
	}
	
	/**
	 * 获取上一个元素
	 * @param {Object} el
	 * @return
	 */
	t.prev = function (el) {
		if (!t.isElement(el)) {
			console.warn('$api.prev 函数的el参数，el参数是 DOM Element');
			return;
		}
		var node = el.previousSibling;
		if (node.nodeType && node.nodeType === 3) {
			node = node.previousSibling;
			return node;
		}
	}
	
	/**
	 * 获取后一个元素
	 * @param {Object} el
	 */
	t.next = function(el) {
		if (!t.isElement(el)) {
			console.warn('$api.next 函数的el参数，el参数是DOM Element');
			return;
		}
		var node = el.nextSibling;
		debugger;
		if (node.nodeType && node.nodeType === 3) {
			node = node.nextSibling;
			return node;
		}
	}
	
	/**
	 * 获取最近的元素 
	 * @param {Object} el
	 * @param {Object} selector
	 */
	t.closest = function(el, selector) {
		if (!t.isElement(el)) {
			console.warn('$api.closest 函数的el参数，el参数是DOM Element');
			return;
		}
		
		var doms,targetDom;
		// 是否相同节点
		var isSame = function(doms, el) {
			var i = 0, len = doms.length;
			for(i, i<len; i++) {
				if (doms[i].isEqualNode(el)) {
					return doms[i];
				}
			}
			return false;
		}
		
		// 遍历
		var traversal = function(el, selector) {
			doms = t.domAll(el.parentNode, selector);
			targetDom = isSame(doms, el);
			while(!targetDom) {
				el = el.parentNode;
				if (el != null && el.nodeType == el.DOCUMENT_NODE) { 
					return false;
				}
				traversal(el, selector);
			}
			return targetDom;
		}
		return traversal(el, selector);
	}
	
	/**
	 * 是否包含子元素
	 * @param {Object} parent
	 * @param {Object} el
	 * @return 
	 */
	t.contains = function(parent, el) {
		var mark = false;
		if (el === parent) {
			mark = true;
			return mark;
		} else {
			do {
				el = el.parentNode;
				if (el === parent) {
					mark = true;
					return mark;
				}
			} while(el === document.body || el === document.documentElement);
			return mark;
		}
	}
	
	/**
	 * 移除元素
	 * @param {Object} el
	 */
	t.remove = function(el) {
		if (el && el.parentNode) {
			el.parentNode.removeChild(el);
		}
	}
	
	/**
	 * 获取和设置 属性
	 * @param {Object} el
	 * @param {Object} name
	 * @param {Object} value
	 * @return {}
	 */
	t.attr = function(el, name, value) {
		if (!t.isElement(el)) {
			console.warn('$api.attr 函数参数el，el参数是DOM Element');
			return;
		}
		if (arguments.length == 2) {
			return el.getAttribute(name);	
		} else if (arguments.length == 3) {
			el.setAttribute(name, value);
			return el;
		}
	}
	
	
	/**
	 * 移除属性
	 * @param {Object} el
	 * @param {Object} name
	 */
	t.removeAttr = function(el, name) {
		if (!t.isElement(el)) {
			console.warn('$api.removeAttr 函数参数el，el参数是DOM Element');
			return;
		}
		if (arguments.length === 2) {
			el.removeAttribute(name);
		}
	}
	
	window.$api = t;
})(window); 