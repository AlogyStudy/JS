(function(w) {
	
	var version = '0.0.1';
	var arr = [];
	var slice = arr.slice;
	
	/**
	 * 工厂函数
	 */
	function jQuery(selector) {
		return new jQuery.fn.init(selector); 
	}
	
	// 挂载原型   // 替换原型 + 原型简称
	jQuery.fn = jQuery.prototype = {
		constructor: jQuery,
		
		jquery: version,
		
		selector: '',
		
		length: 0,
		
		/**
		 * 转数组
		 * @return {Array}
		 */
		toArray: function () {
			return slice.call(this);
		},
		
		/**
		 * 遍历实例，把遍历到的数据分别传给回调使用
		 * @param {Object} fn
		 * @return {}
		 */
		each: function (fn) {
			return jQuery.each(this, fn);
		},
		
		map: function (){
				
		},
		
		/**
		 * 获取原生对象
		 * @param {Number} i 
		 */
		get: function (i) {
			// 1. 传入null或undefined，转换为数组返回
			if (i == null) {
				return this.toArray();
			}
			if (i >= 0) {
				// 2. 正数，按照指定下标获取元素返回
				return this[i];
			} else {
				// 3. 负数，按照下标倒着（this.length+负数）获取元素返回
				return this[this.length + i];
			}
		},
		
		/**
		 * 截取实例的部分元素，构成一个新的JQ对象。
		 */
		slice: function () { // 包头不包尾
			// 1. 通过数组slice获取部分元素
			// 2. 把截取到的元素转换为实例对象返回.
			var nodes = [].slice.apply(this, arguments);  // 参数不固定， 借用数组的slice.
			return jQuery(nodes);
		},
		
		/**
		 * 获取指定下标的元素，获取的是JQ类型的实例对象
		 * @param {Object} num
		 * @return {Object} 
		 */
		eq: function (num) {
			// 1. 传入null或undefined，那么转换为新实例返回
			if (num == null) {
				return jQuery();
			}
			
			if (num >= 0) {
				// 2. 正数，按照指定下标获取元素，包装成实例返回.
				return jQuery(this[num]);	
			} else {
				// 3. 负数，按照下标倒着（this.length+负数），获取元素，包装成实例返回.
				return jQuery(this[this.length + num]);
			}
		},
		
		/**
		 * 获取实例中的第一个元素，是JQ类型的实例对象
		 * @return {Object}
		 */
		first: function () {
			return this.eq(0);			
		},
		
		/**
		 * 获取实例中的最后一个元素，是JQ类型的实例对象
		 *  @return {Object}
		 */
		last: function () {
			return this.eq(-1);
		},
		
		push: [].push, // 不需要使用call或者apply。因为实例调用中this就是该对象，无须改变。
		sort: [].sort,
		splice: [].splice,
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
		},
		/**
		 * 判断是否是函数
		 * @param {Object} fn
		 * @return {Boolean}
		 */
		isFunction: function(fn) {
			return !!fn && typeof fn === 'function' ? true : false;
		},
		
		/**
		 * 判断是否是window对象
		 * @param {Object} win
		 * @return {Boolean}
		 */
		isWindow: function(win) {
			return !!win && win.window == win ? true : false;
		},
		
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
		},
		
		/**
		 * 判断是否是 数组 或类数组
		 * @param {Object} arr
		 * @return {Boolean}
		 */
		isLikeArray: function(arr) {
			// 函数，window，非数组
			if (jQuery.isFunction(arr) || jQuery.isWindow(arr) || !jQuery.isObject(arr)) {
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
		},
			
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
		},
		
		/**
		 * ready函数 
		 * @param {Function} fn
		 */
		ready: function (fn) {
			if (document.readyState === 'complete') { // DOM是否执行完毕， 通过document.readyState 
				fn && fn();
			} else {
				if (document.addEventListener) {
					document.addEventListener('DOMContentLoaded', function () {
						fn && fn();
					});
				} else {
					document.attachEvent('onreadystatechang', function () {
						if (document.readyState === 'complete') { //  防止onreadystatechang事件多次触发fn多次执行
							fn && fn();
						}
					});
				}
			}
		},
		
		/**
		 * each遍历方法
		 * @param {Object} obj
		 * @param {Object} callback
		 */
		each: function(obj, callback) {
			var length, i; // 提前声明 避免预解析相关
			
			if (jQuery.isLikeArray(obj)) {
				length = obj.length;
				for (i=0; i<length; i++) {
					if (callback.call(obj[i], i, obj[i]) == false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					if (callback.call(obj[i], i, obj[i]) == false) {
						break;
					}
				}
			}
			return obj;
		},
		
	});
	
	/**
	 * 构造函数
	 */
	var init = jQuery.fn.init = function(selector) {
		// false
		if (!selector) {
			return this;
		}
		
		// function
		if (jQuery.isFunction(selector)) {
			jQuery.ready(selector);	
		}
		
		// string
		if (typeof selector === 'string') {
			selector = jQuery.trim(selector);
			if (jQuery.isHTML(selector)) {
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
		} else if (jQuery.isLikeArray(selector)) {
		// array 类数组
			[].push.apply(this, selector);
			return this;
		} else {
		// other
			// this[0] = selector;	
			// this.length = 1;
			[].push.call(this, [].slice.call(selector));
			return this;
		}
	}
	
	// 扩展对象  // 替换构造函数的原型为工厂的原型，作用：外界可以通过工厂给实例添加扩展方法.
	init.prototype = jQuery.fn;
	
	// 暴露函数
	w.jQuery = w.$ = jQuery;
})(window);