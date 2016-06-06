/**
 * Created by Administrator on 2016/6/2.
 */

var http = require('http');

var server = http.createServer();

server.on('request',function ( req,res ) {


	// console.log( req.headers );
	
	// console.log( req.httpVersion );

	/*console.log( req.method );

	res.setHeader('Content-type','text/html;charset=utf8');

	if ( req.method.toLowerCase() == 'get' ) {

		res.end('get请求');

	} else if( req.method.toLowerCase() == 'post' ) {

		res.end('post请求');

	}*/

	                                       
	res.end('ok');

});

server.listen(8080,'localhost');
console.log('server');