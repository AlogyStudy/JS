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
		
		/**
		 * 遍历实例，把遍历到的数据分别传给回调使用，然后把回调的返回值收集起来组成一个数组返回。
		 * @param {Object} fn
		 */
		map: function (fn){
			return jQuery.map(this, fn);
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
		
		/**
		 * 遍历实例，把遍历到的数据分别传给回调使用，然后把回调的返回值收集起来组成一个数组返回。
		 * @param {Object} obj
		 * @param {Object} callback
		 * @return {Array}
		 */
		map: function(obj, callback) {
			var i, length, tmpArr = [];
			
			if (jQuery.isLikeArray(obj)) {
				length = obj.length;
				for (i=0; i<length; i++) {
					tmpArr.push(callback.call(obj[i], i, obj[i]));
				}
			} else {
				for (i in obj) {
					tmpArr.push(callback.call(obj[i], i, obj[i]));
				}
			}
			
			return tmpArr;
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
	

/***** 扩展DOM操作方法 *****/
	
	jQuery.fn.extend({
		
		/**
		 * 清空所有内容
//		 * @param { Object } likeArr
		 * @return { * }
		 */
		empty: function(/*likeArr*/) {
			var $this = this;
//			var arrLen = likeArr.length;
//			for (var i=0; i<arrLen; ++i) {
//				likeArr[i].innerHTML = ''; // 清空内容
//			}
			
//			[].forEach.call(likeArr, function(val, idx) {
//				val[i].innerHTML = '';
//			});

			$this.each(function() {
				this.innerHTML = '';
			});
			return $this;
		},
		
		/***
		 * 删除所有元素
		 * @param { Object } likeArr
		 * @return { * }
		 */
		remove: function(/*likeArr*/) {
			var $this = this;
			
//			var arrlen = likeArr.length;
//			for (var i=0; i<arrlen; ++i) {
//				likeArr[i].parentNode.removeChild(likeArr[i]);
//			}
			
//			[].forEach(likeArr, function (val, idx) {
//				val.parentNode.removeChild(val);
//			});

			$this.each(function() {
				this.parentNode.removeChild(this);
			});
			
			return $this;
		},
		
		/**
		 * 设置和获取 html
//		 * @param { Object } likeArr
		 * @param { String } html
		 * @return { * }
		 */
		html: function(/*likeArr,*/html) {
			var $this = this, arrLen = $this.length, argLen = arguments.length;
			if (argLen === 0) {
				return $this[0].innerHTML;
			} else if (argLen >= 1) {
				for (var i=0; i<arrLen; ++i) {
					$this[i].innerHTML = html;
				}
			}
			return $this;
		},
		
		
		/**
		 * 获取和设置 html
		 * @param {Object} html
		 */
		_html: function(html) {
			var $this = this;
			if (arguments.length === 0) {
				return $this.get(0).innerHTML;
			} else if (arguments.length >= 1) {
				$this.each(function() {
					this.innerHTML = html;
				});
			}
			return $this;
		},
		
		/**
		 * 设置和获取 文本
		 * @param { Object } likeArr
		 * @param { String } txt
		 * @return { * }
		 */
		text: function(/*likeArr,*/ txt) {
			var $this = this, arrLen = $this.length, argLen = arguments.length, result = '';
			if (argLen === 0) {
				// 返回全部的文本
				for (var i=0; i<arrLen; ++i) {
					result += $this[i].innerText;
				}
				return result;
			} else if (argLen >= 1) {
				// 设置文本
				for (var i=0; i<arrLen; i++) {
					$this[i].innerText = txt;
				}
			}
			return $this;
		},
		
		/**
		 * 设置和获取文本
		 * @param { String } txt
		 */
		_text: function(txt) {
			var $this = this, arrLen = $this.length, argLen = arguments.length, result;
			if (argLen === 0) {
				$this.each(function() {
					result += $this.innerText;
				});
			} else if (argLen >= 1) {
				$this.each(function() {
					$this.innerText = txt;
				});
			}
			return $this;
		},
		
		
		/**
		 * 把所有的元素添加到指定的元素中 
		 * @param { Object } ele
		 */
		 /**
		  * 参数1. 选择器
		  * 参数2. DOM
		  * 参数3. JQ对象
		  * 
		  * 返回值：
		  * 统一为所有被添加的元素组成的新实例.
		  */
		appendTo: function(selector) {

			/**
			 * 
			 * 实现思路：
			 * 1. 定义一个数组，用来存储将来所有被添加的元素。
			 * 2. 使用jQuery包装一下selector，把不同参数统一为JQ实例。
			 * 3. 在外层遍历所有的元素(this)
			 * 4. 在内层遍历所有的目标(包装过后的JQ实例)
			 * 5. 在内层判断，如果是第一次，则把外面遍历元素整体添加到内层遍历到的元素。
			 *    如果不是第一次，则把外面遍历的元素clone版本添加到内层遍历的元素。
			 * 6. 最后把存储被添加元素的数组使用JQ包装一下，然后返回。
			 */
			
			var result = [], tempNode = null; // 存储被添加的元素
			var $selector = $(selector); // 包装不同参数

			this.each(function() {
				// this 指向每一个被添加的元素
				var _this = this;
				$selector.each(function(i) {
					// this指向每一个目的地
					// 作用 当前作用域下，添加外层的this。
					
					// 第一次
					tempNode = i === 0 ? self : self.cloneNode(true);
					this.appendChild(tempNode);
					result.push(tempNode);
				});
				
			});
			
			// 遍历每一项元素(this)
/*			for (var i=0, len=this.length; i<len; i++) {
				// 遍历每一个目的地($selector)
				for (var j=0, jLen=$selector.length; j<jLen; j++) {
					// 如果是第一次
					if (j === 0) {
						tempNode = this[i];
						$selector[j].appendChild(tempNode);
						// append 对象，就是存储到result数组中，最后包装成JQ对象返回。
						result.push(tempNode);
					} else {
					// 剩余添加的都是clone版本	
						tempNode = this[i].cloneNode(true);
						$selector[j].appendChild(tempNode);
						// append 对象，就是存储到result数组中，最后包装成JQ对象返回。
						result.push(tempNode);
					}
				}
			}
*/			
			// 把所有被添加的元素保证成新的实例返回，这样可以对所有被添加的元素，进行链式编程。
			return jQuery(result);
		},
		
		/**
		 *  把所有元素添加到指定到元素的最前面
		 * @param {Object} selector
		 */
		prependTo: function(selector) {

			/**
			 * 
			 * 实现思路：
			 * 1. 定义一个数组，用来存储将来所有被添加的元素。
			 * 2. 使用jQuery包装一下selector，把不同参数统一为JQ实例。
			 * 3. 在外层遍历所有的元素(this)
			 * 4. 在内层遍历所有的目标(包装过后的JQ实例)
			 * 5. 在内层判断，如果是第一次，则把外面遍历元素整体添加到内层遍历到的元素的最前面。
			 *    如果不是第一次，则把外面遍历的元素clone版本添加到内层遍历的元素的最前面。
			 * 6. 最后把存储被添加元素的数组使用JQ包装一下，然后返回。
			 */
			var reslut = [], tempNode = null;
			$selector = jQuery(selector);
			
/*			// this
			for (var i=0; i<this.length; i++) {
				// selector
				for (var j=0; j<$selector.length; j++) {
					// 先得到被添加的元素
					tempNode = j === 0 ? this[i] : this[i].cloneNode(true);
					
					// 添加到指定元素的最前面
					$selector[j].insertBefore(tempNode, $selector[j].firstChild);
					
					// 把被添加的元素存储起来
					reslut.push(tempNode);
				}
			}
			
*/
			this.each(function() {
				var self = this;
				
				$selector.each(function(i) {
					tempNode = i === 0 ?  self : self.cloneNode(true);
					this.insertBefore(tempNode, this.firstChild);
					reslut.push(tempNode);
				});
				
			});
			return jQuery(reslut);	
		}
		
	});
	
/***** end 扩展DOM操作方法 *****/

	
	// 暴露函数
	w.jQuery = w.$ = jQuery;
})(window);