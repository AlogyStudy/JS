//javascript document 


/**
 * 
 *  Ryo 命名空间 	namepace
 * 
 */

var ryo = {};

/**
 * 获取对象的计算后的样式 
 * @param {Object} obj 获取的对象
 * @param {string} prototy 属性  
 * @return {String}  处理过后的属性
 */

ryo.fetchComputedStyle = function( obj,property ){
	//能力检测
	if( window.getComputedStyle ){
		//paddingLeft  →  padding-left
		property = property.replace(/([A-Z])/g , function(match,$1){
			return "-" + $1.toLowerCase();
		});

		return window.getComputedStyle(obj)[property];
	}else{
		//IE只认识驼峰
		//padding-left  → paddingLeft 
		property = property.replace(/\-([a-z])/g , function(match,$1){
			return $1.toUpperCase();
		});

		return obj.currentStyle[property];
	}
		
}

/**
 * 添加事件
 * @param {Object} obj
 * @param {String} eventType  没有on
 * @param {Function} fn
 */
ryo.addEvent = function( obj,eventType,fn ){
	
	if( obj.addEventListener ){
		obj.addEventListener(eventType,fn,false);
	} else if( obj.attachEvent ){
		obj.attachEvent('on'+eventType,function(){
			fn.call(obj);
		});
	} else {
		obj['on'+ eventType] = fn;
	}
	
}

/**
 * animte
 * @param {Object} elem  执行动画的对象
 * @param {Object} targetJSON  目标的运动点。 
 * @param {Number} time  执行时间
 */

ryo.animate = function( elem,targetJSON,time,callback ){
	
	//时间间隔
	var interval = 0;
	if( window.navigator.userAgent.indexOf('MSIE')!=-1 ){
		interval = 50;
	} else {
		interval = 10;
	}
	
	//初始值
	var sempJSON = {};
	for ( var k in targetJSON ) {
		sempJSON[k] = parseFloat( this.fetchComputedStyle( elem,k ) );
	}
	
	//执行函数次数
	var maxCount = time/interval;
	var count = 0;
	
	//步长
	var tempJSON = {};
	for ( var k in targetJSON ) {
		targetJSON[k]= parseFloat( targetJSON[k] );
		tempJSON[k] = (targetJSON[k]-sempJSON[k])/maxCount;
	}
	
//	end

	//开启定时器
	var timer = setInterval(function(){
		
		for ( var k in targetJSON ) {
			//赋值
			sempJSON[k] += tempJSON[k];
			//设置
			if( k!='opaicty' ){
				elem.style[k] = sempJSON[k] + 'px';
			} else {
				elem.style[k] = sempJSON[k];
				elem.style.filter = 'alpha(opaicty='+ (sempJSON*100) +')';
			}
		}
		
		
		count++;
		if( count==maxCount ){//清除定时器
			for ( var i in targetJSON ) {
				//拉终停表
				if( !k=='opaicty' ){
					elem.style[k] = sempJSON[k] + 'px';
				} else {
					elem.style[k] = sempJSON[k];
					elem.style.filter = 'alpha(opaicty='+ (sempJSON*100) +')';
				}
			}
			callback && callback.call(elem);
			clearInterval(timer);
		}
		
	},interval);

}
