/**
 * Created by Administrator on 2016/6/2.
 */

var http = require('http');

var server = http.createServer();

server.on('request',function ( req,res ) {

	res.setHeader('Content-type','text/html;charset=utf8');
	if ( req.url == '/' ){
		res.end('index');
	} else {
		res.end('404');
	}

});

server.listen(8080,'localhost');
console.log('server');