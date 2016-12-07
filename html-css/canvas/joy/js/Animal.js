/**
 * 
 * 动物
 * 消消乐中的每一个对象
 * 
 */

(function(){
	
	var Animal = window.Animal = Class.extend({
		
		//row 0~7
		//col 0~7
		//shape 0~8
		init: function( row,col,shape ){
			
			this.x = row;
			this.y = col;
			
			this.shape = shape;	//形状
			
			this.onBomb = false; //是否处于爆炸状态
			
			this.bombStep = 0;  //爆炸状态 合法值(0,1,2,3,4,5)
			
			this.show = true;  //是否渲染自己
			
		},
		
		//爆炸
		bomb: function(){ 
			
			this.onBomb = true;
			
		},
		
		//渲染
		render: function(){
			
			if ( !this.show ) return false;
			
			//爆炸状态，来决定如何渲染
			if ( !this.onBomb ) {
				
				//不在处于爆炸状态渲染 普通图片
				g.cs.drawImage( g.img, 275 * (this.shape % 3) ,233 * (parseInt(this.shape / 3)) , 275 , 233 , this.y * 40 , 180 + this.x * 40,40,33);
				
			} else {
				
				//3帧 一次 
				if ( g.frameNumber % 3 == 0 ) {
					
					this.bombStep++;
					
					if ( this.bombStep > 5 ) {
						
						this.show = false;
						
						return false;
						
					}
					
				}
				
				//显示爆炸图片
				g.cs.drawImage( g.bombArr[this.bombStep], this.y * 40 , 180 + this.x * 40,40,33 );
				
			}
			
		}
		
	});
	
})();


