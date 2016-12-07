
/**
 * Background 类
 */

(function(){
	
	var Background = window.Background = function( args ){
		
		this.pic = args.pic;
		
		this.x = 0;
		this.y = args.y;
		
		//图片的宽度		
		this.width = this.pic.width;
		
		//图片运动速度
		this.speed = args.speed;
		
		//视口需要运动的图片背景 的张数
		this.amout = parseInt( g.cvs.width/this.width )+ 2;
		
		//添加到 actor中
//		g.actorArr.push(this);
		
	}
	
	//渲染
	Background.prototype.render = function(){
		
		for ( var i=0; i<this.amout; ++i ) {
			
			g.cs.drawImage(this.pic,this.x + this.width * i ,this.y);
			
		}
		
	}
	
	//更新
	Background.prototype.update = function(){
		
		//改变x
		this.x -= this.speed; 
		
		//拉回图片
		if ( this.x <= -this.width ) {
			this.x = 0;
		}
		
	}
	
})();
