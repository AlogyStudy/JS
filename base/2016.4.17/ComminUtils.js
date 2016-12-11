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
 * 动画执行
 * @param {Object} elem  动画元素
 * @param {Object} targetJSON  变化的终点值
 * @param {Number} time 执行的时间。 毫秒为单位  
 */

ryo.animate = function( elem,targetJSON,time,callback ){

	//动画间隔时间
	var interval = 0;
	if( window.navigator.userAgent.indexOf('MSIE')!=-1 ){
		interval = 50;
	} else {
		interval = 10;
	}
	
	//原始的值 作为 信号量.
	var semaphoreJSON = {}  //信号量对象.  targetJSON 提供什么属性 就有什么属性.
	for ( var k in targetJSON ) { //值就是当前的计算样式
		semaphoreJSON[k] = parseFloat( this.fetchComputedStyle( elem,k ) );  //对象复制  , 属性移动. //匹配添加属性 //对象的克隆。 关联数组的下标。
	}
	console.log( semaphoreJSON );  //Object {left: "100px", top: "120px"}
	console.log( targetJSON );  
	
	//总执行函数次数：
	var maxCount = time/interval;
	var count = 0;
//	console.log(maxCount);  //400
	
//	步长， JSON存放存放步长。
	var stepJSON = {};
	for ( var k in targetJSON ) {
		targetJSON[k] = parseFloat(targetJSON[k]);
		stepJSON[k] = (targetJSON[k]-semaphoreJSON[k])/maxCount;
	}
	console.log(stepJSON);
	
	//信号量JSON： semaphoreJSON
	//终点JSON ： targetJSON
	//步长JSON ： stepSJON
//	console.log( stepJSON );
	
	//定时器
	var timer = setInterval( function(){
		//信号量  发生步长变化。
		for ( var k in semaphoreJSON ) {
			semaphoreJSON[k] += stepJSON[k]; //每一步的变化
			console.log( semaphoreJSON );
			//动
			//根据是不是 opaicty来设置单位
			if( k!='opaicty' ){
				elem.style[k] = semaphoreJSON[k] + 'px';
			} else {
				elem.style[k] = semaphoreJSON[k];
				elem.style.filter = 'alpha( opaicty='+ (semaphoreJSON[k]*100) +')';
			}
		}
		
		
		//计数器
		count++;
		if( count==maxCount ){
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
			callback && callback();
			clearInterval( timer );
		}
		
	},interval );
	
}
