/**
 *  鸟类
 */

(function(){
	
	var Bird = window.Bird = function(){
		
		//位置
		this.x = 90;
		this.y = 200;
			
		//鸟类型	
		this.picArr = [g.img.bird0_0,g.img.bird0_1,g.img.bird0_2];
		
		//当前形态
		this.step = 0;
		
		//鸟
		this.pic = this.picArr[this.step];
		
		//下降程度
		this.point = 0;
		
//		小鸟内部 帧编号  （使用下降逻辑） 
		this._frameNumber = 0;
		
//		自己的旋转角度 弧度制
		this.angle = 0;
		
		//是否具有能量
		this.hasEnergy = false;
		
		//上升帧数
		this.upFrame = 10;
		
//		g.actorArr.push(this);
		
	}
	
	//渲染
	Bird.prototype.render = function(){
		
		//小鸟旋转
		g.cs.save();
		
			g.cs.translate(this.x + this.pic.width/2 ,this.y - this.pic.height/2);
			g.cs.rotate(this.angle);
			g.cs.drawImage( this.pic, -this.pic.width/2, -this.pic.height/2 );
		
		g.cs.restore();
		
	}
	
	//更新
	Bird.prototype.update = function(){
		
		//  1，小鸟 忽扇忽扇  2，小鸟下降程度
		
//		2，小鸟下降程度
//		this.point += 3 / g.fps;
//		this.y += Math.pow(this.point,2);
		
//		1，小鸟 忽扇忽扇    // 每20帧变化一次翅膀
		if ( g.frameNumber % 3 == 0 ) {
			
			this.step ++;
			
			if ( this.step > 2 ) {
				
				this.step = 0; 
				
			}
			
			//修改类型
			this.pic = this.picArr[this.step];
			
		}
		
		//下降逻辑
		this._frameNumber++;
			
		//没有能量  , 小鸟是否具有能量， 来决定是否 下降
		if( !this.hasEnergy ) {
			
			
			this.y += Math.pow(this._frameNumber / 10,2);  //下降速度二次
			 
			//角度变化
			this.angle = this._frameNumber / 12;
			
		} else {
			
			//有能量  y 改变
			this.y -= this.upFrame - this._frameNumber;
			
			this.angle = this._frameNumber / 12;

			//大于10帧， 重置为false
			if ( this._frameNumber > this.upFrame ) {
				
				this.hasEnergy = false;
				
				this._frameNumber = 0;   
				
			}
			
		}
		
		//验收 天  地
		if ( this.y <= 18 ) {
			
			this.y = 18;
			
		} else if ( this.y >= g.land.y + 10 ) {
			
			g.stop();
			
		}
		
	}
	
	//增加能量
	Bird.prototype.getEnergy = function(){
		
		//改变能量
		this.hasEnergy = true;
		
		//内部帧数  归零
		this._frameNumber = 0;
		
		//上升
//		this.y -= 40;
		
	}
	
})();
