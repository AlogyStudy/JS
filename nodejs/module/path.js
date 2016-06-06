/**
 * Created by Administrator on 2016/6/2.
 */

var http = require('http');
var path = require('path');


var server = http.createServer(function( req,res ){

	// console.log( path.parse(req.url) );



	res.end('ok');

});
console.log( path.basename('/xixi/haha/a.html') );
console.log( path.extname('/xixi/haha/a.html') );
console.log( path.dirname('/xixi/haha/a.html') );

server.listen(1221,'localhost');
console.log(1);