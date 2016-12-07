/**
 * 地图
 */

(function(){
	
	var Map = window.Map = Class.extend({
		
		//构造函数
		init: function(){
			
			this.code = [];
			
			
			/*for ( var i=0; i<8; i++ ) {
				
				this.code.push( _.sample(_.range(0,8),8) );
				
			}*/
			
			//code
			this.code = [
				[0,1,2,3,1,5,6,7],
				[5,1,1,3,2,5,6,7],
				[0,1,6,3,1,5,6,3],
				[0,4,5,2,2,5,2,7],
				[0,1,2,3,4,1,2,2],
				[1,1,2,4,4,6,4,1],
				[4,1,2,2,2,5,1,7],
				[5,1,2,3,4,5,6,1],
				[]
			];
				
			//aniamls 对象数组  this.animal = [{row: 0,col: 0, shape: 1}];	
			this.animals = [];   //this.animals 和 this.code 不匹配，所以要有 this.setAnimal() 方法. 	
			
			this.setAnimal(); //设置地图中的每个位置中的动物
			
		},
		
		//根据地图阵  设置每个动物
		setAnimal: function(){
			
			//清除
			this.animals = [
				[null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null],
				[]
			];
			
			//根据地图的code 渲染出动物
			for ( var r=0; r<this.code.length; ++r ) {
				
				for ( var c=0; c<this.code.length; ++c ) {
					
					this.animals[r][c] = new Animal( r, c, this.code[r][c] );
					
				}
				
			}
			
		},
		
		//渲染   
		//执行Animal中的  渲染方法
		render: function(){
			
			for ( var i=0; i<this.animals.length; ++i ) {
				
				for ( var j=0; j<this.animals.length; ++j ) {
					
					//执行 Animal 渲染方法
					this.animals[i][j].render();
					
				}
				
			}
			
		},
		
		//消除判定
		check: function(){
			
			//指针法寻找 3个 或 3 个以上的 相同的动物
			
			//按行筛选
			
			// 存放{ r: r, c: a } 坐标对象
			var resultArr = [];
			
			for ( var r=0; r<8; r++ ) {
				
				var a = 0;
				var b = 1;
				var tempArr = [{ r: r, c: a }];
				
				while ( b<=8 ){
					
					if ( this.code[r][b] != this.code[r][a] ) {
						
						if ( b-a >= 3 )
							resultArr = resultArr.concat(tempArr);
						
						a = b;
						b++;
						
						tempArr = [{ r: r, c: a }];
												
					} else {
						
						tempArr.push({ r: r, c: b });
						b++;
						
					}
					
				}
				
			}
			
			//按列筛选			
			for ( var c=0; c<8; c++ ) {
				
				var a = 0;
				var b = 1;
				var tempArr = [{ r: a, c: c }];
				
				while ( b<=8 ){
					
					if ( this.code[b][c] != this.code[a][c] ) {
						
						if ( b-a >= 3 )
							resultArr = resultArr.concat(tempArr);
						
						a = b;
						b++;
						
						tempArr = [{ r: a, c: c }];
												
					} else {
						
						tempArr.push({ r: b, c: c });
						b++;
						
					}
					
				}
				
			}
			
			//执行爆炸 bomb();
			for ( var i=0; i<resultArr.length; ++i ) {
				
				this.animals[resultArr[i].r][resultArr[i].c].bomb();
				
			}
			
		}
		
	});
	
})()


