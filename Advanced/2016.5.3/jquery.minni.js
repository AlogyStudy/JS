(function( window ){
	
	var $ = window.$ = function( selector ){
		
		var resArr = [];
		/**
		 * 
		 * @param {Object} root
		 * @param {String} select
		 */
		function find( root,select ){

			var arr = select.split(' ');
			var roots = root.getElementsByTagName(arr[0]);
			var rese = arr.slice(1).join(' ');
			
			if( !rese ) {
				for ( var i=0; i<roots.length; i++ ) {
					roots[i] && resArr.push( roots[i] );
				}
				return false;
			}
			
			for ( var i=0; i<roots.length; i++ ) {
				find( roots[i],rese );
			}
		}
		
		find(document,selector);
		return new jQueryObj(resArr);  // 返回 对象
		
	}
	
	//构造函数
	function jQueryObj( DOMResArr ){
		this[0] = DOMResArr;
	}
	
	
	jQueryObj.prototype.css = function( k,v ){
		
		for ( var i=0; i<this[0].length; ++i ) {
			this[0][i].style[k] = v;
		}
		
	}
	
})( window );
