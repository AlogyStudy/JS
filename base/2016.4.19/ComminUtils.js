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

ryo.fetchComputedStyle = function( obj,prototy ){
	
	if( window.getComputedStyle ){
		
		//检测	高级浏览器   //padding-left  //paddingLeft
		prototy = prototy.replace(/([A-Z])/g,function( match,$1 ){
			return '-' + $1.toLowerCase();
		});
		return getComputedStyle(obj)[prototy];
	} else {
		
		//检测ie8及ie8以下检测  //paddingLeft  //padding-left
		prototy = prototy.replace(/\-([a-z])/g,function( match,$1 ){
			return $1.toUpperCase();
		});
		return obj.currentStyle[prototy];
	}
		
}


/**
 * 
 * 动画执行
 * @param {Object} elem  动画元素
 * @param {Object} targetJSON  变化的终点值
 * @param {Number} time 执行的时间。 毫秒为单位  
 * @param {tweenString} tweenString 动画执行的描述词
 * @param {Function} callback  动画执行后的执行函数
 * 
 */

ryo.animate = function( elem,targetJSON,time,tweenString,callback ){

	//判断参数
	if( arguments.length<3 || typeof arguments[0]!='object' || typeof arguments[1]!= 'object' || typeof arguments[2]!='number' ){
		throw new Error('The number or type of parameters you have entered is wrong');
		return ;
	} else if( arguments.length<3 ) { //个数
		tweenString = 'Linear';
		callback = null;
	} else if( arguments.length==4 ){
		switch ( typeof arguments[3] ){
			case 'string':
				callback = null;
				break;
			case 'function':
				callback = arguments[3];  //这边要先存储传进来的函数， 不然AO链函数，就会被动态替换
				arguments[3] = 'Linear';
				break;
			default:
				throw new Error('The fourth argument is a buffer descriptor or a function.');
				break;
		}	
	}

	//动画间隔时间
	var interval = 0;
	if( window.navigator.userAgent.indexOf('MSIE')!=-1 ){
		interval = 50;
	} else {
		interval = 20;
	}
	
	//强行增加一个属性，表示是否正在运动isanimated
	elem.isanimated = true;
	
	// 初始状态 originalJSON
	var originalJSON = {};
	//变化状态 deltaJSON
	var deltaJSON = {};
	for ( var k in targetJSON ) {
		originalJSON[k] = parseFloat( this.fetchComputedStyle(elem,k) );
		targetJSON[k] = parseFloat( targetJSON[k] );
		//变化状态
		deltaJSON[k] = targetJSON[k]-originalJSON[k];
	}
	
	//总执行函数次数：
	var maxFrameNumber = time/interval;
	var frameNumber = 0;
	
	var n;
	//定时器
	var timer = setInterval( function(){
		//信号量  发生步长变化。
		for ( var k in originalJSON ) {
		
			//执行tween
			n = Tewwn[originalJSON](frameNumber,originalJSON[k],deltaJSON[k],maxFrameNumber);
			
			//动
			//根据是不是 opaicty来设置单位
			if( k!='opaicty' ){
				elem.style[k] = n + 'px';
			} else {
				elem.style[k] = n;
				elem.style.filter = 'alpha( opaicty='+ (n*100) +')';
			}
		}
		
		
		//计数器
		frameNumber++;
		if( frameNumber==maxFrameNumber ){
			//拉终停表 
			//让elem 跑到targetJSON 位置.
			for ( var k in targetJSON ) {
				//根据是不是 opaicty来设置单位
				if( !k=='opaicty' ){
					elem.style[k] = semaphoreJSON[k] + 'px';
				} else {
					elem.style[k] = semaphoreJSON[k];
					elem.style.filter = 'alpha( opaicty='+ (semaphoreJSON[k]*100) +')';
				}
			}
			
			clearInterval( timer );
			elem.isanimated = false;
			callback && callback.call(elem);
		}
		
	},interval );
	
var Tween = {
    Linear: function(t, b, c, d) {
        return c * t / d + b;
    },
    //二次的
    QuadEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    QuadEaseOut: function(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    QuadEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    //三次的
    CubicEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    CubicEaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    CubicEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    //四次的
    QuartEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    QuartEaseOut: function(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    QuartEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    QuartEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    QuartEaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    QuartEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    //正弦的
    SineEaseIn: function(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    SineEaseOut: function(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    SineEaseInOut: function(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    ExpoEaseIn: function(t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    ExpoEaseOut: function(t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    ExpoEaseInOut: function(t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    CircEaseIn: function(t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    CircEaseOut: function(t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    CircEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    ElasticEaseIn: function(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    ElasticEaseOut: function(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    },
    ElasticEaseInOut: function(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    //冲过头系列
    BackEaseIn: function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    BackEaseOut: function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    BackEaseInOut: function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    //弹跳系列
    BounceEaseIn: function(t, b, c, d) {
        return c - Tween.BounceEaseOut(d - t, 0, c, d) + b;
    },
    BounceEaseOut: function(t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    BounceEaseInOut: function(t, b, c, d) {
        if (t < d / 2) return Tween.BounceEaseIn(t * 2, 0, c, d) * .5 + b;
        else return Tween.BounceEaseOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
}	
	
}
