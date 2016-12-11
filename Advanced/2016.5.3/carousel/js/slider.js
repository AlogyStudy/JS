
(function( window ){
	
	window.Slider = Slider = function ( argJson ){
		
		if ( !argJson.ID ) {
			
			throw new Error('传入有错误');
			
			return false;
			
		}
		
		//自动时间
		this.autoPlayInterval = argJson.autoPlayInterval || 2000;
		
	
		//组件DOM元素
		this.carousel = document.getElementById(argJson.ID);
		
		//选择DOM
		this.leftBtn = this._byClassName('leftBtn')[0];
		this.rightBtn = this._byClassName('rightBtn')[0];
		this.imageList = this._byClassName('imageList')[0];
		this.imageLis = this.imageList.getElementsByTagName('li'); 
		this.circles = this._byClassName('circles')[0];
		
		//小圆点
		this.circleLis = this.circles.getElementsByTagName('li');
		
		//图片长度
		this.imageLength = this.imageLis.length;
		
		//定时器间隔时间
		this.interval = argJson.interval || 20;
		
		//缓冲公式
		this.tween =  argJson.tween || function (t, b, c, d) {
		
	    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
	    
	    return c / 2 * ((t -= 2) * t * t + 2) + b;
		    
		}
		
		//运动的动画
		this.timer = null; 
		
		//自动轮播的动画
		this.timer2 = null;
	
		//信号量
		this.idx = 0;
		
		//绑定监听
		this._bindEvent();
		
		//自动轮播
		this._autoplay();
		
	}
	
	//切换为下一张	
	Slider.prototype._next = function(){
			
			//函数节流    //lock  setTimeout 开锁
			//is(':animated');
			//使用 timer 中的 值
			if ( this.timer ) {
				return false;
			}
			
			var oldIdx = this.idx;
			
			this.idx++;
			
			//后置判断
			if ( this.idx > this.imageLength-1 ) {
				
				this.idx = 0;
				
			}
			
			//调用简易运动
			this._animate([
				{
					'obj': this.imageLis[oldIdx],
					'start': 0,
					'target': -560
				},{
					'obj': this.imageLis[this.idx],
					'start': 560,
					'target': 0
				}
			],1000);
			
			//调用小圆点
			this._changeCircle();
			
	}
	
	//切换为上一张
	Slider.prototype._prve = function(){
			
			var oldIdx = this.idx;
			
			this.idx--;
			
			//后置判断
			if ( this.idx < 0 ) {
				
				this.idx = this.imageLength-1;
				
			}
			
			//调用简易运动
			this._animate([
				{
					'obj': this.imageLis[oldIdx],
					'start': 0,
					'target': 560
				},{
					'obj': this.imageLis[this.idx],
					'start': -560,
					'target': 0
				}
			],1000);
			
			//调用小圆点
			this._changeCircle();
			
	}
	
	
	//跳转到某个图
	Slider.prototype._goto = function( num ){
			
			if ( num > 4 ) {
				return false;
			}
			var oldIdx = this.idx;
			
			this.idx = num;
		
			//判断点击的方向
			if ( this.idx > oldIdx ) {  //4  3
				
				//调用简易运动  图片
				this._animate([
					{
						'obj': this.imageLis[oldIdx],
						'start': 0,
						'target': -560
					},{
						'obj': this.imageLis[this.idx],
						'start': 560,
						'target': 0
					}
				],1000);
	
			} else if ( this.idx < oldIdx ) {
				
				this._animate([
					{
						'obj': this.imageLis[oldIdx],
						'start': 0,
						'target': 560
					},{
						'obj': this.imageLis[this.idx],
						'start': -560,
						'target': 0
					}
				],1000);
				
			}
			
			//调用小圆点
			this._changeCircle();
			
	}
	
	
	//改变小圆点  //排它操作
	Slider.prototype._changeCircle = function(){
		
		for ( var i=0; i<this.circleLis.length; i++ ) {
			
			this.circleLis[i].className = '';
			
		}
		
		this.circleLis[this.idx].className = 'cur';
		
	}
	
	Slider.prototype._bindEvent = function(){
		
		var context = this; 
		
		//按钮，小圆点，
		
		//rightBtn
		this.rightBtn.onclick = function(){
			
			context._next.apply(context);
			
		}
		
		//leftBtn
		this.leftBtn.onclick = function(){
			
			context._prve.apply(context);
			
		}
		
		//小圆点
		for ( var i=0; i<this.circleLis.length; ++i ) {
			
			this.circleLis[i].index = i;
			
			this.circleLis[i].onclick = function(){
				
				context._goto( this.index );
				
			}
			
		}
		
		
		//鼠标进入,清除timer2
		this.carousel.onmouseover = function(){
			
			//清除定时器
			clearInterval(context.timer2);
			
		}
		
		//鼠标离开重新设置定时器
		this.carousel.onmouseout = function(){
			
			context._autoplay();
			
		}
		
	}
	
	
	//自动轮播
	Slider.prototype._autoplay = function(){
		
		var context = this;
		
		this.timer2 = setInterval(function(){
			
			context._next();
			
		},this.autoPlayInterval);
		
		
	}
	
	
	
	/**
	 * 选择元素
	 * @param {String} className
	 */
	Slider.prototype._byClassName = function( className ){
		
		var arr = [];
		
		var elems = this.carousel.getElementsByTagName('*');
		
	//	var reg = new RegExp('[\s]?'+ className +'[\s]+','g'); 
		
		for ( var i=0; i<elems.length; ++i ) {
			
			if ( elems[i].nodeType == 1 && elems[i].className.indexOf(className) != -1 ) {
				
				arr.push(elems[i]);
				
			}
			
		}
		
		return arr;
		
	}
	
	
	
	/**
	 * 简易运动 
	 * @param {Array} arr
	 * @param {Number} time
	 */
	
	Slider.prototype._animate = function( arr,time ){
		
		var context = this;
		
		//当前时间  current Time   t
		var currentFrame = 0;
		
		//初始值  beginning value  b 
	//	start		
	
		//变化量  change value  c 
	//	var delta = target - start;
		
		//总时间 (持续时间) duration  d
		var maxFrame = parseInt( time / this.interval );
		
		//设表先关
		clearInterval(this.timer);
		
		//开启定时器
		this.timer = setInterval(function(){
		
			currentFrame++;
		
			if ( currentFrame >= maxFrame ) {
				
				clearInterval(context.timer);
				context.timer = null; //判断定时器是否积累
				
			}
		
			for ( var i=0; i<arr.length; ++i ) {
				
				arr[i].obj.style.left = context.tween( currentFrame,arr[i].start,arr[i].target-arr[i].start,maxFrame ) + 'px';	
				
			}
			
		
		},this.interval);
		
		
	}
	
})( window );
