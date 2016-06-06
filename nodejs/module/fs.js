/**
 * Created by Administrator on 2016/6/2.
 */

var fs = require('fs');

fs.readFile('./statc/test.txt',function( err,data ){

	console.log( data.toString() );

});

fs.readdir('./statc',function( err,data ){

	console.log( data.toString() );

});
