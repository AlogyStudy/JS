
/**
 * 游戏中枢类
 */

(function(){
	
	var Game = window.Game = Class.extend({
		
		//构造函数
		init: function(){
			
			this.cvs = document.getElementById("cvs"); //得到canvas
			
			this.cs = this.cvs.getContext('2d'); //得到上下文
			
			var _this = this;
			
			
			this.allPic = []; //所有图片
			
			//加载资源
			this.bombArr = []; //爆炸动画序列
			
			//数组的资源
			this.picR = ['images/1.png','images/2.png','images/3.png','images/4.png','images/5.png','images/6.png','images/7.png'];
			
			for ( var i=0; i<6; ++i ) {
				
				//爆炸动画图片
				var bombImg = new Image();
				bombImg.src = this.picR[i];
				
				this.bombArr.push( bombImg );
				
				this.allPic.push( bombImg );
				
			}
			
			//img
			this.img = new Image();
			this.img.src = 'images/icons.png';
			
			this.allPic.push( this.img );
			
			this.picCount = 0;
			//所有图片加载完成之后
			for ( var i=0,picLength = this.allPic.length; i<picLength; ++i ) {
				
				this.allPic[i].onload = function(){
					
					_this.picCount++;
					if ( _this.picCount == picLength ) {
						
						//开始游戏
						_this.state();
						
					}
					
				}
				
			}
			
			
			this.frameNumber = 0; //帧编号
			
			this.GAMESTATE = 'A'; //游戏状态  //A - 判断是否消行， B - 消行动画 ， C - 下落补齐 ， D - 静默
			
			//地图实例化，地图是唯一的
			this.map = new Map();
			
			
			
		},
		
		//主循环
		mainLoop: function(){
			
			//清屏
			this.cs.clearRect(0,0,this.cvs.width,this.cvs.height);
			
			this.frameNumber ++;
			
			//显示帧编号
			this.cs.fillStyle = '#fff';
			this.cs.fillText('帧： '+ this.frameNumber,10,20);
			
			//执行实例的map 渲染方法
			this.map.render();
			
			//根据游戏状态，来决定具体业务
			if ( this.GAMESTATE == 'A' ) {
				
				//判断消除
				this.map.check();
				
			} else {
				
			}
			
		},
		
		//开始游戏
		state: function(){
			
			var _this = this;
			
			//开启定时器
			this.timer = setInterval(function(){
				
				//执行主循环
				_this.mainLoop();
				
			},1000/60);
			
		}
		
	});
	
})();


