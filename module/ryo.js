(function(w) {
	
	/**
	 * 工厂函数
	 */
	
	function jQuery() {
		return new jQuery.fn.init(); 
	}
	
	// 挂载原型
	jQuery.fn = jQuery.prototype = {
		
	}
	
	/**
	 * 构造函数
	 */
	var init = jQuery.fn.init = function() {
		
	}
	
	// 扩展对象
	init.prototype = jQuery.fn;
	
	// 暴露函数
	w.jQuery = w.$ = jQuery;
})(window);
