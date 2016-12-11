(function(){
	
	var Huxi = window.Huxi = function( argJSON ){
		
		//收集数据
		this.$carousel = $('#'+argJSON.ID);
		this.$leftBtn = this.$carousel.find(".leftBtn");
		this.$rightBtn = this.$carousel.find(".rightBtn");
		this.$imageListLis = this.$carousel.find(".imageList ul li");
		this.$circlesLis = this.$carousel.find(".circles ol li");
		
		this.imageCount = this.$imageListLis.length;
		
		this.animateTime = argJSON.animateTime || 400;
//		this.atuoplay = argJSON.atuoplay || 2000;
		this.idx = 0;
		
		this.timer = null;
		
		//添加监听
		this.bindEvent();
		
		//自动轮播
		if ( argJSON.atuoplay ) {
			this.atuoplay = argJSON.atuoplay;
			this.auto();
		}
	}
	
	//right
	Huxi.prototype.next = function(){
		if ( this.$imageListLis.is(':animated') ) return false;
		//老图淡出
		this.$imageListLis.eq( this.idx ).fadeOut(this.animateTime);
		this.idx++;
		if ( this.idx>this.imageCount-1 ) {
			this.idx = 0;
		} 
		//新图淡入
		this.$imageListLis.eq( this.idx ).fadeIn(this.animateTime);
		this.changeCircle();
	}
	
	//left
	Huxi.prototype.prev = function(){
		if ( this.$imageListLis.is(':animated') ) return false;
		//老图淡出
		this.$imageListLis.eq( this.idx ).fadeOut(this.animateTime);
		this.idx--;
		if ( this.idx<0 ) {
			this.idx = this.imageCount-1;
		} 
		//新图淡入
		this.$imageListLis.eq( this.idx ).fadeIn(this.animateTime);
		this.changeCircle();
	}
	
	//到第几张
	Huxi.prototype.goto = function( num ){
		if ( this.$imageListLis.is(':animated') ) return false;
		//老图淡出
		this.$imageListLis.eq( this.idx ).fadeOut(this.animateTime);
		this.idx = num;
		//新图淡入
		this.$imageListLis.eq( this.idx ).fadeIn(this.animateTime);
		this.changeCircle();
	}
	
	//改变小圆点
	Huxi.prototype.changeCircle = function(){
		this.$circlesLis.eq(this.idx).addClass('cur').siblings().removeClass('cur');		
	}
	
	//事件驱动
	Huxi.prototype.bindEvent = function(){
		var _this = this;
		//right
		this.$rightBtn.click(function(){
			_this.next();
		});
		
		//left
		this.$leftBtn.click(function(){
			_this.prev();
		});
		
		//小圆点
		this.$circlesLis.click(function(){
			var idx = $(this).index();
			_this.goto(idx);
		});
		
		
		//鼠标移入
		this.$carousel.mouseenter(function(){
			clearInterval(_this.timer);
		});
		//鼠标移出
		this.$carousel.mouseleave(function(){
			_this.auto();
		});
		
	}
	
	//自动轮播
	Huxi.prototype.auto = function(){
		var _this = this;
		clearInterval(this.timer);
		this.timer = setInterval(function(){
			_this.next();
		},this.atuoplay);
		
	}
	
})();
