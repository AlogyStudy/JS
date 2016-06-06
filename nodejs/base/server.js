/**
 * Created by Administrator on 2016/5/31.
 */

var http = require('http');

var server = http.createServer(function( req,res ){

	console.log(123);
	res.end('hello');
	
});

server.listen(1223,'127.0.0.1');
