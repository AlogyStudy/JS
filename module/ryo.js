(function(w) {
	
	/**
	 * 工厂函数
	 */
	function jQuery(selector) {
		return new jQuery.fn.init(selector); 
	}
	
	// 挂载原型   // 替换原型 + 原型简称
	jQuery.fn = jQuery.prototype = {
		constructor: jQuery
	}
	
	
	/**
	 * 继承
	 * @param {Object} obj
	 * @return {Boolean} 
	 */
	jQuery.extend = jQuery.fn.extend = function(obj) {
		if (!obj && ({}).toString.call(obj) !== '[object Object]') return;
		for(var key in obj) { // 浅复制
			this[key] = obj[key];
		}
	}
	
	
	// JQ对象添加静态方法
	jQuery.extend({
		// 静态方法原则上服务于更多，原型上的方法原则上服务于实例.
		/**
		 * 判断是否是html片段
		 * @param {Object} html
		 * @return {Boolean}
		 */
		isHTML: function (html) {
			if (!html) return;
			if (html.length >= 3 && html.charAt(0) === '<' && html.charAt(html.length-1) === '>') {
				return true;
			}
			return false;
		}
		/**
		 * 判断是否是函数
		 * @param {Object} fn
		 * @return {Boolean}
		 */
		isFunction: function(fn) {
			return !!fn && typeof fn === 'function' ? true : false;
		}
		
		/**
		 * 判断是否是window对象
		 * @param {Object} win
		 * @return {Boolean}
		 */
		isWindow: function(win) {
			return !!win && win.window == win ? true : false;
		}
		
		/**
		 * 判断是否是对象
		 * @param {Object} obj
		 */
		isObject: function(obj) {
			if (obj === null) return false; // typeof null 为 Object
			if (typeof obj === 'object' || typeof obj === 'function') {
				return true;
			}
			return false;
		}
		
		/**
		 * 去除前后端空格  
		 * @param {Object} str
		 */
		trim: function (str) {
			var reg = /&\s+|\s+$/g;
			if (!str) return str;
			if (str.trim) {
				return str.trim();	
			}
			return str.replace(reg, '');
		}
		
		/**
		 * 判断是否是 数组 或类数组
		 * @param {Object} arr
		 * @return {Boolean}
		 */
		isLikeArray: function(arr) {
			// 函数，window，非数组
			if (init.isFunction(arr) || init.isWindow(arr) || !init.isObject(arr)) {
				return false;
			}
			// 数组
			if (({}).toString.call().slice(8, 13) == 'Array') {
				return true;
			}
			// 类数组
			if ('length' in arr && (arr['length'] == 0 || arr['length'] > 0 && arr['length']-1 in arr)) {
				return true;
			}
			return false;
		}
			
	});
	
	/**
	 * 构造函数
	 */
	var init = jQuery.fn.init = function(selector) {
		// false
		if (!selector) {
			return this;
		}
		
		// string
		if (typeof selector === 'string') {
			selector = init.trim(selector);
			if (init.isHTML(selector)) {
			// html fragment
				var oDiv = document.createElement('div'); // 临时div创建dom，把创建好的dom依次push给实例.
				oDiv.innerHTML = selector;
				[].push.apply(this, oDiv.childNodes);
				return this;
			} else {
			// selector
				try {
					var nodes = document.querySelectorAll(selector);
					[].push.apply(this, nodes);
					return this;
				} catch(e) {
					this.length = 0;
					return this;
				}
			}
		} else if (init.isLikeArray(arr)) {
		// array 类数组
			[].push.apply(this, arr);
			return this;
		} else {
		// other
			// this[0] = selector;	
			// this.length = 1;
			[].push.call(this, selector);
			return this;
		}
	}
	
	// 扩展对象  // 替换构造函数的原型为工厂的原型，作用：外界可以通过工厂给实例添加扩展方法.
	init.prototype = jQuery.fn;
	

	
	// 暴露函数
	w.jQuery = w.$ = jQuery;
})(window);
