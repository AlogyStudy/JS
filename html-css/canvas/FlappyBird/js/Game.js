
/**
 * flappyBird 
 * 主循环
 * state game
 * 
 */

(function(){
	
	var Game = window.Game = function( args ){
		
		this.cvs = document.getElementById(args.cvsId);
		
		//上下文
		this.cs = this.cvs.getContext('2d');
		
		//帧编号
		this.frameNumber = 0;
		
		//fps
		this.fps = 1;
		//临时时间戳
		this._timestamp = 0;
		//临时fps
		this._fps = 10;
		
		
		//actor数组
		this.actorArr = [];
		
		//ajax
		this.img = {};
		
		//分数
		this.score = 0;
		
		var xhr = new XMLHttpRequest();
		
		var _this = this;
		
		//监听 xhr
		xhr.onreadystatechange = function(){
			
			if ( xhr.readyState == 4 ) {
				
				var obj = JSON.parse( xhr.responseText );
				
				//所有图片张数
				var objLength = obj.resource.length;
				
				//加载好的张数
				var picNumber = 0;
				
				//遍历pic
				_.each( obj.resource,function( res ){
					
					_this.img[res.name] = new Image();
					_this.img[res.name].src = res.src;
					
					_this.img[res.name].onload = function(){
						
						picNumber++;
						
						//图片加载完成
						if ( picNumber == objLength ) {
							
							//初始化game
							_this.init(); 
							
							//game state
							_this.state();
							
						}
						
					}
					
				});
				
			}
			
		}
		
		xhr.open('get','init.json',true);
		xhr.send(null);
		
	}
	
	//主循环
	Game.prototype.mainLoop = function(){
		//帧率 ， actor 
		
		this.cs.clearRect(0,0,this.cvs.width,this.cvs.height);
		
		//碰撞检测
		this.cs.globalCompositeOperation = 'source-over';
		
		this.bird.update();
		this.bird.render();
		
		
		this.cs.globalCompositeOperation = 'source-in';
		
		//调用acotr
		
		_.each(this.actorArr,function( actor ){
			
			//更新
			actor.update();
			
			//渲染
			actor.render();
			
		});
		
		var a = this.cs.getImageData(this.bird.x - 24, this.bird.y - 24, 48, 48);
		
		for ( var i=0; i<a.data.length; ++i ) {
			
			if ( (a.data[i] != 0) && (this.frameNumber > 1) ) {

				this.stop();
				
			}
			
		}
		
		//再渲染鸟
		this.cs.globalCompositeOperation = 'source-over';
		//背景
		this.background.render();
		this.background.update();
		
		//大地
		this.land.render();
		this.land.update();	
		
		//鸟
		this.bird.render();
		
		//管子
		_.each(this.actorArr,function( actor ){
			
			//更新
			actor.update();
			
			//渲染
			actor.render();
			
		});

		
		//帧编号
		this.frameNumber++;
		
		this.cs.font = '12px 微软雅黑';
		this.cs.fillStyle = 'black';
		
		this.cs.fillText('帧编号：'+ this.frameNumber ,10,20);
		
		
		//计算fps
		if ( Date.parse(new Date()) == this._timestamp ) {
			//前一秒，后一秒 的 时间戳 的 改变量
			
			this._fps ++; 
			
		} else {
			
			//复制当前的 时间戳
			this._timestamp = Date.parse(new Date());
			
			this.fps = this._fps;
			this._fps = 0;
			
		}
		
		//前 100 帧 ， 置为50 fps     f/s
		if ( this.frameNumber < 100 ) {
			
			this.fps = 50;
			
		}
		
		//显示时间戳
		this.cs.fillText( 'fps为：'+this.fps,10,40 );
		
		//输出分数
		this.cs.fillText('分数为：' + this.score,10,60);
		
	}
	
	//init 执行其它类
	Game.prototype.init = function(){
		
		//调用其它类
		
		//背景类
		this.background = new Background({
			'pic': this.img.bg1,
			'speed': 2,
			'y': 0
		});
		
		//陆地
		this.land = new Background({
			'pic': this.img.land,
			'speed': 4,
			'y': this.cvs.height - this.img.land.height
		});
		
		//鸟
		this.bird = new Bird();
		
		var _this = this;
		
		//鸟儿增加事件监听
		this.cvs.onmousedown = function(){
			
			_this.bird.getEnergy();
			
		}
		
	}
	
	
	//游戏开始
	Game.prototype.state = function(){
		
		var _this = this;
		
		this.timer = setInterval(function(){
			
			//每隔1秒创建 一个管子  // 80 帧  1.5 秒
			if ( _this.frameNumber % 100 == 0 ) {
				
				new Pipe({
					speed: _this.land.speed
				});
				
			}	
			
			//主循环	
			_this.mainLoop();
			
		},20); //1000/60
		
	}
	
	//停止定时器
	Game.prototype.stop = function(){
		
		clearInterval(this.timer);
		
	}
	
})();
