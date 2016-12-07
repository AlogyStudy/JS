
/**
 * 管道类
 */

(function(){
	
	var Pipe = window.Pipe = function( args ){
		
		this.speed = args.speed;
		
		this.height = _.random(100,220);
		
		//存放图片的数组   // ↑   ↓
		this.picArr = [g.img.pipe_up , g.img.pipe_down];
		
		//类型  //0  ↑  1 ↓ 
		this.type = _.sample([0,1]); 
		
		//图片
		this.pic = this.picArr[this.type];
		
		
		this.x = g.cvs.width;
//		this.y = this.type == 0 ? g.land.y - this.height : 0;
		this.y = 0;

		//自己是否已经加过分
		this.done = false; 

		//加入actor
		g.actorArr.push( this );
		
	}
	
	//渲染
	Pipe.prototype.render = function(){
		
		//自杀
		if ( this.x < -this.pic.width  ) {
			
			//移除数组中的对象
			g.actorArr =  _.without( g.actorArr,this );
			
		}
		
		//显示管道
		if ( this.type == 0 ) {	 // ↑
			
			g.cs.drawImage(this.pic,0,0, this.pic.width , this.height , this.x , g.land.y - this.height ,this.pic.width , this.height);
			
		} else if ( this.type == 1 ) { //↓
			
			g.cs.drawImage(this.pic,0, this.pic.height - this.height, this.pic.width, this.height , this.x, 0, this.pic.width,this.height);
			
		}
		
	}

	//更新
	Pipe.prototype.update = function(){
		
		this.x -= this.speed;
		
		//加分逻辑
		if ( this.x < g.bird.x - this.pic.width && !this.done ) {
			
			this.done = true;
			
			g.score ++;
			
		}
		
	}
	
})();
